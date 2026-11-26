<div align="center">

# 🧰 NaBlooLife Mod Toolkit

**Make your own mods for NaBlooLife: a step-by-step guide, ready-made templates and testing tools.**

[▶️ Play the game](https://lordcrazyeroflife.github.io/NaBlooLife-Overhaul/game.html) ·
[🚀 Quick start](#-quick-start) ·
[📚 Guide](#-guide) ·
[🧩 Templates](#-templates) ·
[🛠️ Tools](#-tools)

</div>

---

A mod is **one JavaScript file**. You pick it inside the game and it starts straight away.
There is nothing to compile. If you can edit a text file, you can start modding.

> [!WARNING]
> A mod has the same access as the game: it can change or delete saved games and send data over
> the internet. **Only run mods you trust**, and back up any life you care about.

## 🚀 Quick start

1. **Download** [`templates/01-hello-mod.js`](templates/01-hello-mod.js) (open it, then use GitHub's
   download button).
2. **Open the game** and go to **Main Menu → Custom Mod Sources**.
3. Tap **Pick a .js File From This Device**, choose your file, and confirm.

A "Hello" popup means it works. Now open the file in a text editor, change the message, and read
[Getting started](docs/01-getting-started.md) to see how to load your new version.

> [!NOTE]
> Don't see **Custom Mod Sources**? Refresh the game to get the latest version.

## 📚 Guide

| # | Chapter | You will learn |
|:-:|---|---|
| 1 | [**Getting started**](docs/01-getting-started.md) | make, load and update your first mod |
| 2 | [**Mod structure and on/off**](docs/02-mod-structure.md) | how to switch cleanly without reloading |
| 3 | [**Game functions**](docs/03-game-api.md) | stats, money, popups, choice cards and menus |
| 4 | [**Events and careers**](docs/04-events-and-careers.md) | random events, yearly effects, side careers |
| 5 | [**Saving data**](docs/05-saving-data.md) | keep your mod's progress inside each life |
| 6 | [**Testing and debugging**](docs/06-testing-and-debugging.md) | find and fix problems |
| 7 | [**Sharing your mod**](docs/07-publishing.md) | give it to others or suggest it for the game |

## 🧩 Templates

Each template is a complete, working mod. Start with the one closest to your idea.

| Template | What you get | Level |
|---|---|:-:|
| [`01-hello-mod.js`](templates/01-hello-mod.js) | the smallest mod with an on/off switch | 🟢 |
| [`02-tabbed-menu.js`](templates/02-tabbed-menu.js) | **an empty cheat-style menu: draggable button and tabs, no options** | 🟢 |
| [`03-menu-screen.js`](templates/03-menu-screen.js) | a Main Menu row that opens your own screen | 🟡 |
| [`04-random-event.js`](templates/04-random-event.js) | your own random event | 🟡 |
| [`05-yearly-effect.js`](templates/05-yearly-effect.js) | something that happens each year, with saved data | 🟡 |
| [`06-special-career.js`](templates/06-special-career.js) | a side career under Special Careers | 🔴 |

🟢 beginner · 🟡 intermediate · 🔴 advanced

### Add options to the tabbed menu

Replace the `TABS` list in `02-tabbed-menu.js` with this:

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

| Control | What it does |
|---|---|
| `ui.button(label, onTap)` | a button |
| `ui.note(text)` | a line of help text |
| `ui.number(label, get, set)` | a box for editing a number |
| `ui.toggle(label, get, set)` | an on/off button |
| `ui.refresh()` | redraws the open tab |

> [!TIP]
> `render` runs every time its tab opens. To keep a value, such as `sound` above, declare it
> **outside** `render`.

## 🔧 Tools

**Nothing to install.** The tools are web pages and a mod that runs in the game.

| Tool | What it's for | How to use it |
|---|---|---|
| [`mod-maker.html`](mod-maker.html) | makes a named mod from a template, and checks mods for common mistakes | open in a browser |
| [`sandbox/index.html`](sandbox/index.html) | a pretend game for quick tests | open in a browser |
| [`inspector-mod.js`](tools/inspector-mod.js) | shows game functions, saved data and errors | add it in the game |

### How to open the tools
1. Download the toolkit: **Code → Download ZIP**.
2. Unzip it.
3. Open `mod-maker.html` in your browser.

> [!NOTE]
> GitHub shows an HTML file's code instead of running it, so download it first. On some phones,
> opening a downloaded HTML file is awkward: try **Open with** and choose your browser, or use a
> computer. You can always skip the tools and edit a file from `templates/` directly.

## 🗂️ What's inside

```text
NaBlooLife-Mod-Toolkit/
├── docs/        the guide, chapters 1 to 7
├── templates/   six working mods to copy
├── tools/       in-game inspector
├── sandbox/     test page with a pretend game
└── mod-maker.html   make and check mods in your browser
```

## ℹ️ Good to know

- This is **not an official, stable API**. The guide describes how the game's code works now,
  and a game update can change it.
- Test every mod in the real game. The sandbox and checker can't catch everything.
- Found a mistake or a broken template? See [CONTRIBUTING.md](CONTRIBUTING.md).
