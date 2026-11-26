[⬅️ 6. Testing and debugging](06-testing-and-debugging.md) &nbsp;|&nbsp; [🏠 Toolkit home](../README.md)

# 7. Sharing your mod

> **On this page:** [Share the file](#share-the-file) · [Suggest it for the game](#suggest-it-for-the-game) · [Before you share](#before-you-share)

## Share the file
Send people your `.js` file. They add it through **Custom Mod Sources**.

Include a short description like this:

```text
Name:     My Cool Menu
Version:  1.0
Does:     what it adds or changes
Changes:  anything it does to the save
Online:   whether it sends or loads anything over the internet
Tested:   where you tried it
```

> [!TIP]
> Share readable code, so people can check what they are about to run.

### Updating a shared mod
Give each release a new version number, and tell users to remove the old entry, reopen the game,
then add the new file. Keep your [saved data](05-saving-data.md) compatible with older versions.

## Suggest it for the game
Mods can be built into the [game repository](https://github.com/LordCrazyerOfLife/NaBlooLife-Overhaul)
through a pull request. The game's maintainer decides what is included.

### 1. Add the file
Fork the game repository. Put your mod in `mod/content-packs/`.
`mod/verified-mods/` is for mods the maintainer has chosen to mark as verified.

### 2. List it
Add an entry to the `MODS` list in `scripts/tools/content-packs.js`:
```js
{
  id: "my-mod",                         // unique; used to remember on/off
  name: "My Mod",
  icon: "ui/gear.png",
  src: "../mod/content-packs/my-mod.js?v=1",
  deps: [],                             // optional files to load first
  desc: "What it does.",
},
```
Verified Mods uses the same format in `scripts/tools/modloader.js`.

### 3. Update version numbers
In `game.html`, increase the `?v=` number on the loader file you edited. When you update your mod
later, increase its `?v=` number in the entry too.

### 4. Test again, then open a pull request
Built-in mods behave differently:

| | Custom Mod Sources | Built into the game |
|---|---|---|
| Starts | after the player adds it | **on by default** |
| Switching | calls your `on()` and `off()` | uses the automatic switch |

With the templates' last line, `register()` returns `false` for a built-in mod, so the mod calls
`on()` itself. The automatic switch does **not** call your `off()`, and does not undo changes to
the save or to lists such as `EVENTS`.

## Before you share
- [ ] You made the code, text and art, or have permission to share them.
- [ ] No real people without their permission.
- [ ] No passwords, tokens, signing keys or personal information in any file.
- [ ] Anything that uses the internet is clearly explained.
- [ ] You completed the [testing checklist](06-testing-and-debugging.md#level-3-the-real-game).

---

[⬅️ 6. Testing and debugging](06-testing-and-debugging.md) &nbsp;|&nbsp; [🏠 Toolkit home](../README.md)
