# 7. Sharing and publishing

## Share a file
Send the `.js` file. The other person adds it with Custom Mod Sources. Tell them what it changes.
Added mods are stored per device and per browser (the website and the APK are separate).

## Build it into the game
In the **game repository**:

1. Put the file in `mod/verified-mods/` or `mod/content-packs/`.
2. Add an entry to the `MODS` list in `scripts/tools/modloader.js` (Verified Mods) or
   `scripts/tools/content-packs.js` (Content Packs):
   ```js
   {
     id: "my-mod",                       // unique; used to remember on/off
     name: "My Mod",
     icon: "ui/gear.png",
     src: "../mod/content-packs/my-mod.js?v=1",
     deps: [],                           // optional files to load first
     desc: "What it does.",
   },
   ```
3. In `game.html`, increase the `?v=` number on the loader file you edited.
4. When you change your mod later, increase its `?v=` number in the entry too.

Built-in mods are **on by default**. They are switched with the automatic off switch: the loader
does not call your `off()`. With the template's last line, `register()` returns `false` and the
mod calls `on()` itself. Test the switch again after building it in: changes your mod makes to
lists such as `EVENTS`, or to the save, are not undone by the automatic switch.

## Upload
```bash
cd ~/Naboolife/NaBlooLife-Overhaul
git pull --ff-only
git add mod scripts/tools game.html
git commit -m "Add My Mod"
git push
```
A push to `main` updates the website and starts a new APK build.

## Good manners
- Only include art, text and code you made or have permission to use.
- Don't put real people into mods without permission.
- Never put tokens, passwords or signing keys in a repository.
- Say clearly if a mod sends anything over the internet.
