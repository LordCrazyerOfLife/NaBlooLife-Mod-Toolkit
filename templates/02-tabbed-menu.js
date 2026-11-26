/* TEMPLATE 02: Tabbed Menu. A cheat-menu style window with a draggable button and tabs,
 * and NO options in it. Add your own in the TABS list below. */
(() => {
  "use strict";
  const ID = "my-menu"; // change this: lower-case, unique (used for element ids and CSS)
  const TITLE = "My Menu";
  const ICON = "\u{1F9F0}";
  const COLOR = "#2f6fdb";

  // ------------------------------------------------------------------ YOUR TABS
  // render(panel, ui) fills one tab. It runs each time the tab is opened.
  // ui.button(label, onTap)   ui.note(text)   ui.number(label, get, set)   ui.toggle(label, get, set)
  const TABS = [
    { name: "Tab 1", render(panel, ui) {} },
    { name: "Tab 2", render(panel, ui) {} },
    { name: "Tab 3", render(panel, ui) {} },
  ];

  // ------------------------------------------------------------------ menu engine
  let made = []; // everything on() adds to the page, so off() can remove it

  const make = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text; // textContent: text is never run as HTML
    return n;
  };

  function on() {
    if (made.length) return; // already on
    const P = `#${ID}`;
    const style = make("style");
    style.textContent = `
      ${P}-fab { position:fixed; z-index:2147482900; right:14px; bottom:150px; width:50px; height:50px; border:0; border-radius:50%;
        background:${COLOR}; color:#fff; font-size:22px; padding:0; touch-action:none; user-select:none; box-shadow:0 3px 14px rgba(0,0,0,.5); }
      ${P}-back { position:fixed; inset:0; z-index:2147482901; background:rgba(0,0,0,.5); display:none; }
      ${P} { position:fixed; z-index:2147482902; left:50%; top:50%; transform:translate(-50%,-50%); width:min(350px,94vw);
        height:min(480px,80vh); display:none; flex-direction:column; background:#1b1e26; color:#fff; border-radius:16px; overflow:hidden;
        font-family:system-ui,sans-serif; text-align:left; box-shadow:0 10px 40px rgba(0,0,0,.6); }
      ${P} button { font-family:inherit; cursor:pointer; }
      ${P} .m-head { display:flex; align-items:center; padding:12px 14px; background:#20242e; }
      ${P} .m-title { flex:1; font-weight:800; font-size:16px; }
      ${P} .m-x { width:30px; height:30px; border:0; border-radius:50%; background:#2d323d; color:#fff; }
      ${P} .m-tabs { display:flex; gap:4px; padding:8px; overflow-x:auto; border-bottom:1px solid #2d323d; }
      ${P} .m-tab { flex:1 0 auto; border:0; border-radius:9px; padding:8px 10px; background:transparent; color:#9aa0ab;
        font-size:12px; font-weight:800; text-transform:uppercase; }
      ${P} .m-tab.active { background:#323849; color:#fff; }
      ${P} .m-body { flex:1; overflow-y:auto; padding:12px 14px; }
      ${P} .m-btn { display:block; width:100%; margin-bottom:8px; padding:11px; border:0; border-radius:9px; background:#2a2f3b;
        color:#fff; font-size:13px; font-weight:700; text-align:left; }
      ${P} .m-note { margin:0 0 10px; color:#9aa0ab; font-size:12px; line-height:1.45; }
      ${P} .m-row { display:flex; align-items:center; gap:8px; margin-bottom:8px; font-size:13px; }
      ${P} .m-row span { flex:1; }
      ${P} .m-row input { width:110px; padding:8px; border:1px solid #3a4257; border-radius:8px; background:#151821; color:#fff; }
    `;

    const fab = make("button", "", ICON);
    (fab.id = `${ID}-fab`), (fab.type = "button"), fab.setAttribute("aria-label", TITLE);
    const back = make("div");
    back.id = `${ID}-back`;
    const win = make("div");
    win.id = ID;
    const head = make("div", "m-head");
    const x = make("button", "m-x", "✕");
    head.append(make("div", "m-title", TITLE), x);
    const bar = make("div", "m-tabs");
    const body = make("div", "m-body");
    win.append(head, bar, body);

    let current = 0;
    const ui = {
      button(label, onTap) {
        const b = make("button", "m-btn", label);
        b.type = "button";
        b.addEventListener("click", () => onTap(b));
        return body.appendChild(b);
      },
      note: (text) => body.appendChild(make("div", "m-note", text)),
      number(label, get, set) {
        const row = make("label", "m-row");
        const input = make("input");
        (input.inputMode = "decimal"), (input.value = get());
        input.addEventListener("change", () => {
          const n = Number(input.value);
          if (input.value.trim() && Number.isFinite(n)) set(n);
          input.value = get();
        });
        row.append(make("span", "", label), input);
        return body.appendChild(row);
      },
      toggle(label, get, set) {
        const text = () => `${get() ? "ON" : "OFF"} · ${label}`;
        return ui.button(text(), (b) => (set(!get()), (b.textContent = text())));
      },
      refresh: () => show(current),
    };

    function show(i) {
      current = i;
      [...bar.children].forEach((t, n) => t.classList.toggle("active", n === i));
      body.replaceChildren();
      try {
        TABS[i].render(body, ui);
      } catch (e) {
        console.warn(`[${ID}] tab "${TABS[i].name}"`, e);
        ui.note("This tab had an error.");
      }
      if (!body.children.length) ui.note("Nothing here yet.");
    }
    TABS.forEach((tab, i) => {
      const t = make("button", "m-tab", tab.name);
      t.type = "button";
      t.addEventListener("click", () => show(i));
      bar.appendChild(t);
    });

    const openMenu = (yes) => {
      back.style.display = yes ? "block" : "none";
      win.style.display = yes ? "flex" : "none";
      if (yes) show(current);
    };
    x.addEventListener("click", () => openMenu(false));
    back.addEventListener("click", () => openMenu(false));
    win.addEventListener("keydown", (e) => (e.key === "Escape" ? openMenu(false) : e.stopPropagation()));

    // drag the button; tiny movements still count as a tap
    let from = null,
      moved = false;
    fab.addEventListener("pointerdown", (e) => {
      const r = fab.getBoundingClientRect();
      from = { x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top };
      moved = false;
      fab.setPointerCapture?.(e.pointerId);
    });
    fab.addEventListener("pointermove", (e) => {
      if (!from || (!moved && Math.hypot(e.clientX - from.x, e.clientY - from.y) < 8)) return;
      moved = true;
      fab.style.left = `${Math.max(4, Math.min(innerWidth - 54, e.clientX - from.dx))}px`;
      fab.style.top = `${Math.max(4, Math.min(innerHeight - 54, e.clientY - from.dy))}px`;
      fab.style.right = fab.style.bottom = "auto";
    });
    fab.addEventListener("pointerup", () => (from = null));
    fab.addEventListener("pointercancel", () => (from = null));
    fab.addEventListener("click", () => {
      if (moved) return void (moved = false);
      openMenu(win.style.display !== "flex");
    });

    made = [style, back, win, fab];
    document.head.appendChild(style);
    document.body.append(back, win, fab);
  }

  function off() {
    made.forEach((n) => n.remove()); // listeners on removed elements go with them
    made = [];
  }

  const mod = { on, off };
  if (!(window.MOD_SOURCES && MOD_SOURCES.register(mod))) mod.on();
})();
