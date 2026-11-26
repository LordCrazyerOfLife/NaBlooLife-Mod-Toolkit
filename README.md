# NaBlooLife Mod Toolkit

Guide, templates and tools for making mods for NaBlooLife Overhaul.

## Start here
1. [Getting started](docs/01-getting-started.md)
2. [Mod structure and on/off](docs/02-mod-structure.md)
3. [Game functions you can use](docs/03-game-api.md)
4. [Events, yearly effects and careers](docs/04-events-and-careers.md)
5. [Saving data](docs/05-saving-data.md)
6. [Testing and debugging](docs/06-testing-and-debugging.md)
7. [Sharing and publishing](docs/07-publishing.md)

## Templates
| File | What you get |
|---|---|
| `templates/01-hello-mod.js` | the smallest mod with on/off |
| `templates/02-tabbed-menu.js` | **cheat-menu style window with tabs and no options** |
| `templates/03-menu-screen.js` | a Main Menu row that opens your own screen |
| `templates/04-random-event.js` | your own random events |
| `templates/05-yearly-effect.js` | something that happens every year, with saved data |
| `templates/06-special-career.js` | a side career under Special Careers |

## Tools
| Tool | Use |
|---|---|
| `node tools/new-mod.mjs` | make a new mod from a template |
| `node tools/check-mod.mjs file.js` | look for common mistakes (does not run the file) |
| `tools/inspector-mod.js` | in-game viewer for game names, save data and errors |
| `sandbox/index.html` | a pretend game for quick tests |

## Adding options to the tabbed menu
```js
const TABS = [
  {
    name: "Money",
    render(panel, ui) {
      ui.note("Example options");
      ui.button("Say hello", () => notice("Hello", "It works.", null, true));
      ui.number("Money", () => state.money, (n) => { state.money = n; renderStats(); });
      let sound = true;
      ui.toggle("Sample switch", () => sound, (v) => (sound = v));
    },
  },
];
```
(A variable that should keep its value between tab openings belongs outside `render`.)

**Mods can change or delete saved games. Only run mods you trust.**
