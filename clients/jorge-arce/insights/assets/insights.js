/* Insights: menú móvil, color de la barra sobre la portada oscura, filtros por
   tema y el índice del artículo que se ilumina al leer. Sin dependencias. */
(function () {
  var nav = document.getElementById('nav');
  var mast = document.querySelector('.mast');

  // La barra va clara siempre en los artículos; en la portada, al dejar atrás el bloque oscuro.
  if (mast && nav) {
    var paint = function () { nav.classList.toggle('onlight', window.scrollY > mast.offsetHeight - 80); };
    paint();
    window.addEventListener('scroll', paint, { passive: true });
  }

  // Menú móvil
  var burger = document.getElementById('nburger');
  var menu = document.getElementById('nmenu');
  if (burger && menu) {
    var close = function () {
      menu.classList.remove('is-open'); burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('menu-locked');
    };
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-locked', open);
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) close(); });
  }

  // Filtros por tema (sin JS se ven todos los artículos)
  var chips = document.querySelectorAll('.chip[data-filter]');
  if (chips.length) {
    chips[0].parentNode.hidden = false;
    var items = document.querySelectorAll('.row[data-cat], .feat[data-cat]');
    var empty = document.querySelector('.empty');
    var apply = function (cat, push) {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === cat)); });
      var shown = 0;
      items.forEach(function (el) {
        var on = cat === 'all' || el.dataset.cat === cat;
        el.hidden = !on;
        if (on && el.classList.contains('row')) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      if (push) history.replaceState(null, '', cat === 'all' ? location.pathname : '#c-' + cat);
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { apply(c.dataset.filter, true); }); });
    var fromHash = location.hash.replace('#c-', '');
    if (location.hash.indexOf('#c-') === 0 && document.querySelector('.chip[data-filter="' + fromHash + '"]')) apply(fromHash, false);
  }

  // Índice del artículo: marca la sección que se está leyendo
  var links = document.querySelectorAll('.toc a');
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var heads = Array.prototype.filter.call(document.querySelectorAll('.prose h2[id]'), function (h) { return byId[h.id]; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-on'); });
        byId[en.target.id].classList.add('is-on');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach(function (h) { io.observe(h); });
  }
  document.querySelectorAll('.toc-m a').forEach(function (a) {
    a.addEventListener('click', function () { a.closest('details').open = false; });
  });
})();
