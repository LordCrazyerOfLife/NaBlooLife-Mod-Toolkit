# 2. Mod structure and on/off

## The skeleton
```js
(() => {
  "use strict";
  const mod = {
    on()  { /* add everything */ },
    off() { /* remove everything on() added */ },
  };
  if (!(window.MOD_SOURCES && MOD_SOURCES.register(mod))) mod.on();
})();
```

**Why the wrapper `(() => { ... })();`?** Every script shares one set of names with the game.
Without it, your `state`, `row` or `open` can collide with the game's and stop your file loading.

**Why the last line?** In Custom Mod Sources, `register()` runs `on()` for you if the mod is
enabled, and returns `true`. When the file is built into Verified Mods or Content Packs,
`register()` returns `false` (it logs a warning), so the mod starts itself.

## Rules for register()
- Call it **at the top level** of the file. Not inside `setTimeout`, a promise or a tap handler,
  or the game cannot tell which mod is calling.
- Give it both `on` and `off` functions.
- `on()` and `off()` can run many times. Running `on()` twice must not create two of anything.

## Writing a good off()
| on() does | off() must |
|---|---|
| adds an element or `<style>` | `.remove()` it |
| `addEventListener` | `removeEventListener` with **the same function** |
| `setInterval` / `setTimeout` | `clearInterval` / `clearTimeout` |
| `MutationObserver.observe` | `disconnect()` |
| pushes into `EVENTS` | splice **your** entries out |
| wraps a game function | set an "inactive" flag (see below) |

Keep the same function reference:
```js
const onTap = () => {};
button.addEventListener("click", onTap);     // on()
button.removeEventListener("click", onTap);  // off()
```

### Wrapping game functions
```js
let active = false, hooked = false;
function on() {
  active = true;
  if (hooked) return;            // wrap once only
  hooked = true;
  const original = openMainMenu;
  openMainMenu = function (...args) {
    const result = original.apply(this, args);
    if (active) addMyRow();
    return result;               // always pass the result back
  };
}
function off() { active = false; }
```
Do **not** put `original` back in `off()`: another mod may have wrapped your wrapper, and
restoring would silently remove theirs.

## The automatic off switch
A mod without `register()` can still be switched off. While its code runs, the game tracks its
timers, event listeners, page watchers, new elements and replaced global functions, then pauses,
hides or bypasses them. It **cannot** undo changes to money, stats, the save, lists such as
`EVENTS`, or things that were already on screen (including `button.onclick = ...`).
It may also miss work that continues after `await` or a network reply.
**Write on() and off().** It is the dependable way.

Neither method undoes what already happened to a life.

## Settings that survive a restart
- Data about **this life** goes in `state` (see [Saving data](05-saving-data.md)).
- Preferences for **all lives** can use `localStorage` with your own prefix:
  `localStorage.setItem("mymod:my-menu:color", "blue")`. Never call `localStorage.clear()`.
