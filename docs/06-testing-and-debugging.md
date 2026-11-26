# 6. Testing and debugging

## Level 1: the checker
```bash
node tools/check-mod.mjs my-mods/my-mod.js
```
It checks syntax and looks for common mistakes **without running the file**. It is a pattern
check, so it can miss problems or warn about code that is fine. A pass does not mean safe.

## Level 2: the sandbox
`sandbox/index.html` is a pretend game with stand-ins for common functions.
```bash
cd NaBlooLife-Mod-Toolkit
python3 -m http.server 8777 --bind 127.0.0.1
```
Open `http://127.0.0.1:8777/sandbox/` in your browser, pick your mod file, then use
**Switch off**, **Switch on**, **Main Menu**, **Special Careers**, **Age up** and
**Run a mod event**. Tap **Reset** before loading another file.

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
With USB debugging on, open `chrome://inspect` in desktop Chrome to see your phone's console.

## Common problems
| Problem | Likely cause |
|---|---|
| Nothing happens at all | syntax error, or a name that doesn't exist yet. Run the checker |
| `state is not defined` or `window.state` is empty | use the bare name `state`; test in the game or sandbox, not Node |
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
