[⬅️ 5. Saving data](05-saving-data.md) &nbsp;|&nbsp; [🏠 Toolkit home](../README.md) &nbsp;|&nbsp; [7. Sharing your mod ➡️](07-publishing.md)

# 6. Testing and debugging

> **On this page:** [Level 1: the checker](#level-1-the-checker) · [Level 2: the sandbox](#level-2-the-sandbox) · [Level 3: the real game](#level-3-the-real-game) · [Reading errors with a computer](#reading-errors-with-a-computer) · [Common problems](#common-problems) · [Waiting for the game](#waiting-for-the-game)

## Level 1: the checker
Open `mod-maker.html` in your browser and choose your file under **Check a mod**.
It checks syntax and looks for common mistakes **without running the file**. It is a pattern
check, so it can miss problems or warn about code that is fine. A pass does not mean safe.
Syntax messages don't include a line number: your browser console or code editor can help.

## Level 2: the sandbox
`sandbox/index.html` is a pretend game with stand-ins for common functions.

Open it in your browser, pick your mod file, then use **Switch off**, **Switch on**,
**Main Menu**, **Special Careers**, **Age up** and **Run a mod event**.
Tap **Reset** before loading another file.

The sandbox does **not** include the whole game. A mod can pass there and still fail in the game.

## Level 3: the real game
Add the mod through Custom Mod Sources. Add `tools/inspector-mod.js` too: its search button
shows which game names exist, what is in `state`, and errors seen since it started.

### Checklist
- [ ] It starts with no errors.
- [ ] Switch it off: everything it added is gone or inactive.
- [ ] Switch it on and off five times: nothing is duplicated.
- [ ] Reopen the game with it on, and again with it off.
- [ ] Open the menus it changes, twice.
- [ ] Age up several years.
- [ ] Try a baby, an adult, a prisoner and a new life.
- [ ] Works with the Mod Menu, Cheat Menu and your other mods.

## Reading errors with a computer
On a computer, open your browser's developer tools and look at the **Console**. For Chrome on
Android, turn on USB debugging, connect the phone, and open `chrome://inspect` on the computer.

## Common problems
| Problem | Likely cause |
|---|---|
| Nothing happens at all | syntax error, or a name that doesn't exist yet. Use the checker |
| `state is not defined` or `window.state` is empty | use the bare name `state`; test in the game or sandbox |
| `register() needs on() and off()` | missing function, or `register` called late |
| Rows stop responding | something used `innerHTML +=` on the list |
| Two buttons appear | `on()` doesn't check whether it already ran, or the mod is installed twice |
| Old behaviour after editing | remove it, reopen the game, add the new file |
| Added but never starts | it is switched off in Custom Mod Sources |
| "Couldn't Save" when adding | browser storage is full: remove old custom mods or make the file smaller |
| Picker greys out the file | try another file manager in the picker |

## Waiting for the game
Mods from the pickers load after the main menu is ready. If something you need is created later,
retry a limited number of times:
```js
let tries = 0;
(function wait() {
  if (typeof somethingLate !== "undefined") return start();
  if (++tries < 100) setTimeout(wait, 100);
})();
```

---

[⬅️ 5. Saving data](05-saving-data.md) &nbsp;|&nbsp; [🏠 Toolkit home](../README.md) &nbsp;|&nbsp; [7. Sharing your mod ➡️](07-publishing.md)
