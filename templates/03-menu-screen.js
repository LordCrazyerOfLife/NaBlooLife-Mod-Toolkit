/* TEMPLATE 03: Menu Screen. Adds a row to the Main Menu that opens your own full screen,
 * drawn with the game's own list style. */
(() => {
  "use strict";
  const ID = "my-screen";
  const TITLE = "My Screen";
  let active = false;
  let hooked = false;

  const chevron = () => (typeof CHEV !== "undefined" ? CHEV : "");
  // only use row() with your own fixed text: it is inserted as HTML
  const row = (key, title, text) =>
    `<div class="row" data-${ID}="${key}"><img src="ui/gear.png"><div class="t"><b>${title}</b><span>${text}</span></div>${chevron()}</div>`;

  function openScreen() {
    sTitle.textContent = TITLE.toUpperCase();
    sSub.style.display = "none";
    sBack.innerHTML = typeof BACK_ICON !== "undefined" ? BACK_ICON : "&larr;";
    sBack.onclick = () => openMainMenu();
    sList.innerHTML = '<div class="sec">Options</div>' + row("hello", "Say hello", "Shows a popup");
    sList.querySelector(`[data-${ID}="hello"]`).onclick = () => notice("Hello", "You tapped the row.", null, true);
    sList.scrollTop = 0;
  }

  function addRow() {
    if (!active || sList.querySelector(`[data-${ID}="open"]`)) return;
    sList.insertAdjacentHTML("afterbegin", row("open", TITLE, "Opens my mod's screen"));
    sList.querySelector(`[data-${ID}="open"]`).onclick = openScreen;
  }

  const mod = {
    on() {
      active = true;
      // wrap only once. Never "un-wrap": another mod may have wrapped after you. Use the flag.
      if (hooked) return;
      hooked = true;
      const original = openMainMenu;
      openMainMenu = function (...args) {
        const result = original.apply(this, args);
        addRow();
        return result;
      };
    },
    off() {
      active = false;
      document.querySelectorAll(`[data-${ID}="open"]`).forEach((n) => n.remove());
    },
  };
  if (!(window.MOD_SOURCES && MOD_SOURCES.register(mod))) mod.on();
})();
