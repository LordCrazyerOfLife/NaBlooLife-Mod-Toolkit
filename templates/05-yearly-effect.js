/* TEMPLATE 05: Yearly Effect. Runs your code each time the player ages up,
 * and keeps its own data inside the saved life. */
(() => {
  "use strict";
  const ID = "my-yearly";
  const KEY = "modMyYearly"; // your own field in the save. Make it unique.
  let button = null;
  let timer = 0;
  let lastAge = null;

  // create the data the first time it is needed. Keep it plain: numbers, text, true/false, lists.
  const data = () => (state[KEY] ||= { years: 0, total: 0 });

  function newYear() {
    if (state.dead || state.age === lastAge) return; // the tap didn't age the character
    lastAge = state.age;
    if (state.age < 18) return;
    const d = data();
    d.years += 1;
    d.total += 100;
    fx({ money: 100 }, `My side income paid me ${usd(100)}.`);
  }

  function onTap() {
    clearTimeout(timer);
    timer = setTimeout(newYear, 400); // let the game finish its own yearly work first
  }

  const mod = {
    on() {
      if (button) return;
      button = document.getElementById("ageBtn");
      if (!button) return void console.warn(`[${ID}] Age button not found`);
      lastAge = state.age;
      button.addEventListener("click", onTap);
    },
    off() {
      button?.removeEventListener("click", onTap);
      button = null;
      clearTimeout(timer);
    },
  };
  if (!(window.MOD_SOURCES && MOD_SOURCES.register(mod))) mod.on();
})();
