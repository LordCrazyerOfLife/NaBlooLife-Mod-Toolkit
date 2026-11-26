[🏠 Toolkit home](../README.md) &nbsp;|&nbsp; [2. Mod structure and on/off ➡️](02-mod-structure.md)

# 1. Getting started

> **On this page:** [What you need](#what-you-need) · [Your first mod](#your-first-mod) · [Updating your mod](#updating-your-mod) · [Switching and removing](#switching-and-removing)

## What you need
| You need | For |
|---|---|
| [The game](https://lordcrazyeroflife.github.io/NaBlooLife-Overhaul/game.html) | running your mod |
| A text or code editor | writing your mod |
| A web browser | the [Mod Maker](../README.md#-tools) and sandbox *(optional)* |

A mod is **one plain JavaScript file** that runs inside the game's page. It can use the game's
functions, read and change the current life, and add things to the screen.
`import` and `export` do not work, and there is no build step.

> [!WARNING]
> A mod can read, change or delete your saves, and send data elsewhere. Only add mods you have
> read or trust. Back up any life you care about before testing.

## Your first mod

### 1. Get a starting file
Download [`01-hello-mod.js`](../templates/01-hello-mod.js). Or open `mod-maker.html` from the
downloaded toolkit, choose **Hello Mod**, type a name and tap **Download my mod**.

### 2. Change something
Open the file and find this line. Change the message:
```js
notice("Hello", "My first mod is on!", null, true);
```

### 3. Check it *(optional)*
In `mod-maker.html`, under **Check a mod**, choose your file.

### 4. Load it
1. Save the file on the device you play on, for example in **Downloads**.
2. In the game, open **Main Menu → Custom Mod Sources**.
3. Tap **Pick a .js File From This Device**.
4. Choose your file, read the warning, confirm and give it a name.

It starts straight away. 🎉

## Updating your mod
The game keeps **its own copy** of the file, so editing the original changes nothing in the game.

1. In Custom Mod Sources, remove the old entry with **×**.
2. **Close and reopen the game**, so none of the old code is still running.
3. Add your new file.

## Switching and removing
Tap a mod's row to switch it on or off. Tap **×** to remove it.
If a mod can't fully undo what it did, reload the game. Changes already made to a life can remain.

> [!NOTE]
> Added mods are saved on that device, in that browser or app. The website and the Android app
> keep separate lists.

---

[🏠 Toolkit home](../README.md) &nbsp;|&nbsp; [2. Mod structure and on/off ➡️](02-mod-structure.md)
