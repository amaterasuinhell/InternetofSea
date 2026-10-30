// =====================================================================
//  THE SEA OF LINKS: webmaster config
// =====================================================================
//  One line per window:   ["Title", "https://address", "image", "shape"]
//
//   - Title  : text shown on the window and when you aim at it
//   - address: where the visitor lands. Leave "" for a placeholder.
//   - image  : optional picture shown inside the window, e.g. "images/mysite.png"
//              (put the file next to index.html). Leave "" for the generated look.
//   - shape  : optional. One of: rect round oval hex fish tall wide whale
//              Leave "" and the shape is picked randomly (and stays the same).
//
//  The sea always holds 100 windows. If you list fewer than 100 here, the
//  rest are filled with placeholders. Just add lines to replace them.
// =====================================================================

const NEW_TAB = false;   // true = open sites in a new tab instead of leaving the sea

const SITES = [
 
  ["Wikipedia",      "https://www.wikipedia.org",        "", "round"],
  ["Internet Archive","https://archive.org",             "", "tall"],
  ["Cowboy Bebop",   "https://en.wikipedia.org/wiki/Cowboy_Bebop", "", "fish"],
  ["Hacker News",    "https://news.ycombinator.com",     "", "wide"],
  ["Big Whale",      "https://www.anthropic.com",        "", "tall"],
  ["Felix Rieseberg",   "https://felixrieseberg.com/", "", "round"],
  ["TAMK",   "https://tamk.fi", "", ""],
  ["Pictoplasma",   "https://pictoplasma.com/", "", ""],
  ["We Got No Taste",   "https://wegotnotaste.com/", "", ""],
  ["Level 80",   "https://80.lv/", "", ""],
  ["Reddit",   "https://reddit.com/", "", ""],
["Should see this",   "https://shouldseethis.com/", "", ""],
  ["The useless web",   "https://theuselessweb.com/", "", ""],
   ["Kleki",   "https://kleki.com/", "", ""],
   ["The Louvre virtual tour",   "https://www.louvre.fr/en/online-tours", "", ""],
   ["National Museum of Modern and Contemporary Art, Korea",   "https://www.mmca.go.kr/eng/digitals/digitalMain.do", "", ""],
   ["Online Exhibitions - Smithsonian Institution",   "https://www.si.edu/exhibitions/online", "", ""],
  ["Why Building Weird Projects Makes You a Better Developer",   "https://www.howtogeek.com/why-i-keep-starting-weird-projects-i-dont-actually-need/", "", ""],
  ["Neal Fun",   "https://neal.fun/", "", ""],
  ["Scream into the void",   "https://screamintothevoid.com/", "", ""],
   ["Bored",   "https://www.bored.com/", "", ""],
  ["Voth",   "https://www.voth000.fi/", "", ""],
["Jestr",   "https://www.jestr.gg/", "", ""],
 
   // --- Niche web development and creative coding ---
  ["Bruno Simon",          "https://bruno-simon.com/", "", ""],
  ["Neal.fun",             "https://neal.fun/", "", ""],
  ["Shadertoy",            "https://www.shadertoy.com/", "", ""],
  ["The Book of Shaders",  "https://thebookofshaders.com/", "", ""],
  ["Codrops",              "https://tympanus.net/codrops/", "", ""],
  ["three.js examples",    "https://threejs.org/examples/", "", ""],
  ["Brutalist Websites",   "https://brutalistwebsites.com/", "", ""],
  ["Awwwards",             "https://www.awwwards.com/", "", ""],
  ["Web Design Museum",    "https://www.webdesignmuseum.org/", "", ""],

  // --- Alternative culture and the strange web ---
  ["Windows 93",           "https://www.windows93.net/", "", ""],
  ["Cameron's World",      "https://www.cameronsworld.net/", "", ""],
  ["Wiby",                 "https://wiby.me/", "", ""],
  ["Neocities",            "https://neocities.org/", "", ""],
  ["Marginalia Search",    "https://search.marginalia.nu/", "", ""],
  ["Net Art Anthology",    "https://anthology.rhizome.org/", "", ""],
  ["UbuWeb",               "https://ubu.com/", "", ""],
  ["Monoskop",             "https://monoskop.org/", "", ""],
  ["Public Domain Review", "https://publicdomainreview.org/", "", ""],
  ["Radio Garden",         "https://radio.garden/", "", ""],
  ["Are.na",               "https://www.are.na/", "", ""],

  // --- Artistic and experimental video games ---
  ["itch.io Experimental", "https://itch.io/games/tag-experimental", "", ""],
  ["Molleindustria",       "https://www.molleindustria.org/", "", ""],
  ["Pippin Barr",          "https://pippinbarr.com/", "", ""],
  ["Sokpop Collective",    "https://sokpop.co/", "", ""],
  ["Kokoromi",             "https://kokoromi.org/", "", ""],
  ["A MAZE.",              "https://a-maze.org/", "", ""],
  ["Tale of Tales",        "https://tale-of-tales.com/", "", ""],
  ["Hundred Rabbits",      "https://100r.co/", "", ""],
  ["PICO-8",               "https://www.lexaloffle.com/pico-8.php", "", ""],
  ["Increpare Games",      "https://www.increpare.com/", "", ""],
 
  
  
  
  // ... add up to 100 lines
];
const SIGNS = [
  { text: "Have a nice swim", color: "#ffffff", bg: "#e8337f", stickers: [["🐟", "left"], ["⭐", "topright"]] },
  { text: "Don’t get lost",   color: "#102060", bg: "#ffe14a", shape: "rect", stickers: [["🧭", "right"]] },
  { text: "Mind the sharks",  color: "#ffffff", bg: "#0b7a5c", stickers: [["🦈", "bottomleft"]] },
];

// ---------------------------------------------------------------------
//  SPRITES: your own swimmer pictures (PNG or WebP with a transparent background).
//  They swim together with the drawn swimmers. Not links, not clickable.
//    frames : one image, or several that play in a loop (a little animation)
//    count  : how many of them swim around
//    size   : height in the sea (small fish ~1.5, octopus ~3, whale ~4)
//    speed  : swimming speed (fish 2-4, whale ~1)
//    faces  : which way the picture looks: "left" or "right". It flips when it swims
//             the other way. "none" = never flips.
//    motion : "steady" (like a fish) or "pulse" (surges then drifts, like a jellyfish)
//    fps    : frames per second of the loop (default 3)       pixel: true keeps pixel art sharp
// ---------------------------------------------------------------------
const SPRITES = [
  // { frames: ["images/swimmers/turtle1.png", "images/swimmers/turtle2.png"],
  //   count: 3, size: 3, speed: 1.5, faces: "left", motion: "steady" },
];
