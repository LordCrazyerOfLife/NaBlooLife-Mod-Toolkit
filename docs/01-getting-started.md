# 1. Getting started

## What a mod is
A mod is **one plain JavaScript file** that runs inside the game's page. It can use the game's
functions, read and change the current life, and add things to the screen.

No build step is needed. `import` and `export` do not work.

## What you need
- A text editor (any code editor app, or `nano` in Termux).
- The game: your website, the installed web app, or the APK.
- Optional: Node.js, for the two command line tools (`pkg install nodejs` in Termux).

## Your first mod in five steps
1. Copy `templates/01-hello-mod.js`, or run:
   ```bash
   node tools/new-mod.mjs hello-mod my-first-mod "My First Mod"
   ```
   The new file is `my-mods/my-first-mod.js`.
2. Open it and change the popup text.
3. Check it:
   ```bash
   node tools/check-mod.mjs my-mods/my-first-mod.js
   ```
4. Put the file where your phone's file picker can see it, such as Downloads:
   ```bash
   cp my-mods/my-first-mod.js ~/storage/downloads/
   ```
5. In the game: **Main Menu → Custom Mod Sources → Pick a .js File**. Confirm the warning and
   give it a name. It starts straight away.

## Editing a mod you already added
The game keeps **its own copy** of the file. After editing:
1. Remove the old entry (the × button).
2. **Close and reopen the game**, so none of the old code is still running.
3. Add the new file.

## The three places mods live
| Screen in the game | Source | Who it is for |
|---|---|---|
| Custom Mod Sources | files you pick on your device | your own mods, testing |
| Verified Mods | `scripts/tools/modloader.js` + `mod/verified-mods/` | built in |
| Content Packs | `scripts/tools/content-packs.js` + `mod/content-packs/` | built in |

See [Publishing](07-publishing.md) to build a mod into the game.

## Safety
A mod has the same power as the game. It can read, change or delete your saves, and send data
elsewhere. **Only add mods you have read or trust.** Switching a mod off does not make it safe.
Back up any life you care about before testing.
