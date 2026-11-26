[⬅️ 4. Events, yearly effects and careers](04-events-and-careers.md) &nbsp;|&nbsp; [🏠 Toolkit home](../README.md) &nbsp;|&nbsp; [6. Testing and debugging ➡️](06-testing-and-debugging.md)

# 5. Saving data

> **On this page:** [Per life](#per-life) · [Updating your data format](#updating-your-data-format) · [When it saves](#when-it-saves) · [When your mod is switched off](#when-your-mod-is-switched-off) · [Editing while testing](#editing-while-testing)

## Per life
Anything you put on `state` is saved with that life.
```js
const data = () => (state.modMyThing ||= { level: 1, history: [] });
```
- Use **one field with a unique name**, starting with `mod`.
- Store only plain data: numbers, text, booleans, lists and simple objects.
- Never store functions, page elements or timers.
- Read it through a function like `data()`: the player can switch lives, so don't keep a copy
  in a variable.

## Updating your data format
Older saves have your old shape. Fill in what is missing:
```js
function data() {
  const d = (state.modMyThing ||= {});
  d.level ??= 1;
  d.history ??= [];
  return d;
}
```
Keep lists short, for example `d.history = d.history.slice(-50)`.

## When it saves
The game saves the life itself at various points. To ask for a save after an important change:
```js
window.blSaveLife?.();
```

## When your mod is switched off
Leave the player's progress in place, so turning the mod back on restores it. Offer a separate
"reset my data" button if it makes sense, with `iosConfirm`.

## Editing while testing
The built-in **Mod Menu** (Verified Mods) has a **Data** tab: search for your field name and edit
values to test edge cases. Its **Career** tab lists a fixed set of careers, so look for yours in
**Data**.

---

[⬅️ 4. Events, yearly effects and careers](04-events-and-careers.md) &nbsp;|&nbsp; [🏠 Toolkit home](../README.md) &nbsp;|&nbsp; [6. Testing and debugging ➡️](06-testing-and-debugging.md)
