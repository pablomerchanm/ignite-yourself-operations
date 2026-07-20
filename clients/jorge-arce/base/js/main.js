/* ============================================================================
   main.js — motor del template.
   1) Carga content.json (cero contenido hardcodeado en el HTML).
   2) Renderiza cada sección como partial independiente, en el orden del JSON.
      Una sección ausente simplemente no se renderiza: el ritmo no se rompe
      porque cada sección es autónoma en su padding.
   3) Capa de motion (GSAP + ScrollTrigger + Lenis) con los PRINCIPIOS de la
      auditoría: un solo patrón de entrada (fade + 8px, 0.56s), reveal por
      GRUPO de sección, stagger solo en el hero, y respeto total a
      prefers-reduced-motion.
   ========================================================================== */

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MOTION = !REDUCED && !!(window.gsap && window.ScrollTrigger && window.Lenis);
  if (!MOTION) document.documentElement.classList.add('no-motion');

  /* ---------- utilidades ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function paras(s) {
    return String(s || '').split(/\n\s*\n/).map(function (p) {
      return '<p>' + esc(p) + '</p>';
    }).join('');
  }

  var TONES = { 1: 'var(--ph-tone-1)', 2: 'var(--ph-tone-2)', 3: 'var(--ph-tone-3)' };

  /* Placeholder de foto: bloque sólido + ratio + label. Con "src", foto real. */
  function ph(img, extraClass) {
    if (!img) return '';
    var ratio = String(img.ratio || '3:4').replace(':', ' / ');
    var tone = TONES[img.tone] || TONES[1];
    var inner = img.src
      ? '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || img.label || '') + '">'
      : '';
    return '<div class="ph' + (extraClass ? ' ' + extraClass : '') + '" style="--ph-ratio:' + ratio +
      ';--ph-tone:' + tone + '" data-label="' + esc(img.src ? '' : img.label || '') + '">' +
      inner + '</div>';
  }

  function btn(cta, ghost) {
    if (!cta) return '';
    return '<a class="btn' + (ghost ? ' ghost' : '') + '" href="' + esc(cta.href || '#') + '">' +
      esc(cta.text) + '</a>';
  }

  /* T1 RAIL: cabecera asimétrica — hairline + display izq. + lede der. */
  function shead(s) {
    return '<header class="shead">' +
      '<hr class="rule" data-rule>' +
      '<div>' +
        (s.eyebrow ? '<span class="eyebrow">' + esc(s.eyebrow) + '</span>' : '') +
        (s.title ? '<h2 class="display">' + esc(s.title) + '</h2>' : '') +
      '</div>' +
      (s.lede ? '<div class="shead-r"><p class="sub">' + esc(s.lede) + '</p></div>' : '<div class="shead-r"></div>') +
      '</header>';
  }

  function surfaceClass(name) {
    var ok = { a: 1, b: 1, c: 1, dark: 1, paper: 1 };
    return 'surface-' + (ok[name] ? name : 'paper');
  }

  /* ---------- partials (una función por arquetipo, todas opcionales) -------- */

  var partials = {

    announcement: function (s) {
      return '<div class="wrap inner will-reveal" data-reveal>' +
        '<p>' + esc(s.text) + '</p>' + btn(s.cta) + '</div>';
    },

    hero: function (s) {
      var lines = (window.__brand && window.__brand.wordmarkLines) || ['Nombre', 'Apellido'];
      var back = esc(lines[0] || '');
      var front = esc(lines.slice(1).join(' '));
      return '<div class="wrap">' +
        '<div class="stage">' +
          '<h1 class="name" aria-label="' + esc(lines.join(' ')) + '">' +
            '<span class="line-back" aria-hidden="true" data-hero-child>' + back + '</span>' +
            '<span class="line-front" aria-hidden="true" data-hero-child>' + front + '</span>' +
          '</h1>' +
          '<div class="portrait framed" data-hero-child>' + ph(s.portrait) + '</div>' +
        '</div>' +
        '<div class="hero-sub">' +
          (s.eyebrow ? '<p class="eyebrow hero-eyebrow" data-hero-child>' + esc(s.eyebrow) + '</p>' : '') +
          '<p class="sub" data-hero-child>' + esc(s.sub) + '</p>' +
          (s.cta ? '<div class="hero-cta" data-hero-child>' + btn(s.cta) + '</div>' : '') +
        '</div></div>';
    },

    paths: function (s) {
      var cards = (s.cards || []).map(function (c, i) {
        return '<div class="card">' +
          '<span class="idx">' + ('0' + (i + 1)).slice(-2) + '</span>' +
          '<h3 class="head">' + esc(c.title) + '</h3>' +
          '<p>' + esc(c.text) + '</p>' +
          (c.link ? '<a class="textlink" href="' + esc(c.link.href || '#') + '">' + esc(c.link.text) + '</a>' : '') +
          '</div>';
      }).join('');
      return '<div class="wrap will-reveal" data-reveal>' + shead(s) +
        '<div class="cards" style="--cols:' + Math.min((s.cards || []).length || 3, 4) + '">' +
        cards + '</div></div>';
    },

    featured: function (s) {
      var items = (s.items || []).map(function (it) {
        return '<div class="item">' + ph(it.image, 'framed') +
          '<h3 class="head">' + esc(it.title) + '</h3>' +
          '<p>' + esc(it.text) + '</p>' +
          (it.link ? '<a class="textlink" href="' + esc(it.link.href || '#') + '">' + esc(it.link.text) + '</a>' : '') +
          '</div>';
      }).join('');
      return '<div class="wrap will-reveal" data-reveal>' + shead(s) +
        '<div class="grid">' + items + '</div>' +
        (s.cta ? '<div class="after">' + btn(s.cta, true) + '</div>' : '') +
        '</div>';
    },

    splash: function (s) {
      return ph(s.image) +
        '<div class="statement will-reveal" data-reveal><div>' +
        (s.eyebrow ? '<p class="eyebrow">' + esc(s.eyebrow) + '</p>' : '') +
        '<p class="display">' + esc(s.statement) + '</p>' +
        '</div></div>';
    },

    media: function (s) {
      var stats = (s.stats || []).map(function (st) {
        return '<div><div class="num">' + esc(st.num) + '</div>' +
          '<div class="lbl micro">' + esc(st.label) + '</div></div>';
      }).join('');
      return '<div class="wrap will-reveal" data-reveal><div class="split">' +
        '<div class="media framed">' + ph(s.image) + '</div>' +
        '<div class="txt">' +
          (s.eyebrow ? '<p class="eyebrow">' + esc(s.eyebrow) + '</p>' : '') +
          '<h2 class="display">' + esc(s.title) + '</h2>' +
          '<p class="prose">' + esc(s.text) + '</p>' +
          (stats ? '<div class="stats">' + stats + '</div>' : '') +
          btn(s.cta) +
        '</div></div></div>';
    },

    articles: function (s) {
      /* T2 ROWS: índice editorial numerado, sin cajas */
      var items = (s.items || []).map(function (it, i) {
        return '<a class="item" href="' + esc(it.href || '#') + '">' +
          '<span class="idx">' + ('0' + (i + 1)).slice(-2) + '</span>' +
          '<h3 class="head">' + esc(it.title) + '</h3>' +
          '<div class="meta"><span class="micro">' + esc(it.category) + '</span>' +
          '<span class="micro" style="opacity:.55">' + esc(it.date) + '</span></div>' +
          ph(it.image) + '</a>';
      }).join('');
      return '<div class="wrap will-reveal" data-reveal>' + shead(s) +
        '<div class="rows">' + items + '</div>' +
        (s.cta ? '<div class="after">' + btn(s.cta, true) + '</div>' : '') +
        '</div>';
    },

    credentials: function (s) {
      /* T3 BAND: display izquierda + sellos derecha */
      var badges = (s.badges || []).map(function (b) {
        return '<div class="badge micro">' + esc(b) + '</div>';
      }).join('');
      return '<div class="wrap will-reveal" data-reveal><div class="band">' +
        '<div class="band-l">' +
          (s.eyebrow ? '<p class="eyebrow">' + esc(s.eyebrow) + '</p>' : '') +
          '<h2 class="display">' + esc(s.title) + '</h2>' +
        '</div>' +
        '<div class="badges">' + badges + '</div>' +
        '</div></div>';
    },

    offers: function (s) {
      /* cada card de la escalera es su propio grupo de reveal (cadencia) */
      var items = (s.items || []).map(function (o) {
        return '<article class="offer will-reveal" data-reveal>' +
          '<div class="media">' +
            '<span class="ghost" aria-hidden="true">' + esc(o.num) + '</span>' +
            '<div class="framed">' + ph(o.image) + '</div>' +
          '</div>' +
          '<div class="txt">' +
            '<p class="num">' + esc(o.num) + '</p>' +
            '<h3 class="display">' + esc(o.title) + '</h3>' +
            (o.tagline ? '<p class="tagline sub">' + esc(o.tagline) + '</p>' : '') +
            '<p class="prose">' + esc(o.text) + '</p>' +
            btn(o.cta) +
          '</div></article>';
      }).join('');
      return '<div class="wrap">' +
        '<div class="will-reveal" data-reveal>' + shead(s) + '</div>' +
        '<div class="ladder">' + items + '</div></div>';
    },

    about: function (s) {
      var imgs = (s.images || []).map(function (im) {
        return '<div class="framed">' + ph(im) + '</div>';
      }).join('');
      return '<div class="wrap will-reveal" data-reveal><div class="split">' +
        '<div class="txt">' +
          (s.eyebrow ? '<p class="eyebrow">' + esc(s.eyebrow) + '</p>' : '') +
          '<h2 class="display">' + esc(s.title) + '</h2>' +
          '<div class="prose">' + paras(s.text) + '</div>' +
          btn(s.cta) +
        '</div>' +
        '<div class="collage">' + imgs + '</div>' +
        '</div></div>';
    },

    testimonials: function (s) {
      var lead = s.lead ?
        '<blockquote class="lead-quote">' +
          (s.eyebrow ? '<p class="eyebrow" style="margin-bottom:var(--space-3)">' + esc(s.eyebrow) + '</p>' : '') +
          '<p class="display">&ldquo;' + esc(s.lead.quote) + '&rdquo;</p>' +
          '<footer class="who micro">' + esc(s.lead.who) + '</footer>' +
        '</blockquote>' : shead(s);
      var items = (s.items || []).map(function (q) {
        return '<blockquote class="q"><p>&ldquo;' + esc(q.quote) + '&rdquo;</p>' +
          '<footer class="micro">' + esc(q.who) + '</footer></blockquote>';
      }).join('');
      return '<div class="wrap will-reveal" data-reveal>' + lead +
        (items ? '<div class="grid" style="--cols:' + Math.min((s.items || []).length || 3, 3) + '">' + items + '</div>' : '') +
        '</div>';
    },

    newsletter: function (s) {
      return '<div class="wrap inner will-reveal" data-reveal>' +
        (s.eyebrow ? '<p class="eyebrow">' + esc(s.eyebrow) + '</p>' : '') +
        '<h2 class="display">' + esc(s.title) + '</h2>' +
        '<p>' + esc(s.text) + '</p>' +
        '<form action="#" method="post" onsubmit="return false">' +
          '<input type="email" name="email" required placeholder="' + esc(s.placeholder || 'Email') + '" aria-label="Email">' +
          '<button class="btn" type="submit">' + esc(s.cta || 'Suscribirme') + '</button>' +
        '</form>' +
        (s.privacy ? '<p class="privacy micro">' + esc(s.privacy) + '</p>' : '') +
        '</div>';
    },

    footer: function (s) {
      var brand = window.__brand || {};
      var cols = (s.columns || []).map(function (c) {
        return '<div class="col"><p class="micro">' + esc(c.label) + '</p>' +
          (c.links || []).map(function (l) {
            return '<a href="' + esc(l.href || '#') + '">' + esc(l.text) + '</a>';
          }).join('') + '</div>';
      }).join('');
      var legal = (s.legal || []).map(function (t) {
        return '<span class="micro">' + esc(t) + '</span>';
      }).join('');
      return '<div class="wrap will-reveal" data-reveal><div class="cols">' +
        '<div class="col"><p class="micro">' + esc(brand.shortName || '') + '</p>' +
          '<p>' + esc(s.about) + '</p></div>' +
        cols + '</div>' +
        '<div class="legal">' + legal + '</div></div>' +
        '<div class="wordmark" aria-hidden="true">' + esc(brand.name || '') + '</div>';
    }
  };

  /* Padding especial por tipo (announcement = respiro) */
  var breatherTypes = { announcement: 1 };

  /* ---------- render ---------- */

  function renderSection(s) {
    var fn = partials[s.type];
    if (!fn) return null;
    var el = document.createElement('section');
    var cls = ['section', 's-' + s.type];
    if (breatherTypes[s.type]) cls.push('breather');
    if (s.type === 'media') {
      cls.push(surfaceClass(s.surfaceBottom || 'b'));
      el.style.setProperty('--media-top', 'var(--' + surfaceName(s.surfaceTop || 'paper') + ')');
      el.style.setProperty('--media-bottom', 'var(--' + surfaceName(s.surfaceBottom || 'b') + ')');
    } else {
      cls.push(surfaceClass(s.surface || 'paper'));
    }
    el.className = cls.join(' ');
    if (s.id) el.id = s.id;
    el.innerHTML = fn(s);
    return el;
  }

  function surfaceName(name) {
    if (name === 'paper') return 'paper';
    if (name === 'dark') return 'dark';
    return 'surface-' + (({ a: 1, b: 1, c: 1 })[name] ? name : 'b');
  }

  function renderNav(nav, brand) {
    if (!nav) return;
    var pill = document.getElementById('navpill');
    var menu = document.getElementById('menu');
    if (!pill || !menu) return;
    pill.querySelector('.navlabel').textContent = nav.label || 'Menú';
    menu.querySelector('nav').innerHTML = (nav.links || []).map(function (l) {
      return '<a href="' + esc(l.href || '#') + '">' + esc(l.text) + '</a>';
    }).join('');
    menu.querySelector('.menu-meta').innerHTML =
      '<span class="micro">' + esc(brand.name || '') + '</span>' +
      (nav.meta || []).map(function (m) {
        return '<span class="micro" style="opacity:.6">' + esc(m) + '</span>';
      }).join('');
    pill.hidden = false;

    function toggle(open) {
      menu.classList.toggle('open', open);
      pill.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    pill.addEventListener('click', function () { toggle(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target === menu) toggle(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggle(false);
    });
  }

  /* ---------- motion ---------- */

  function initMotion() {
    if (!MOTION) return;
    gsap.registerPlugin(ScrollTrigger);

    var lenis = new Lenis({ lerp: .25 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* anchors → scroll suave */
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var target = a.getAttribute('href');
      if (target.length > 1 && document.querySelector(target)) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0 });
      }
    });

    /* Hero: la ÚNICA composición con stagger (auditoría §6, principio 3) */
    var heroChildren = gsap.utils.toArray('.s-hero [data-hero-child]');
    if (heroChildren.length) {
      var heroWrap = document.querySelector('.s-hero .wrap');
      if (heroWrap) heroWrap.classList.remove('will-reveal');
      gsap.fromTo(heroChildren,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.56, ease: 'power2.out',
          stagger: 0.12, delay: 0.1, clearProps: 'transform' });
    }

    /* Resto: reveal por GRUPO de sección — fade + 8px máx, 0.56s, sin stagger */
    gsap.utils.toArray('[data-reveal]').forEach(function (group) {
      gsap.fromTo(group,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.56, ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: group, start: 'top 85%', once: true } });
    });

    /* Hairlines: se DIBUJAN al entrar (scaleX 0→1) — motion que refuerza la
       estructura editorial, no decora */
    gsap.utils.toArray('[data-rule]').forEach(function (rule) {
      gsap.fromTo(rule,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: rule, start: 'top 88%', once: true } });
    });

    /* Splash: LA única animación lenta de la página (--dur-slow ≈ crossfade
       1.5s medido) — la imagen asienta de 1.05 a 1 dentro de su marco */
    gsap.utils.toArray('.s-splash .ph').forEach(function (img) {
      gsap.fromTo(img,
        { scale: 1.05 },
        { scale: 1, duration: 1.4, ease: 'power1.out',
          scrollTrigger: { trigger: img, start: 'top 75%', once: true } });
    });
  }

  /* ---------- arranque ---------- */

  function boot(data) {
    if (data.meta) {
      if (data.meta.title) document.title = data.meta.title;
      if (data.meta.lang) document.documentElement.lang = data.meta.lang;
      if (data.meta.description) {
        var md = document.querySelector('meta[name="description"]');
        if (md) md.setAttribute('content', data.meta.description);
      }
    }
    window.__brand = data.brand || {};

    var site = document.getElementById('site');
    site.innerHTML = '';
    (data.sections || []).forEach(function (s) {
      var el = renderSection(s);
      if (el) site.appendChild(el);
    });

    renderNav(data.nav, data.brand || {});
    initMotion();
  }

  /* Resolver content.json desde la URL de ESTE script (js/main.js → ../content.json):
     inmune a redirects de trailing-slash / cleanUrls del hosting. */
  var scriptSrc = document.currentScript && document.currentScript.src;
  var contentURL = scriptSrc ? new URL('../content.json', scriptSrc).href : 'content.json';

  fetch(contentURL)
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(boot)
    .catch(function (err) {
      document.documentElement.classList.add('no-motion');
      document.getElementById('site').innerHTML =
        '<div class="load-error"><p>No se pudo cargar <strong>content.json</strong> (' +
        esc(err.message) + ').<br>Sirve el template por HTTP — por ejemplo:<br>' +
        '<code>python3 -m http.server 8080</code></p></div>';
    });
})();
