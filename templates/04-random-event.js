/* TEMPLATE 04: Random Event. Adds your own events to the game's event pool. */
(() => {
  "use strict";
  const ID = "my-events";

  const MY_EVENTS = [
    {
      min: 18, // youngest age
      max: 60, // oldest age
      kind: "My Mod", // label on the card; also used to avoid repeats
      key: `${ID}:wallet`,
      make() {
        const amount = rint(20, 200);
        return {
          who: "A stranger",
          av: "1f9d1",
          icon: "1f45b", // emoji code: a file name in the game's emoji folder
          title: "Lost Wallet",
          desc: `You found a wallet with ${usd(amount)} in it.`,
          choices: [
            ["Return it", () => fx({ Happiness: 8 }, "I returned a lost wallet.")],
            ["Keep the money", () => fx({ money: amount, Happiness: -4 }, "I kept the cash from a lost wallet.")],
          ],
        };
      },
    },
  ];

  const mod = {
    on() {
      if (typeof EVENTS === "undefined") return void console.warn(`[${ID}] event list not ready`);
      MY_EVENTS.forEach((e) => EVENTS.includes(e) || EVENTS.push(e));
    },
    off() {
      MY_EVENTS.forEach((e) => {
        const i = EVENTS.indexOf(e);
        if (i >= 0) EVENTS.splice(i, 1);
      });
    },
  };
  if (!(window.MOD_SOURCES && MOD_SOURCES.register(mod))) mod.on();
})();
