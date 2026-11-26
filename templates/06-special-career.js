/* TEMPLATE 06: Special Career. A row under Occupation > Special Careers with joining,
 * one yearly action, a skill stat and quitting. Data lives in state.modMyCareer,
 * so the Mod Menu's Data tab can find and edit it. */
(() => {
  "use strict";
  const ID = "my-career";
  const KEY = "modMyCareer";
  const NAME = "Street Performer";
  const MIN_AGE = 16;
  let active = false;
  let hooked = false;

  const chevron = () => (typeof CHEV !== "undefined" ? CHEV : "");
  const row = (key, title, text, dim) =>
    `<div class="row${dim ? " dis" : ""}" data-${ID}="${key}"><img src="ui/gear.png"><div class="t"><b>${title}</b><span>${text}</span></div>${dim ? "" : chevron()}</div>`;
  const find = (key) => sList.querySelector(`[data-${ID}="${key}"]`);

  function openCareer() {
    sTitle.textContent = NAME.toUpperCase();
    sSub.style.display = "none";
    sBack.innerHTML = typeof BACK_ICON !== "undefined" ? BACK_ICON : "&larr;";
    sBack.onclick = () => openSpecialCareers();
    const c = state[KEY];
    if (!c) {
      sList.innerHTML = '<div class="sec">Join</div>' + row("join", "Start performing", `Age ${MIN_AGE}+`);
      find("join").onclick = () => {
        if (state.age < MIN_AGE) return notice("Too Young", `You must be ${MIN_AGE}.`, null, true);
        state[KEY] = { skill: rint(5, 25), earned: 0, playedAt: null };
        say(`I became a ${NAME.toLowerCase()}.`);
        openCareer();
      };
      return;
    }
    const used = c.playedAt === state.age;
    sList.innerHTML =
      `<div class="sec">Skill ${c.skill}/100 · Earned ${usd(c.earned)}</div>` +
      row("play", "Perform", used ? "Already performed this year" : "Once a year", used) +
      row("quit", "Quit", "Leave this career");
    if (!used)
      find("play").onclick = () => {
        c.playedAt = state.age;
        const good = chance(0.35 + c.skill / 200); // the Mod Menu's Odds tab can change chance()
        const pay = good ? rint(50, 400) + c.skill * 5 : rint(0, 30);
        c.skill = clamp(c.skill + rint(2, 7));
        c.earned += pay;
        fx({ money: pay, Happiness: good ? 5 : -3 }, `I performed on the street and made ${usd(pay)}.`);
        notice(good ? "Great Show" : "Tough Crowd", `You made ${usd(pay)}.`, null, true);
        openCareer();
      };
    find("quit").onclick = () => {
      delete state[KEY];
      say(`I quit being a ${NAME.toLowerCase()}.`);
      openCareer();
    };
  }

  function addRow() {
    if (!active || find("open")) return;
    sList.insertAdjacentHTML("beforeend", row("open", NAME, "Perform for tips"));
    find("open").onclick = openCareer;
  }

  const mod = {
    on() {
      active = true;
      if (hooked) return;
      hooked = true;
      const original = openSpecialCareers;
      openSpecialCareers = function (...args) {
        const result = original.apply(this, args);
        addRow();
        return result;
      };
    },
    off() {
      active = false; // the saved career data is kept on purpose
      document.querySelectorAll(`[data-${ID}="open"]`).forEach((n) => n.remove());
    },
  };
  if (!(window.MOD_SOURCES && MOD_SOURCES.register(mod))) mod.on();
})();
