#!/usr/bin/env python3
"""
Sea of Links: banner fetcher
----------------------------
Reads sites.js, visits each address, finds its social banner (og:image,
twitter:image, then the site icon as a fallback), shrinks it, and saves it as
images/<name>.webp. index.html loads those files automatically.

  pip install pillow          (one time)
  python fetch_banners.py     (fetches only what is missing)
  python fetch_banners.py --force      (redo everything)

A line in sites.js that already has its own image in the 3rd column is skipped:
your manual image always wins. Sites with no usable banner keep the generated look.
"""
import io, re, sys, time, urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is missing. Run:  pip install pillow")

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "images"
MAX_SIDE = 384        # longest side in pixels (the sea shows them small)
QUALITY = 70          # webp quality: 60-80 keeps files around 10-30 KB
UA = "Mozilla/5.0 (compatible; SeaOfLinksBot/1.0)"
ROW = re.compile(r'^\s*\[\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"')


def slug(url):
    """Must match autoImage() in index.html."""
    u = urlparse(url)
    host = re.sub(r"^www\.", "", (u.hostname or "").lower())
    s = re.sub(r"[^a-z0-9]+", "-", (host + u.path).lower()).strip("-")
    return s[:60]


def read_sites():
    rows = []
    for line in (ROOT / "sites.js").read_text(encoding="utf-8").splitlines():
        if line.strip().startswith("//"):
            continue
        m = ROW.match(line)
        if m:
            rows.append({"title": m.group(1), "url": m.group(2), "image": m.group(3)})
    return rows


def get(url, limit):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read(limit), r.geturl(), r.headers.get_content_charset() or "utf-8"


class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.icons = {}, []

    def handle_starttag(self, tag, attrs):
        d = {k: (v or "") for k, v in attrs}
        if tag == "meta":
            key = (d.get("property") or d.get("name")).lower()
            if key and d.get("content"):
                self.meta.setdefault(key, d["content"])
        elif tag == "link" and "icon" in d.get("rel", "").lower() and d.get("href"):
            # apple-touch-icon is usually bigger than a favicon, so try it first
            if "apple" in d["rel"].lower():
                self.icons.insert(0, d["href"])
            else:
                self.icons.append(d["href"])


def candidates(url):
    raw, final, enc = get(url, 400_000)
    p = Head()
    p.feed(raw.decode(enc, errors="replace"))
    found = [p.meta[k] for k in ("og:image", "og:image:secure_url", "og:image:url",
                                 "twitter:image", "twitter:image:src") if k in p.meta]
    found += p.icons + ["/favicon.ico"]
    return [urljoin(final, c) for c in found]


def shrink(data, dest):
    im = Image.open(io.BytesIO(data))
    im = im.convert("RGBA" if im.mode in ("P", "LA", "RGBA") else "RGB")
    im.thumbnail((MAX_SIDE, MAX_SIDE))
    im.save(dest, "WEBP", quality=QUALITY, method=6)


def main():
    force = "--force" in sys.argv
    OUT.mkdir(exist_ok=True)
    done = skipped = 0
    failed = []
    for s in read_sites():
        if not s["url"] or s["image"]:
            continue
        dest = OUT / (slug(s["url"]) + ".webp")
        if dest.exists() and not force:
            skipped += 1
            continue
        try:
            for img_url in candidates(s["url"]):
                try:
                    data, _, _ = get(img_url, 5_000_000)
                    shrink(data, dest)
                    print(f"ok   {s['title']}: {dest.name} ({dest.stat().st_size // 1024} KB)")
                    done += 1
                    break
                except Exception:
                    continue          # try the next candidate image
            else:
                raise RuntimeError("no usable image found")
        except Exception as e:
            failed.append(s["title"])
            print(f"skip {s['title']}: {e}")
        time.sleep(0.5)               # be polite: one visit per site, spaced out
    print(f"\n{done} downloaded, {skipped} already there, {len(failed)} without banner")
    if failed:
        print("Using the generated look for:", ", ".join(failed))


if __name__ == "__main__":
    main()
