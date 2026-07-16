/* Dr. Jorge Arce — scroll motion runtime
   Vanilla, dependency-free, self-contained. Three behaviours:
     1. reveal   — fade + lift as an element enters the viewport (IntersectionObserver)
     2. stagger  — direct children of [data-stagger] reveal in sequence (--i sets the beat)
     3. parallax  — [data-parallax] images drift against the scroll (rAF, transform-only)
   All degrade to a static, fully-visible page when motion is reduced or JS is unavailable. */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---- 1 & 2 · reveal + stagger ---------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal, [data-stagger]");

  // Assign each staggered child its index so CSS can delay it (--i * 90ms).
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty("--i", i);
    });
  });

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- 3 · parallax ---------------------------------------------------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));

  if (!reduce && parallaxEls.length) {
    var items = parallaxEls.map(function (el) {
      // The element carrying [data-parallax] may be the <img> itself or a wrapper.
      var img = el.tagName === "IMG" ? el : el.querySelector("img");
      return { host: el, img: img, factor: parseFloat(el.getAttribute("data-parallax")) || 0.1 };
    }).filter(function (it) { return it.img; });

    var ticking = false;

    function update() {
      ticking = false;
      var vh = window.innerHeight;
      items.forEach(function (it) {
        var r = it.host.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return; // offscreen — skip
        // progress: -1 (below fold) → 1 (above fold), 0 at viewport centre.
        var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        var shift = -progress * it.factor * 100; // px
        it.img.style.setProperty("--py", shift.toFixed(2) + "px");
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }
})();
