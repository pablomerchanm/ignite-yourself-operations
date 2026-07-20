/* Dr. Jorge Arce — scroll motion runtime
   Vendored Lenis (window.Lenis) for momentum smooth-scroll; everything else is
   dependency-free. Layers, each with a static fallback:
     0. smooth scroll  — Lenis momentum + anchor easing
     1. hero entrance  — choreographed load-in
     2. reveal/stagger — fade + lift on viewport entry (IntersectionObserver)
     3. word-rise      — marquee headlines split into masked, staggered words
     4. media wipe     — image containers unmask + settle from scale
     5. parallax       — layered drift (images one way, hero name the other)
     6. cinematic scrub — bands react (caption drift, overlay depth) to scroll
   Under prefers-reduced-motion or without JS the page stays static and visible. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* --------------------------------------------------------------------- *
   * Helpers                                                               *
   * --------------------------------------------------------------------- */
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* --------------------------------------------------------------------- *
   * 3 · Word-rise — split marquee headlines into masked, staggered words. *
   *     Preserves inline accent elements (Fraunces .it) and spacing.       *
   * --------------------------------------------------------------------- */
  function splitHeadline(el, startIndex) {
    var tokens = []; // {type:'word', text} | {type:'el', node}
    each(el.childNodes, function (node) {
      if (node.nodeType === 3) { // text
        node.nodeValue.split(/\s+/).forEach(function (w) { if (w) tokens.push({ type: "word", text: w }); });
      } else if (node.nodeType === 1) { // element (e.g. <span class="it">)
        tokens.push({ type: "el", node: node });
      }
    });
    el.textContent = "";
    var i = startIndex;
    tokens.forEach(function (tok, k) {
      var w = document.createElement("span"); w.className = "rw-w";
      var inner = document.createElement("span"); inner.className = "rw-i";
      inner.style.setProperty("--wi", i++);
      if (tok.type === "word") inner.textContent = tok.text;
      else inner.appendChild(tok.node);
      w.appendChild(inner);
      el.appendChild(w);
      if (k < tokens.length - 1) el.appendChild(document.createTextNode(" "));
    });
    el.classList.add("rw-ready");
    return i;
  }

  if (!reduce) {
    var HEADLINES = ".opening h2,.path .txt h2,.about-sec .body h2,.exp .head h2," +
                    ".wall .head h2,.blog .head h2,.speaking .scontent h2," +
                    ".cta .ctacard h2,.band-surgery .cap h2,.quotecard .qtext p";
    each(document.querySelectorAll(HEADLINES), function (h) {
      try { splitHeadline(h, 0); } catch (e) { /* leave headline intact on any failure */ }
    });
  }

  /* --------------------------------------------------------------------- *
   * 4 · Media wipe — mark image containers for the clip-path reveal.       *
   * --------------------------------------------------------------------- */
  var MEDIA = ".path .vis,.about-sec .portrait,.band-surgery,.quotecard,.speaking .sphoto,.galw>.ph";
  each(document.querySelectorAll(MEDIA), function (el) { el.classList.add("reveal-media"); });

  /* --------------------------------------------------------------------- *
   * 2 · Reveal + stagger — IntersectionObserver adds .in on entry.         *
   * --------------------------------------------------------------------- */
  each(document.querySelectorAll("[data-stagger]"), function (group) {
    each(group.children, function (child, i) { child.style.setProperty("--i", i); });
  });

  // Media wipes are triggered by their ancestor .reveal (a self-clipped element
  // reports zero area to IntersectionObserver), so they are not observed directly.
  var revealEls = document.querySelectorAll(".reveal, [data-stagger]");

  if (reduce || !("IntersectionObserver" in window)) {
    each(revealEls, function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    each(revealEls, function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------------- *
   * 1 · Hero entrance                                                     *
   * --------------------------------------------------------------------- */
  root.classList.add("motion");
  if (reduce) {
    document.body.classList.add("hero-in");
  } else {
    // next frame so the initial (hidden) state paints before the transition
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { document.body.classList.add("hero-in"); });
    });
  }

  /* --------------------------------------------------------------------- *
   * 5 & 6 · Parallax + cinematic scrub (single rAF-throttled pass)         *
   * --------------------------------------------------------------------- */
  var heroName = document.querySelector(".hname");
  if (heroName) heroName.setAttribute("data-parallax-text", "0.16");

  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]")).map(function (el) {
    var img = el.tagName === "IMG" ? el : el.querySelector("img");
    return { host: el, img: img, f: parseFloat(el.getAttribute("data-parallax")) || 0.1 };
  }).filter(function (it) { return it.img; });

  var textEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax-text]")).map(function (el) {
    return { el: el, f: parseFloat(el.getAttribute("data-parallax-text")) || 0.12 };
  });

  var scrubEls = Array.prototype.slice.call(document.querySelectorAll(".band-surgery, .quotecard"));

  var vh = window.innerHeight;
  function measure() { vh = window.innerHeight; }

  function frame() {
    parallaxEls.forEach(function (it) {
      var r = it.host.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) return;
      var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      it.img.style.setProperty("--py", (-progress * it.f * 100).toFixed(2) + "px");
    });
    textEls.forEach(function (it) {
      var r = it.el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) return;
      var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      it.el.style.setProperty("--pt", (-progress * it.f * 100).toFixed(2) + "px");
    });
    scrubEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var sp = clamp((vh - r.top) / (vh + r.height), 0, 1);
      el.style.setProperty("--sp", sp.toFixed(3));
    });
  }

  /* --------------------------------------------------------------------- *
   * 0 · Smooth scroll (Lenis) — drives the frame loop; native fallback.    *
   * --------------------------------------------------------------------- */
  var lenis = null;
  if (!reduce && typeof window.Lenis === "function" && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    lenis = new window.Lenis({ lerp: 0.3, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", frame);
    var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // Anchor links ease through Lenis.
    each(document.querySelectorAll('a[href^="#"]'), function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      });
    });
  } else if (!reduce) {
    // No Lenis (or it failed to load): drive parallax off native scroll.
    var ticking = false;
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; frame(); }); } };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  window.addEventListener("resize", function () { measure(); frame(); }, { passive: true });
  measure();
  frame();
})();
