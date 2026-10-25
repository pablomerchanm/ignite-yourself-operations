/* ═══════════════════════════════════════════════════════════════
   Hub · comportamiento (no se toca por cliente)
   - medición: page_view + cada clic con data-track → window.dataLayer
     (y HUB.send, si el cliente conecta su analítica);
   - UTM: la de la visita se guarda y viaja a los enlaces con data-utm
     (el checkout), con la UTM por defecto del enlace como respaldo;
   - DM de Instagram desde el navegador de la propia app;
   - video: reproductor propio (mp4 o YouTube sin cookies);
   - entrada en cascada de las tarjetas (sin librerías).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var HUB = window.HUB = window.HUB || {};

  /* ── medición ── */
  HUB.queue = HUB.queue || [];
  HUB.track = function (event, data) {
    var payload = Object.assign({ event: event, ts: Date.now(), path: location.pathname }, data || {});
    HUB.queue.push(payload);
    if (window.dataLayer) window.dataLayer.push(payload);
    if (typeof HUB.send === "function") { try { HUB.send(payload); } catch (e) {} }
    if (/^(localhost|127\.0\.0\.1)$|vercel\.app$/.test(location.hostname)) { try { console.debug("[hub]", payload); } catch (e) {} }
  };

  /* ── UTM: la de la visita manda; si no trae, la del enlace ── */
  var KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"], STORE = "hub_utm", saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch (e) {}
  var qs = new URLSearchParams(location.search), fresh = {};
  KEYS.forEach(function (k) { if (qs.get(k)) fresh[k] = qs.get(k); });
  if (Object.keys(fresh).length) {
    saved = fresh;
    try { localStorage.setItem(STORE, JSON.stringify(fresh)); } catch (e) {}
  }
  doc.querySelectorAll("a[data-utm]").forEach(function (a) {
    try {
      var u = new URL(a.getAttribute("href"), location.href);
      var def = new URLSearchParams(a.getAttribute("data-utm") || "");
      var visit = KEYS.some(function (k) { return saved[k]; });
      KEYS.forEach(function (k) {
        var v = visit ? saved[k] : def.get(k);
        if (v && !u.searchParams.has(k)) u.searchParams.set(k, v);
      });
      a.setAttribute("href", u.toString());
    } catch (e) {}
  });

  HUB.track("page_view", { page: doc.body.getAttribute("data-page") || "hub" });
  doc.addEventListener("click", function (ev) {
    var el = ev.target.closest && ev.target.closest("[data-track]");
    if (!el) return;
    var d = {};
    if (el.getAttribute("data-loc")) d.loc = el.getAttribute("data-loc");
    if (el.getAttribute("href")) d.href = el.getAttribute("href");
    HUB.track(el.getAttribute("data-track"), d);
  });

  /* ── DM de Instagram ──
     ig.me/m/<usuario> abre el chat desde fuera de Instagram, pero dentro del
     navegador de la app cae en el login web. Ahí se cambia por el perfil, que la
     app abre en nativo con «Mensaje» a un toque. */
  if (/Instagram|FBAN|FBAV|FB_IAB/i.test(navigator.userAgent || "")) {
    doc.querySelectorAll('a[href^="https://ig.me/m/"]').forEach(function (a) {
      var u = a.getAttribute("href").split("/m/")[1].replace(/[\/?#].*$/, "");
      if (!u) return;
      a.setAttribute("href", "https://www.instagram.com/" + u + "/");
      a.removeAttribute("target");
    });
  }

  /* ── video: al pulsar se quita la portada y se reproduce ── */
  doc.querySelectorAll("[data-player]").forEach(function (box) {
    var btn = box.querySelector(".v__play"), card = box.closest(".c");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var yt = box.getAttribute("data-yt");
      if (yt) {
        var f = doc.createElement("iframe");
        f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(yt) + "?autoplay=1&rel=0&playsinline=1";
        f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        f.allowFullscreen = true;
        f.title = btn.getAttribute("aria-label") || "Video";
        box.appendChild(f);
      } else {
        var v = box.querySelector("video");
        if (!v) return;
        v.controls = true;
        v.play();
        v.addEventListener("ended", function () { card.classList.remove("playing"); v.controls = false; v.load(); }, { once: true });
      }
      card.classList.add("playing");
      HUB.track("video_play", { loc: card.id || "video" });
    });
  });

  /* ── entrada en cascada ──
     El <head> pone .js solo si hay IntersectionObserver y no hay reduced-motion.
     Cada tanda que entra en pantalla se escalona; al terminar se quitan las
     clases para que el hover de la tarjeta vuelva a ser suyo. */
  if (root.classList.contains("js")) {
    var io = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, n = i++;
        io.unobserve(el);
        el.style.setProperty("--d", (n * 0.07).toFixed(2) + "s");
        el.classList.add("in");
        setTimeout(function () { el.classList.remove("rv", "in"); el.style.removeProperty("--d"); }, 1100 + n * 70);
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    doc.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
  }

  HUB.ready = true;
})();
