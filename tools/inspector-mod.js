/* TOOL: Mod Inspector. Add it through Custom Mod Sources. It shows which game functions
 * are available, what is in the saved life, and recent errors. It changes nothing. */
(() => {
  "use strict";
  // The game declares most names with const/let, so "window.state" does NOT work for them.
  const NAMES = {
    state: () => typeof state, EVENTS: () => typeof EVENTS, notice: () => typeof notice, say: () => typeof say,
    fx: () => typeof fx, usd: () => typeof usd, chance: () => typeof chance, rint: () => typeof rint,
    pickR: () => typeof pickR, clamp: () => typeof clamp, renderStats: () => typeof renderStats,
    jCard: () => typeof jCard, iosConfirm: () => typeof iosConfirm, openMainMenu: () => typeof openMainMenu,
    openSpecialCareers: () => typeof openSpecialCareers, sList: () => typeof sList, sTitle: () => typeof sTitle,
    CHEV: () => typeof CHEV, BACK_ICON: () => typeof BACK_ICON, modBox: () => typeof modBox,
    MOD_SOURCES: () => typeof window.MOD_SOURCES,
  };
  const errors = [];
  const onError = (e) => {
    errors.unshift(`${e.message} (line ${e.lineno})`);
    errors.length = Math.min(errors.length, 20);
  };
  let nodes = [];

  const mod = {
    on() {
      if (nodes.length) return;
      window.addEventListener("error", onError);
      const open = document.createElement("button");
      open.id = "modInspectorBtn";
      open.textContent = "\u{1F50D}";
      open.style.cssText = "position:fixed;left:14px;bottom:150px;z-index:2147482950;width:46px;height:46px;border:0;border-radius:50%;background:#0b7a75;color:#fff;font-size:20px";
      const box = document.createElement("pre");
      box.style.cssText = "position:fixed;inset:8% 4%;z-index:2147482951;display:none;overflow:auto;margin:0;padding:14px;border-radius:12px;background:#101319;color:#d8ffe8;font:12px/1.5 monospace;white-space:pre-wrap;text-align:left";
      open.onclick = () => {
        if (box.style.display === "block") return void (box.style.display = "none");
        const lines = ["GAME NAMES"];
        for (const [n, t] of Object.entries(NAMES)) lines.push(`  ${t() === "undefined" ? "MISSING" : "ok     "} ${n} (${t()})`);
        lines.push("", "SAVED LIFE (state)");
        if (typeof state !== "undefined")
          for (const k of Object.keys(state).sort()) {
            const v = state[k];
            lines.push(`  ${k}: ${Array.isArray(v) ? `list of ${v.length}` : v && typeof v === "object" ? `{ ${Object.keys(v).slice(0, 8).join(", ")} }` : String(v).slice(0, 40)}`);
          }
        lines.push("", "ERRORS SINCE THE INSPECTOR STARTED", ...(errors.length ? errors : ["  none seen"]));
        box.textContent = lines.join("\n");
        box.style.display = "block";
      };
      box.onclick = () => (box.style.display = "none");
      nodes = [open, box];
      document.body.append(box, open);
    },
    off() {
      window.removeEventListener("error", onError);
      nodes.forEach((n) => n.remove());
      nodes = [];
    },
  };
  if (!(window.MOD_SOURCES && MOD_SOURCES.register(mod))) mod.on();
})();
