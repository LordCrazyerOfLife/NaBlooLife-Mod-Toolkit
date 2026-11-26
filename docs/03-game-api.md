# 3. Game functions you can use

These were read from the game's code. It was not written as a public API, so a game update can
change any of them. Check before you call, and use `tools/inspector-mod.js` to see what exists.

## Important: names are not on `window`
`state`, `EVENTS`, `CHEV`, `BACK_ICON` and many helpers are declared with `const`.
```js
window.state            // undefined
typeof state            // "object"  (use the bare name)
```
Functions declared with `function name()` (such as `openMainMenu`) are on `window` and can be
wrapped. Helpers declared with `const` (such as `chance`, `say`, `usd`) cannot be reassigned.

## The life: `state`
| Field | Meaning |
|---|---|
| `state.age`, `state.dead` | age; whether the character has died |
| `state.money` | bank balance |
| `state.stats.Happiness / Health / Smarts / Looks` | main stats, 0-100 |
| `state.job` | current job or `null`; has `t` (title), `pay`, `perf`, `kind` |
| `state.partJob`, `state.school`, `state.prison` | `null` when not applicable |
| `state.country`, `state.city` | where the character lives |
| `state.parents`, `state.family`, `state.friends`, `state.lovers`, `state.spouse` | people; many have `rel` (0-100) |
| `state.record`, `state.felony` | criminal history |

After changing money or stats directly, call `renderStats()`.

## Messages
```js
say("I did a thing.");                     // a line in the life diary
notice("Title", "Text", onClose, true);    // popup; onClose may be null
iosConfirm("Title", "Question?", onYes);   // yes / cancel box
```
`notice` and `jCard` may skip modern-sounding text in historical eras.
`notice` text is HTML: never put text from a save or a file into it without escaping.

## Changing stats
```js
fx({ money: 500, Happiness: 5 }, "I won a prize.");  // applies changes and writes the diary line
```
In historical eras the game converts money amounts given to `fx`.

## Helpers
| Call | Result |
|---|---|
| `clamp(n)` | n kept between 0 and 100 |
| `rint(a, b)` | whole number from a to b, both included |
| `pickR(list)` | random item |
| `chance(p)` | `true` with probability p (0 to 1) |
| `usd(n)` | money as text in the current currency |
| `modBox(on)` | image path for a checkbox |

Use `chance()` instead of `Math.random() < p`: the Mod Menu's Odds tab can then test your mod's
good and bad outcomes.

## Choice cards: `jCard`
```js
jCard({
  tag: "My Mod",
  iconSrc: "ui/gear.png",
  title: "A Choice",
  lead: "What will you do?",
  rows: [["Reward", usd(100)]],           // [label, value] lines
  choices: [
    ["Take it", () => fx({ money: 100 }, "I took it.")],   // [text, action, optional color]
    ["Walk away", () => say("I walked away."), "gray"],
  ],
  close: true,                            // show an X
});
```
Colors include `"green"`, `"gold"`, `"dark"` and `"gray"`.

## Screens
The slide-up menus share these elements: `sTitle`, `sSub`, `sBack`, `sList`.
```js
sTitle.textContent = "MY SCREEN";
sSub.style.display = "none";
sBack.innerHTML = BACK_ICON;
sBack.onclick = () => openMainMenu();
sList.innerHTML = '<div class="sec">Section</div>' +
  '<div class="row"><img src="ui/gear.png"><div class="t"><b>Name</b><span>Details</span></div>' + CHEV + '</div>';
```
Add the class `dis` to a row to grey it out.

Useful functions to wrap or call: `openMainMenu()`, `openOccupation()`, `openActivities()`,
`openSpecialCareers()`.

## File paths
The game page sets its base folder to `unsorted/`. So `"ui/gear.png"` means
`unsorted/ui/gear.png`. To reach a top-level folder, start with `../`.
A picked custom mod cannot bring image files with it: use the game's images, emoji text,
inline SVG or `data:` URLs.
