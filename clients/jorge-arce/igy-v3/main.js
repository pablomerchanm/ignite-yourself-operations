/* ============================================================
   KIT MONOLOG — interacciones reutilizables (vanilla JS)
   Reveals · contadores · acordeón FAQ · reloj de ciudad en vivo.
   Sin dependencias. Respeta prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveals al hacer scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Contadores de stats ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var numEl = el.querySelector(".stat__num");
    if (!numEl) return;
    if (prefersReduced) { numEl.textContent = prefix + target.toLocaleString("es-CO") + suffix; return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      numEl.textContent = prefix + Math.round(target * eased).toLocaleString("es-CO") + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var stats = document.querySelectorAll(".stat");
  if ("IntersectionObserver" in window && stats.length) {
    var ioStats = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); ioStats.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    stats.forEach(function (el) { ioStats.observe(el); });
  } else {
    stats.forEach(function (el) { animateCount(el); });
  }

  /* ---------- Acordeón FAQ: solo uno abierto ---------- */
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) faqItems.forEach(function (o) { if (o !== item) o.open = false; });
    });
  });

  /* ---------- Reloj de ciudad en vivo (footer) ---------- */
  var clockEl = document.getElementById("clock");
  if (clockEl) {
    var tz = clockEl.getAttribute("data-clock-tz") || "America/Bogota";
    var label = clockEl.getAttribute("data-clock-label") || "";
    function tick() {
      var opts = { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" };
      var t;
      try { opts.timeZone = tz; t = new Date().toLocaleTimeString("en-US", opts); }
      catch (e) { t = new Date().toLocaleTimeString(); }
      clockEl.textContent = (label ? label + " " : "") + t.toUpperCase();
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Wordmark del hero a sangre completa ---------- */
  var wordmark = document.querySelector(".hero__wordmark");
  var wordmarkText = document.querySelector(".hero__wordmark-text");
  if (wordmark && wordmarkText) {
    /* cascada de letras: cada carácter entra escalonado (solo con motion) */
    if (!prefersReduced) {
      var wmChars = wordmarkText.textContent.split("");
      wordmarkText.textContent = "";
      wmChars.forEach(function (ch, i) {
        var s = document.createElement("span");
        s.className = "wm-l";
        s.textContent = ch;
        s.style.transitionDelay = (0.5 + i * 0.055) + "s";
        wordmarkText.appendChild(s);
      });
    }
    var fitWordmark = function () {
      wordmark.style.fontSize = "100px";
      var w = wordmarkText.getBoundingClientRect().width;
      if (w > 0) wordmark.style.fontSize = (100 * document.documentElement.clientWidth / w * 0.98) + "px";
    };
    fitWordmark();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWordmark);
    window.addEventListener("resize", fitWordmark);
  }

  /* ---------- Líneas display ajustadas a sangre (.fit) ---------- */
  var fitEls = Array.prototype.slice.call(document.querySelectorAll(".fit"));
  if (fitEls.length) {
    var fitAll = function () {
      var groups = {};
      fitEls.forEach(function (el) {
        var span = el.querySelector(".fit__text");
        if (!span) return;
        el.style.fontSize = "100px";
        var cs = getComputedStyle(el);
        var target = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        var w = span.getBoundingClientRect().width;
        if (w <= 0 || target <= 0) return;
        var size = 100 * target / w * 0.995;
        var g = el.getAttribute("data-fit-group");
        if (g) {
          if (!groups[g]) groups[g] = { els: [], size: Infinity };
          groups[g].els.push(el);
          groups[g].size = Math.min(groups[g].size, size);
        } else {
          el.style.fontSize = size + "px";
        }
      });
      Object.keys(groups).forEach(function (g) {
        groups[g].els.forEach(function (el) { el.style.fontSize = groups[g].size + "px"; });
      });
    };
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    window.addEventListener("resize", fitAll);
  }

  /* ---------- Menú móvil ---------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    siteNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  }
})();

/* ---------- Contador del stat "12" (weeks) ---------- */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var num = document.querySelector(".gapst__stat-num");
  if (!num || !("IntersectionObserver" in window)) return;
  var target = parseInt(num.textContent, 10) || 12;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(num);
      var start = null, dur = 900;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        num.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  io.observe(num);
})();

/* ---------- About drawer ---------- */
(function () {
  "use strict";
  var drawer = document.getElementById("aboutDrawer");
  if (!drawer) return;
  var openers = document.querySelectorAll("[data-drawer-open]");
  var closers = drawer.querySelectorAll("[data-drawer-close]");
  var lastFocus = null;
  function open(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-locked");
    var btn = drawer.querySelector(".drawer__close");
    if (btn) btn.focus();
  }
  function close() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-locked");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  openers.forEach(function (el) { el.addEventListener("click", open); });
  closers.forEach(function (el) { el.addEventListener("click", function (e) {
    if (el.tagName === "A") { close(); return; }
    e.preventDefault(); close();
  }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
  });
})();

/* ============================================================
   MOTION — scrollytelling, parallax y microinteracciones
   Vanilla, sin dependencias. Inspirado en la dinámica
   GSAP/ScrollTrigger de sacredforests.earth.
   ============================================================ */
(function () {
  "use strict";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;
  var root = document.documentElement;
  root.classList.add("motion");

  var vh = window.innerHeight;
  window.addEventListener("resize", function () { vh = window.innerHeight; });

  /* ---------- util: envolver palabras ---------- */
  function wrapWords(el, wrapClass, innerClass) {
    var made = [];
    function walk(node) {
      var children = Array.prototype.slice.call(node.childNodes);
      children.forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var outer = document.createElement("span");
            var inner = document.createElement("span");
            if (wrapClass) outer.className = wrapClass;
            inner.className = innerClass;
            inner.textContent = p;
            if (wrapClass) { outer.appendChild(inner); frag.appendChild(outer); }
            else frag.appendChild(inner);
            made.push(inner);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          walk(child);
        }
      });
    }
    walk(el);
    return made;
  }

  /* ---------- reveals de titulares por palabra ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add(e.target.hasAttribute("data-stagger") ? "is-in-stagger" : "is-split-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(".split-reveal").forEach(function (el) {
    var words = wrapWords(el, "w", "wi");
    words.forEach(function (w, i) { w.style.transitionDelay = (i * 45) + "ms"; });
    io.observe(el);
  });
  document.querySelectorAll("[data-stagger]").forEach(function (el) {
    var kids = el.querySelectorAll(".line-in, li");
    kids.forEach(function (k, i) { k.style.transitionDelay = (i * 110) + "ms"; });
    io.observe(el);
  });

  /* ---------- secuencia de entrada del hero ---------- */
  var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  var heroSettled = false;
  ready.then(function () {
    requestAnimationFrame(function () {
      root.classList.add("is-loaded");
      setTimeout(function () { heroSettled = true; }, 1900);
    });
  });

  /* ---------- pin + word scrub (Authority Gap Statement) ---------- */
  var pin = document.querySelector(".pin");
  var scrubWords = [];
  var sign = null;
  var gapSegStarts = [];   /* índice de palabra donde arranca cada párrafo */
  var gapFill = null, gapCur = null;
  if (pin) {
    var factor = parseFloat(pin.getAttribute("data-pin")) || 2.4;
    var setPinH = function () { pin.style.height = (factor * vh) + "px"; };
    setPinH();
    window.addEventListener("resize", setPinH);
    var texts = pin.querySelectorAll(".gapst__statement, .gapst__support");
    texts.forEach(function (t) {
      t.removeAttribute("data-reveal");
      t.classList.remove("is-in");
      gapSegStarts.push(scrubWords.length);
      scrubWords = scrubWords.concat(wrapWords(t, null, "sw"));
    });
    sign = pin.querySelector(".gapst__sign");
    if (sign) { sign.removeAttribute("data-reveal"); sign.style.transition = "none"; }

    /* aside estilo MONOLOG: la línea se llena con el scroll, el contador marca
       el párrafo activo y las flechas saltan de párrafo en párrafo */
    gapFill = document.querySelector(".gapst__track-fill");
    gapCur = document.querySelector("[data-qcur]");
    var gapSeg = function (p) {
      var n = p * scrubWords.length * 1.15;
      var s = 0;
      for (var i = 0; i < gapSegStarts.length; i++) if (n >= gapSegStarts[i]) s = i;
      return s;
    };
    var gapP = function () {
      var r = pin.getBoundingClientRect();
      var total = r.height - vh;
      return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
    };
    var gapGo = function (k) {
      k = Math.max(0, Math.min(gapSegStarts.length - 1, k));
      var pTarget = k === 0 ? 0 : (gapSegStarts[k] + 1) / (scrubWords.length * 1.15);
      var top = pin.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: top + pTarget * (pin.offsetHeight - vh) + 2, behavior: "smooth" });
    };
    var qPrev = document.querySelector("[data-qprev]");
    var qNext = document.querySelector("[data-qnext]");
    if (qPrev) qPrev.addEventListener("click", function () { gapGo(gapSeg(gapP()) - 1); });
    if (qNext) qNext.addEventListener("click", function () { gapGo(gapSeg(gapP()) + 1); });
  }

  /* ---------- The System: la capa activa se enciende con el scroll ---------- */
  var sysWrap = document.querySelector(".buildv2__list");
  var sysItems = sysWrap ? sysWrap.querySelectorAll("li") : [];
  var sysDetails = document.querySelectorAll(".buildv2__details > div");
  var sysIdx = -1;

  /* ---------- bridge: "WE BUILD THAT SYSTEM" se enciende palabra a palabra
     con el scroll (mismo lenguaje que el manifiesto, sin pin) ---------- */
  var bridgeEl = document.querySelector(".bridge__title--one");
  var bridgeWords = [];
  if (bridgeEl) {
    var bt = bridgeEl.querySelector(".fit__text");
    if (bt) bridgeWords = wrapWords(bt, null, "bw");
    bridgeEl.removeAttribute("data-reveal");
  }

  /* ---------- registro de parallax ---------- */
  var plx = [];
  var heroPhoto = document.querySelector(".hero__photo");
  var heroWordmark = document.querySelector(".hero__wordmark");
  /* piezas del lockup: se ensamblan con el scroll */
  var logoIgnite = document.querySelector(".hero__logo-ignite");
  var logoYourself = document.querySelector(".hero__logo-yourself");
  var logoSpark = document.querySelector(".hero__logo-spark");
  /* pin del hero: fija la escena mientras dura el ensamblaje */
  var pinHero = document.querySelector(".pinh");
  var heroCenter = document.querySelector(".hero__center");
  if (pinHero && !reduced) {
    var phFactor = parseFloat(pinHero.getAttribute("data-pinh")) || 1.85;
    var setPinHeroH = function () { pinHero.style.height = (phFactor * vh) + "px"; };
    setPinHeroH();
    window.addEventListener("resize", setPinHeroH);
  }
  document.querySelectorAll(".story__media, .step__media, .close__media").forEach(function (m) {
    /* Los banners editoriales llevan el nombre tipografiado en la propia imagen:
       nada de parallax/zoom (el scale(1.14) se comía el margen del nombre). */
    if (m.closest(".story--banner")) return;
    m.classList.add("plx-media");
    if (m.firstElementChild) plx.push({ el: m.firstElementChild, box: m.closest(".close") || m, kind: "media", cur: 0 });
  });
  /* Banners editoriales: flota el contenedor completo con el scroll
     (se mueve el marco entero, así la imagen jamás se recorta). */
  document.querySelectorAll(".story--banner .story__media").forEach(function (m) {
    plx.push({ el: m, box: m.closest(".story") || m, kind: "float", cur: 0 });
  });
  document.querySelectorAll("[data-drift]").forEach(function (d) {
    var t = d.querySelector(".fit__text");
    if (t) plx.push({ el: t, box: d, kind: "drift", amt: parseFloat(d.getAttribute("data-drift")) || 0, cur: 0 });
  });

  /* ---------- loop rAF con interpolación ---------- */
  var curScroll = window.scrollY, lerp = 0.14;
  function frame() {
    var target = window.scrollY;
    curScroll += (target - curScroll) * lerp;
    if (Math.abs(target - curScroll) < 0.1) curScroll = target;

    /* hero: durante el pin la foto solo respira (zoom); el drift vertical
       empieza cuando el pin suelta */
    if (heroPhoto) {
      var pinExtra = pinHero ? Math.max(0, pinHero.offsetHeight - vh) : 0;
      var hy = Math.min(Math.max(curScroll - pinExtra, 0), vh) * 0.28;
      heroPhoto.style.transform = "translate3d(0," + hy + "px,0) scale(1.08)";
    }
    /* hero pinned: hp = progreso 0→1 dentro del pin */
    var hp = 0;
    if (pinHero && !reduced) {
      var phr = pinHero.getBoundingClientRect();
      var phTotal = phr.height - vh;
      hp = phTotal > 0 ? Math.min(1, Math.max(0, -phr.top / phTotal)) : 1;
    }
    /* el wordmark queda sostenido: sin drift, presencia fija de monumento */
    /* las frases NO desaparecen: el estado final del header es "todo montado"
       (frases + logo armado + chispa). Solo un micro-asentamiento hacia arriba. */
    if (heroCenter && !reduced && heroSettled) {
      heroCenter.style.transform = "translate3d(0," + (-hp * 10).toFixed(2) + "px,0)";
    }
    /* ensamblaje del logo: ignite entra por la izquierda, yourself por la
       derecha, y al encajar aparece la chispa — todo con el hero fijo */
    if (logoIgnite && logoYourself && logoSpark && !reduced) {
      var ap = Math.min(1, Math.max(0, hp / 0.72));
      var ae = 1 - Math.pow(1 - ap, 3);
      logoIgnite.style.transform = "translate3d(" + (-(1 - ae) * 36).toFixed(3) + "%,0,0)";
      logoYourself.style.transform = "translate3d(" + ((1 - ae) * 58).toFixed(3) + "%,0,0)";
      var sp = Math.min(1, Math.max(0, (hp - 0.66) / 0.3));
      var se = sp < 0.6 ? (sp / 0.6) * 1.12 : 1.12 - ((sp - 0.6) / 0.4) * 0.12; /* pop con rebote */
      logoSpark.style.opacity = Math.min(1, sp * 1.6).toFixed(3);
      logoSpark.style.transform = "scale(" + (sp === 0 ? 0.15 : se).toFixed(3) + ")";
    }

    /* pin scrub */
    if (pin && scrubWords.length) {
      var r = pin.getBoundingClientRect();
      var total = r.height - vh;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      var n = p * scrubWords.length * 1.15;
      for (var i = 0; i < scrubWords.length; i++) {
        var o = Math.min(1, Math.max(0.16, (n - i) * 0.6 + 0.16));
        scrubWords[i].style.opacity = o;
      }
      if (sign) sign.style.opacity = Math.min(1, Math.max(0, (p - 0.82) * 6));
      if (gapFill) gapFill.style.transform = "scaleX(" + p + ")";
      if (gapCur) gapCur.textContent = "0" + (gapSeg(p) + 1);
    }

    /* The System: la capa activa sigue el scroll */
    if (sysItems.length && sysWrap.classList.contains("is-in-stagger")) {
      var sy = sysWrap.getBoundingClientRect();
      var spp = Math.min(1, Math.max(0, (vh * 0.78 - sy.top) / Math.max(1, sy.height + vh * 0.18)));
      var si = Math.min(sysItems.length - 1, Math.floor(spp * sysItems.length));
      if (si !== sysIdx) {
        sysIdx = si;
        for (var sk = 0; sk < sysItems.length; sk++) {
          sysItems[sk].style.opacity = sk === si ? 1 : 0.22;
          if (sysDetails[sk] && sysDetails[sk].classList.contains("is-in")) {
            sysDetails[sk].style.opacity = sk === si ? 1 : 0.4;
          }
        }
      }
    }

    /* bridge: enciende "WE BUILD THAT SYSTEM" con el scroll */
    if (bridgeWords.length) {
      var br = bridgeEl.getBoundingClientRect();
      var bp = Math.min(1, Math.max(0, (vh * 0.82 - br.top) / (vh * 0.5)));
      var bn = bp * bridgeWords.length * 1.12;
      for (var bk = 0; bk < bridgeWords.length; bk++) {
        bridgeWords[bk].style.opacity = Math.min(1, Math.max(0.12, (bn - bk) * 0.7 + 0.12)).toFixed(3);
      }
    }

    /* medias y drifts */
    for (var j = 0; j < plx.length; j++) {
      var it = plx[j];
      var b = it.box.getBoundingClientRect();
      if (b.bottom < -100 || b.top > vh + 100) continue;
      var prog = (b.top + b.height / 2 - vh / 2) / (vh / 2 + b.height / 2); /* 1 → -1 */
      var goal;
      if (it.kind === "media") {
        goal = prog * b.height * 0.07;
        it.cur += (goal - it.cur) * lerp;
        it.el.style.transform = "translate3d(0," + it.cur.toFixed(2) + "px,0) scale(1.14)";
      } else if (it.kind === "float") {
        /* banners: flotan más y se encienden al acercarse al centro del viewport */
        goal = prog * 55;
        it.cur += (goal - it.cur) * lerp;
        it.el.style.transform = "translate3d(0," + it.cur.toFixed(2) + "px,0)";
        var focus = 1 - Math.min(1, Math.abs(prog));
        it.el.style.opacity = (0.35 + 0.65 * focus).toFixed(3);
      } else {
        goal = prog * it.amt;
        it.cur += (goal - it.cur) * lerp;
        it.el.style.transform = "translate3d(" + it.cur.toFixed(3) + "vw,0,0)";
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ============================================================
   VOICES — carrusel de testimonios (una cita a la vez)
   ============================================================ */
(function () {
  var stage = document.querySelector(".voices__stage");
  if (!stage) return;
  var slides = [].slice.call(stage.querySelectorAll("[data-voice]"));
  if (slides.length < 2) return;
  var prevBtn = document.querySelector("[data-vprev]");
  var nextBtn = document.querySelector("[data-vnext]");
  var curEl = document.querySelector("[data-vcur]");
  var totalEl = document.querySelector("[data-vtotal]");
  var i = 0;
  if (totalEl) totalEl.textContent = ("0" + slides.length).slice(-2);

  function pad(n) { return ("0" + n).slice(-2); }
  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
    if (curEl) curEl.textContent = pad(i + 1);
  }
  if (prevBtn) prevBtn.addEventListener("click", function () { show(i - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { show(i + 1); });
  show(0);
})();

