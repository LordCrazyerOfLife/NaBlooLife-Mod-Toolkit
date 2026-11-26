/* TEMPLATE 01: Hello Mod. The smallest complete mod with a working on/off switch.
 * Shows a popup when switched on. */
(() => {
  "use strict";
  const ID = "hello-mod"; // change this: lower-case, unique

  const mod = {
    on() {
      if (typeof notice === "function") notice("Hello", "My first mod is on!", null, true);
      console.log(`[${ID}] on`);
    },
    off() {
      console.log(`[${ID}] off`);
    },
  };

  // Custom Mod Sources: register() runs on() and off() for you.
  // Anywhere else it returns false (or doesn't exist), so start the mod directly.
  if (!(window.MOD_SOURCES && MOD_SOURCES.register(mod))) mod.on();
})();
