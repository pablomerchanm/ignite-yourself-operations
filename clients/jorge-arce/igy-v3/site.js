/* ============================================================
   IGNITE YOURSELF — comportamientos propios de esta página.
   El kit (main.js) ya resuelve reveals, pin, parallax y menú.
   Aquí solo van: el desplazamiento de las capturas dentro de
   sus marcos, y el formulario que abre un correo prellenado.
   ============================================================ */
(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- El header se oscurece cuando pasa sobre fondo claro ---------- */
  (function () {
    var header = document.querySelector(".header");
    if (!header) return;
    var lights = document.querySelectorAll(".section-light");
    if (!lights.length) return;

    var pending = false;
    function paint() {
      pending = false;
      var band = header.getBoundingClientRect().bottom - 6;
      var onLight = false;
      for (var i = 0; i < lights.length; i++) {
        var r = lights[i].getBoundingClientRect();
        if (r.top <= band && r.bottom >= band) { onLight = true; break; }
      }
      header.classList.toggle("is-onlight", onLight);
    }
    function schedule() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(paint);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    paint();
  })();

  /* ---------- Las capturas recorren su ventana con el scroll ---------- */
  if (!reduced) {
    var pans = [];
    document.querySelectorAll("[data-pan]").forEach(function (w) {
      var img = w.querySelector("img");
      if (img) pans.push({ box: w, img: img });
    });

    if (pans.length) {
      var ticking = false;
      var move = function () {
        ticking = false;
        var vh = window.innerHeight;
        pans.forEach(function (p) {
          var travel = p.img.offsetHeight - p.box.offsetHeight;
          if (travel <= 40) return;
          var r = p.box.getBoundingClientRect();
          /* 0 cuando el marco entra por abajo, 1 cuando sale por arriba */
          var t = (vh - r.top) / (vh + r.height);
          t = Math.min(1, Math.max(0, t));
          p.img.style.transform = "translate3d(0," + (-travel * t).toFixed(1) + "px,0)";
        });
      };
      var onScroll = function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(move);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      window.addEventListener("load", onScroll);
      move();
    }
  }

  /* ---------- Formulario → correo prellenado a pablo@igniteyourself.co ----------
     No hay backend: el envío abre el cliente de correo del visitante.
     El mensaje de confirmación lo dice explícitamente. */
  var form = document.getElementById("inquiryForm");
  if (!form) return;

  var MAILTO = "pablo@igniteyourself.co";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var ok = true;
    function setInvalid(input, bad) {
      var f = input.closest(".field");
      f.classList.toggle("invalid", bad);
      if (bad && ok) { input.focus(); ok = false; }
    }

    var name = form.querySelector("#f-name");
    var email = form.querySelector("#f-email");
    var url = form.querySelector("#f-url");

    setInvalid(name, !name.value.trim());
    setInvalid(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    var uv = url.value.trim();
    setInvalid(url, uv !== "" && !/^(https?:\/\/)?[^\s]+\.[^\s]{2,}$/i.test(uv));
    if (!ok) return;

    var role = form.querySelector("#f-role").value.trim();
    var next = form.querySelector("#f-next").value.trim();

    var subject = "Private Preview Request — " + name.value.trim();
    var body = "Full name: " + name.value.trim() +
      "\nProfessional email: " + email.value.trim() +
      (role ? "\nCurrent role or organization: " + role : "") +
      (uv ? "\nWebsite / LinkedIn / profile: " + uv : "") +
      (next ? "\n\nWhat I am building toward next:\n" + next : "") +
      "\n\n—\nSent from the Ignite Yourself website.";

    location.href = "mailto:" + MAILTO +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    document.getElementById("fconfirm").classList.add("is-visible");
  });

  form.querySelectorAll("input, textarea").forEach(function (i) {
    i.addEventListener("input", function () { i.closest(".field").classList.remove("invalid"); });
  });
})();
