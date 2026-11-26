# 4. Events, yearly effects and careers

## Random events
`EVENTS` is the game's event pool. Add objects like this (full file: `templates/04-random-event.js`):

```js
{
  min: 18, max: 60,          // age range
  kind: "My Mod",            // label; the game tries not to repeat the same kind twice in a row
  key: "my-mod:wallet",      // unique name
  make() {                   // called when the event is chosen: build the card here
    return {
      who: "A stranger",     // name at the top of the card
      av: "1f9d1",           // emoji code for the avatar
      icon: "1f45b",         // emoji code for the title
      title: "Lost Wallet",
      desc: "You found a wallet.",
      choices: [ ["Return it", () => fx({ Happiness: 8 }, "I returned it.")] ],
    };
  },
}
```
- The game picks events; adding one does **not** guarantee it appears soon.
- Put random amounts inside `make()` so they differ each time.
- In `off()`, remove only your own objects: `EVENTS.splice(EVENTS.indexOf(myEvent), 1)`
  (check that the index is not -1).

## Running code each year
Listen to the Age button, wait a moment, and confirm the age really changed
(full file: `templates/05-yearly-effect.js`).
```js
document.getElementById("ageBtn").addEventListener("click", onTap);
```
A tap can be blocked by a popup, and other parts of the game may change age without this button.
Compare `state.age` with the last value you saw, and check `state.dead`.

## A special career
`templates/06-special-career.js` shows the whole pattern:
1. Wrap `openSpecialCareers` and add your row after the game's rows.
2. Draw your screen using `sTitle`, `sBack` and `sList`.
3. Keep progress in one field such as `state.modMyCareer`.
4. Limit actions to once per year by storing the age you last acted.
5. Use `chance()` for outcomes and `fx()` for results.

It is a **side career**: it does not set `state.job`. Taking over the main job affects many other
parts of the game; study `mod/content-packs/drift.js` in the game repository before trying.

## Balance tips
- Give every reward a cost or a risk.
- Base success on a stat: `chance(0.35 + skill / 200)`.
- Cap stats with `clamp()`.
- Test a young, an old, a jailed and a dead character.
