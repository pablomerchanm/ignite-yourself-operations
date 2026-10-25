// Hub (el «linktree sofisticado» de Ignite): content.json → index.html estático.
//
//   node tools/build-hub.mjs <carpeta>
//
// La carpeta trae content.json (todo el contenido) y tokens.css (la marca).
// El build copia ahí la estructura del producto (hub.css, hub.js) desde
// productos/hub/plantilla/, pone tokens.css de partida si falta, valida el
// contenido y escribe index.html. Sin dependencias: Node 18+.
// El contrato de cada campo está en productos/hub/content.schema.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TPL = path.join(ROOT, 'productos/hub/plantilla');
const DIR = process.argv[2] && path.resolve(process.argv[2]);
if (!DIR || !fs.existsSync(path.join(DIR, 'content.json'))) {
  console.error('Uso: node tools/build-hub.mjs <carpeta con content.json>');
  process.exit(2);
}

const C = JSON.parse(fs.readFileSync(path.join(DIR, 'content.json'), 'utf8'));
const meta = C.meta || {};
const DRAFT = meta.draft !== false;
const BASE = meta.base || '';
// textos de la interfaz en el idioma del hub (meta.lang)
const L = String(meta.lang || 'es').startsWith('en')
  ? { pending: 'Link pending', photo: 'Photo needed', product: 'Product photo', video: 'Video pending', play: 'Play', links: 'Links', outs: 'Elsewhere', bar: 'Shortcuts', legal: 'Legal', draft: 'Draft' }
  : { pending: 'Enlace pendiente', photo: 'Foto pendiente', product: 'Foto de producto', video: 'Video pendiente', play: 'Reproducir', links: 'Enlaces', outs: 'Salidas', bar: 'Atajos', legal: 'Legal', draft: 'Borrador' };
const errors = [], warns = [], pending = [];

// ── utilidades ────────────────────────────────────────────────────
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const local = p => p && !/^([a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(p);
const url = p => (local(p) ? BASE + p : p);
const isExt = h => /^https?:\/\//i.test(h);
const plain = (t, a) => [t, a].filter(Boolean).join(' ').replace(/\n/g, ' ');
const long = (s, max, where) => { if (s && String(s).length > max) warns.push(`${where}: ${String(s).length} caracteres (máx. recomendado ${max})`); };

// el título a dos tonos: si el remate es solo un signo (. ? !) va pegado; si es texto, en su línea
const ttl = (t, acc) => {
  const main = esc(t).replace(/\n/g, '<br>');
  if (!acc) return main;
  return /^[.!?¡¿…]{1,2}$/.test(acc.trim()) ? `${main}<i>${esc(acc.trim())}</i>` : `${main} <i class="nl">${esc(acc)}</i>`;
};

// símbolos SVG: solo se incrustan los que la página usa
const SYM = {
  ne: '<symbol id="g-ne" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M5.5 4H12v6.5"/></symbol>',
  e: '<symbol id="g-e" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h12M9 3l5 5-5 5"/></symbol>',
  up: '<symbol id="g-up" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14V2M3 7l5-5 5 5"/></symbol>',
  chat: '<symbol id="g-chat" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2.5 3h11v8H7.2L4 13.5V11H2.5z"/></symbol>',
  bag: '<symbol id="g-bag" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 5.5h10l-.8 8.5H3.8zM5.8 5.5V4a2.2 2.2 0 0 1 4.4 0v1.5"/></symbol>',
  play: '<symbol id="g-play" viewBox="0 0 16 16"><path d="M4.5 2.5v11l9-5.5z" fill="currentColor"/></symbol>',
  star: '<symbol id="g-star" viewBox="0 0 100 100"><path d="M50 0C56 30 70 44 100 50 70 56 56 70 50 100 44 70 30 56 0 50 30 44 44 30 50 0Z" fill="currentColor"/></symbol>',
  ast: '<symbol id="g-ast" viewBox="0 0 100 100" stroke="currentColor" stroke-width="15" stroke-linecap="round"><path d="M50 8v84M13.6 29l72.8 42M13.6 71l72.8-42"/></symbol>',
  diana: '<symbol id="g-diana" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="26"/><circle cx="50" cy="50" r="12"/></symbol>',
  ojo: '<symbol id="g-ojo" viewBox="0 0 100 100"><path d="M6 50C28 20 72 20 94 50 72 80 28 80 6 50Z" fill="currentColor"/><circle cx="50" cy="50" r="15" style="fill:var(--c-bg,#000)"/></symbol>',
  arco: '<symbol id="g-arco" viewBox="0 0 100 100"><path d="M0 80a50 50 0 0 1 100 0Z" fill="currentColor"/></symbol>',
  circulo: '<symbol id="g-circulo" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="currentColor"/></symbol>',
};
const used = new Set();
const icon = (name, cls = 'ar') => {
  if (!SYM[name]) { errors.push(`glifo desconocido «${name}» (hay: ${Object.keys(SYM).join(', ')})`); name = 'circulo'; }
  used.add(name);
  return `<svg class="${cls}" aria-hidden="true"><use href="#g-${name}"/></svg>`;
};
const arrow = href => icon(isExt(href || '') ? 'ne' : 'e');

// medición: el evento sale del destino, salvo que el contenido diga otro
const CONTACT = /^(mailto:|tel:|sms:|https?:\/\/(ig\.me|m\.me|wa\.me|t\.me|api\.whatsapp\.com)\/)/i;
const SOCIAL = /^https?:\/\/([a-z0-9-]+\.)*(instagram\.com|tiktok\.com|youtube\.com|youtu\.be|x\.com|twitter\.com|threads\.net|linkedin\.com|facebook\.com|spotify\.com|podcasts\.apple\.com|pinterest\.com)\//i;
const event = (href, own) => own || (href.startsWith('#') ? 'nav_click' : CONTACT.test(href) ? 'contact_click' : SOCIAL.test(href) ? 'social_click' : 'link_click');
const utmOf = v => (v === true ? meta.utm || 'utm_source=instagram&utm_medium=bio' : typeof v === 'string' ? v : '');

// atributos de un enlace; null si no hay destino (enlace pendiente)
function la(href, loc, o = {}) {
  if (!href) { pending.push(loc); return null; }
  let s = `href="${esc(url(href))}"`;
  if (isExt(href)) s += ' target="_blank" rel="noopener"';
  s += ` data-track="${esc(event(href, o.track))}" data-loc="${esc(loc)}"`;
  const u = utmOf(o.utm);
  if (u) s += ` data-utm="${esc(u)}"`;
  return s;
}

// fotos: si la ruta es local, tiene que existir; sin src, el hueco imprime qué foto falta
let eagerLeft = 2;
const placeholders = [];
function exists(p, where) {
  if (local(p) && !fs.existsSync(path.join(DIR, p))) errors.push(`${where}: no existe ${p}`);
}
function pic(im, where, o = {}) {
  if (!im || !im.src) {
    placeholders.push(where);
    return `<span class="ph"><span>${esc(im?.label || L.photo)}</span></span>`;
  }
  exists(im.src, where);
  if (im.srcWide) exists(im.srcWide, where);
  const focus = im.focus ? ` style="--focus:${esc(im.focus)}"` : '';
  const dims = im.w && im.h ? ` width="${im.w}" height="${im.h}"` : '';
  const load = o.eager && eagerLeft-- > 0 ? ' fetchpriority="high"' : ' loading="lazy"';
  const img = `<img src="${esc(url(im.src))}" alt="${esc(im.alt || '')}"${dims}${load}${focus}>`;
  return im.srcWide ? `<picture><source media="(min-width:42rem)" srcset="${esc(url(im.srcWide))}">${img}</picture>` : img;
}
const kick = t => (t ? `<span class="kick">${esc(t)}</span>` : '');
const playMark = () => `<span class="play" aria-hidden="true">${icon('play', '')}</span>`;
// arte propio de la marca detrás del texto: { src, fit: "bottom" | "cover" | "right" }
function art(a, where) {
  if (!a) return '';
  const o = typeof a === 'string' ? { src: a } : a;
  exists(o.src, where);
  return `<img class="c__art${o.fit && o.fit !== 'bottom' ? ` c__art--${esc(o.fit)}` : ''}" src="${esc(url(o.src))}" alt="" aria-hidden="true" loading="lazy">`;
}

// ── tallas y tonos por tipo ───────────────────────────────────────
const TYPES = {
  intro: { size: 'full', tone: 0, sizes: ['full', 'wide', 'xl'] },
  portrait: { size: 'full', tone: 1, sizes: ['full', 'xl', 'big', 'tall', 'half'] },
  feature: { size: 'full', tone: 1, sizes: ['full', 'xl', 'wide', 'big'] },
  tile: { size: 'half', tone: 2, sizes: ['half', 'wide', 'full', 'tall'] },
  photo: { size: 'half', tone: 1, sizes: ['half', 'tall', 'wide', 'full', 'big'] },
  video: { size: 'full', tone: 1, sizes: ['full', 'xl', 'wide', 'half', 'tall', 'big'] },
  story: { size: 'full', tone: 1, sizes: ['full', 'wide', 'big'] },
  list: { size: 'full', tone: 1, sizes: ['full', 'wide', 'big'] },
  pills: { size: 'full', tone: 1, sizes: ['full', 'wide'] },
  ticker: { size: 'full', tone: 1, sizes: ['full'] },
  rail: { size: 'full', tone: 0, sizes: ['full', 'wide', 'big'] },
};

// envoltorio de una tarjeta de un solo destino: <a> si hay enlace, pendiente si está vacío, <section> si no lleva
function wrap(c, k, inner, label) {
  if (!('href' in c)) return `<section ${k.attrs}${label ? ` aria-label="${esc(label)}"` : ''}>${inner}</section>`;
  const a = la(c.href, k.id, { track: c.track, utm: c.utm });
  if (!a) return `<div ${k.attrs.replace('class="', 'class="is-pending ')} aria-disabled="true">${inner}${DRAFT ? `<span class="pend">${L.pending}</span>` : ''}</div>`;
  return `<a ${k.attrs} ${a}>${inner}<span class="act">${arrow(c.href)}</span></a>`;
}

const initials = n => n.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');

// ── las tarjetas ──────────────────────────────────────────────────
const R = {
  intro(c, k) {
    const H = k.h1 ? 'h1' : 'h2';
    long(c.claim, 60, `${k.id}.claim`);
    let who = '';
    if (c.name) {
      if (c.avatar?.src) exists(c.avatar.src, `${k.id}.avatar`);
      const av = c.avatar?.src
        ? `<img class="who__av" src="${esc(url(c.avatar.src))}" alt="" width="96" height="96">`
        : `<span class="who__av who__av--ini" aria-hidden="true">${esc(initials(c.name))}</span>`;
      const tx = `${av}<span><b>${esc(c.name)}</b>${c.role ? `<small>${esc(c.role)}</small>` : ''}</span>`;
      const a = 'href' in c ? la(c.href, `${k.id}_who`) : null;
      who = a ? `<a class="who" ${a}>${tx}${arrow(c.href)}</a>` : `<span class="who">${tx}</span>`;
    }
    const lines = (c.lines || []).length ? `<ul class="intro__lines">${c.lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : '';
    return `<section ${k.attrs}><div class="box">${who}<${H} class="ttl intro__claim">${ttl(c.claim, c.accent)}</${H}>${c.sub ? `<p class="sub intro__sub">${esc(c.sub)}</p>` : ''}${lines}</div></section>`;
  },

  portrait(c, k) {
    const H = k.h1 ? 'h1' : 'h2';
    const name = c.title ? `${kick(c.kicker)}<${H} class="ttl portrait__name">${ttl(c.title, c.accent)}</${H}>${c.sub ? `<p class="sub">${esc(c.sub)}</p>` : ''}` : '';
    if (c.title) k.attrs = k.attrs.replace('class="', 'class="has-name ');
    // proporción fija (p. ej. una foto apaisada con el nombre ya dentro); si no, 4:5 en el celular y 16:9 a lo ancho
    if (c.ratio) k.attrs += ` style="--p-ratio:${esc(String(c.ratio).replace(':', '/'))}"`;
    const inner = `<span class="media">${pic(c.image, `${k.id}.image`, { eager: true })}</span><div class="box">${name}</div>`;
    return wrap(c, k, inner, c.image?.alt || plain(c.title, c.accent));
  },

  feature(c, k) {
    const noMedia = c.image === false;   // la oferta sin foto: solo texto y botón
    const onBody = noMedia || c.titleOn === 'body';
    if (noMedia) k.attrs = k.attrs.replace('class="', 'class="no-media ');
    long(plain(c.title, c.accent), onBody ? 70 : 28, `${k.id}.title`);
    long(c.cta?.text, 28, `${k.id}.cta.text`);
    const title = `<h2 class="ttl f__ttl">${ttl(c.title, c.accent)}</h2>`;
    const over = onBody ? '' : `<span class="f__over">${kick(c.kicker)}${title}</span>`;
    const mediaHref = c.href ?? c.cta?.href;
    const ma = mediaHref && !noMedia ? la(mediaHref, `${k.id}_img`, { track: c.track }) : null;
    const mcls = `f__media${onBody ? '' : ' f__media--over'}${c.image?.fade === false ? '' : ' fade'}`;
    const inner = noMedia ? '' : `${pic(c.image, `${k.id}.image`, { eager: k.eager })}${over}`;
    const media = noMedia ? '' : ma ? `<a class="${mcls}" ${ma}>${inner}</a>` : `<div class="${mcls}">${inner}</div>`;
    const chips = (c.chips || []).length ? `<ul class="chips">${c.chips.map(ch => `<li class="chip${ch.live ? ' chip--live' : ''}">${esc(ch.text ?? ch)}</li>`).join('')}</ul>` : '';
    let cta = '';
    if (c.cta) {
      const a = la(c.cta.href, `${k.id}_cta`, { track: c.cta.track || 'cta_click', utm: c.cta.utm });
      // si el texto no trae flecha, la flecha va en SVG (las fuentes no siempre traen ↗)
      const label = esc(c.cta.text) + (/[→↗]\s*$/.test(c.cta.text) ? '' : ' ' + arrow(c.cta.href || ''));
      cta += a ? `<a class="btn btn--full" ${a}>${label}</a>` : `<span class="btn btn--full is-pending" aria-disabled="true">${label}</span>`;
    }
    if (c.alt) {
      const a = la(c.alt.href, `${k.id}_alt`, { track: c.alt.track || (c.alt.utm ? 'checkout_click' : undefined), utm: c.alt.utm });
      if (a) cta += `<a class="alt" ${a}>${esc(c.alt.text)} ${arrow(c.alt.href)}</a>`;
    }
    let by = '';
    if (c.by) {
      if (c.by.logo?.src) exists(c.by.logo.src, `${k.id}.by.logo`);
      by = `<span class="f__by">${c.by.logo?.src ? `<img src="${esc(url(c.by.logo.src))}" alt="${esc(c.by.logo.alt || c.by.text || '')}" loading="lazy">` : ''}${c.by.text && !c.by.logo?.src ? esc(c.by.text) : ''}</span>`;
    }
    const ctaBox = cta ? `<div class="f__cta">${cta}</div>` : '';
    const body = `<div class="f__body">${onBody ? kick(c.kicker) + title : ''}${chips}${c.sub ? `<p class="sub">${esc(c.sub)}</p>` : ''}${c.text ? `<p class="txt">${esc(c.text)}</p>` : ''}${c.meta ? `<p class="f__meta">${esc(c.meta)}</p>` : ''}${by ? `<div class="f__foot">${ctaBox}${by}</div>` : ctaBox}</div>`;
    return `<article ${k.attrs}><div class="box">${media}${body}</div></article>`;
  },

  tile(c, k) {
    long(plain(c.title, c.accent), 40, `${k.id}.title`);
    if (!('href' in c)) c.href = '';
    let deco = '';
    if (c.sticker) {
      k.attrs = k.attrs.replace('class="', 'class="has-stk ');
      const r = k.stickerFlip ? ' stk--r' : '';
      if (c.sticker.src) { exists(c.sticker.src, `${k.id}.sticker`); deco = `<img class="stk${r}" src="${esc(url(c.sticker.src))}" alt="${esc(c.sticker.alt || '')}" loading="lazy">`; }
      else { placeholders.push(`${k.id}.sticker`); deco = `<span class="stk stk--ph${r}"><span>${esc(c.sticker.label || L.product)}</span></span>`; }
    } else if (c.glyph) {
      k.attrs = k.attrs.replace('class="', 'class="has-gl ');
      deco = icon(c.glyph, 'tile__gl');
    }
    deco = art(c.art, `${k.id}.art`) + deco;
    const inner = `<div class="box">${kick(c.kicker)}<span class="ttl tile__t">${ttl(c.title, c.accent)}</span>${c.text ? `<span class="txt">${esc(c.text)}</span>` : ''}</div>${deco}`;
    return wrap(c, k, inner);
  },

  photo(c, k) {
    if (!('href' in c)) c.href = '';
    const inner = `<span class="media">${pic(c.image, `${k.id}.image`, { eager: k.eager })}</span>${c.play ? playMark() : ''}<div class="box">${kick(c.kicker)}${c.title ? `<span class="ttl photo__t">${ttl(c.title, c.accent)}</span>` : ''}${c.sub ? `<span class="txt">${esc(c.sub)}</span>` : ''}</div>`;
    return wrap(c, k, inner);
  },

  video(c, k) {
    const ratio = String(c.ratio || '16:9').replace(':', '/');
    if (c.src) exists(c.src, `${k.id}.src`);
    if (c.poster?.src) exists(c.poster.src, `${k.id}.poster`);
    const poster = c.poster?.src ? url(c.poster.src) : c.youtube ? `https://i.ytimg.com/vi/${encodeURIComponent(c.youtube)}/hqdefault.jpg` : '';
    const name = plain(c.title, c.accent) || 'video';
    let media;
    if (c.src) media = `<video preload="none" playsinline${poster ? ` poster="${esc(poster)}"` : ''}><source src="${esc(url(c.src))}" type="video/mp4"></video>`;
    else if (poster) media = `<img class="v__poster" src="${esc(poster)}" alt="" loading="lazy">`;
    else { placeholders.push(`${k.id}.poster`); media = `<span class="ph"><span>${esc(c.poster?.label || L.video)}</span></span>`; }
    const playable = !!(c.src || c.youtube);
    if (!playable) pending.push(k.id);
    const btn = playable ? `<button type="button" class="v__play" aria-label="${L.play}: ${esc(name)}"><span class="v__dot" aria-hidden="true"></span></button>` : '';
    const cap = c.kicker || c.title ? `<span class="v__cap">${kick(c.kicker)}${c.title ? `<span class="ttl v__t">${ttl(c.title, c.accent)}</span>` : ''}</span>` : '';
    const attrs = playable ? k.attrs : k.attrs.replace('class="', 'class="is-pending ');
    return `<section ${attrs} aria-label="Video: ${esc(name)}"><div class="box" data-player${c.youtube ? ` data-yt="${esc(c.youtube)}"` : ''} style="--ratio:${esc(ratio)}">${media}${btn}${cap}</div></section>`;
  },

  story(c, k) {
    const link = c.link ? (a => (a ? `<a class="alt" ${a}>${esc(c.link.text)} ${arrow(c.link.href)}</a>` : ''))(la(c.link.href, `${k.id}_link`)) : '';
    const close = c.close ? `<p class="story__close">${esc(c.close)}${c.closeAccent ? ` <em>${esc(c.closeAccent)}</em>` : ''}</p>` : '';
    return `<section ${k.attrs}>${art(c.art, `${k.id}.art`)}<div class="box">${kick(c.kicker)}<h2 class="ttl story__t">${ttl(c.title, c.accent)}</h2>${(c.lines || []).map(l => `<p class="story__line">${esc(l)}</p>`).join('')}${close}${link}</div></section>`;
  },

  list(c, k) {
    const v = c.variant || 'index';
    if (!['index', 'press', 'people'].includes(v)) errors.push(`${k.id}: variant «${v}» no existe (index, press, people)`);
    const items = c.items || [];
    const rows = items.map((it, i) => {
      const loc = `${k.id}_${i + 1}`;
      const a = la(it.href, loc, { track: it.track });
      let inner;
      if (v === 'press') {
        if (it.logo?.src) exists(it.logo.src, `${loc}.logo`);
        const src = it.logo?.src ? `<img class="row__logo" src="${esc(url(it.logo.src))}" alt="${esc(it.logo.alt || it.source || '')}" loading="lazy">` : `<span class="row__src">${esc(it.source || '')}</span>`;
        inner = `<span class="row__top">${src}<span class="row__m kick">${esc(it.meta || '')}${it.href ? ' ' + arrow(it.href) : ''}</span></span><span class="row__tx"><b>${esc(it.label)}</b>${it.note ? `<small>${esc(it.note)}</small>` : ''}</span>`;
      } else if (v === 'people') {
        if (it.thumb?.src) exists(it.thumb.src, `${loc}.thumb`);
        else placeholders.push(`${loc}.thumb`);
        const th = `<span class="row__th">${it.thumb?.src ? `<img src="${esc(url(it.thumb.src))}" alt="" loading="lazy">` : ''}</span>`;
        inner = `${th}<span class="row__tx"><b>${esc(it.label)}</b>${it.note ? `<small>${esc(it.note)}</small>` : ''}</span>${it.href ? arrow(it.href) : '<span></span>'}`;
      } else {
        inner = `<span class="row__n kick">${esc(it.n ?? String(i + 1).padStart(2, '0'))}</span><span class="row__tx"><b>${esc(it.label)}</b>${it.note ? `<small>${esc(it.note)}</small>` : ''}</span><span class="row__m kick">${esc(it.meta || '')}</span>${it.href ? arrow(it.href) : '<span></span>'}`;
      }
      return `<li>${a ? `<a class="row" ${a}>${inner}</a>` : `<div class="row is-pending" aria-disabled="true">${inner}</div>`}</li>`;
    }).join('');
    const count = c.count ? `<span class="kick">${String(items.length).padStart(2, '0')}</span>` : '';
    const hd = c.kicker || count ? `<div class="list__hd">${kick(c.kicker) || '<span></span>'}${count}</div>` : '';
    const title = c.title ? `<h2 class="ttl list__t">${ttl(c.title, c.accent)}</h2>` : '';
    return `<section ${k.attrs}${!c.title && c.kicker ? ` aria-label="${esc(c.kicker)}"` : ''}><div class="box">${hd}${title}<ul class="rows rows--${esc(v)}">${rows}</ul></div></section>`;
  },

  pills(c, k) {
    const items = (c.items || []).map((it, i) => {
      const a = la(it.href, `${k.id}_${(it.label || i).toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, { track: it.track });
      const l = `<span class="pill__l">${it.glyph ? icon(it.glyph, 'pill__gl') : ''}${esc(it.label)}</span>`;
      return a ? `<a class="pill" ${a}>${l}${arrow(it.href)}</a>` : `<span class="pill is-pending" aria-disabled="true">${l}</span>`;
    }).join('');
    const cols = Math.min(Math.max(c.cols || (c.items || []).length, 1), 3);
    return `<nav ${k.attrs} aria-label="${esc(c.label || L.links)}" style="--cols:${cols}"><div class="box">${items}</div></nav>`;
  },

  ticker(c, k) {
    const g = c.glyph || 'star';
    const items = c.items || [];
    const chars = items.join('').length || 1;
    const one = items.map(t => `<span>${esc(t)}${icon(g, 'tk__gl')}</span>`).join('').repeat(Math.max(1, Math.ceil(90 / chars)));
    return `<div ${k.attrs} aria-hidden="true"${c.speed ? ` style="--tk-speed:${Number(c.speed)}s"` : ''}><div class="tk"><div class="tk__in">${one}${one}</div></div></div>`;
  },

  rail(c, k) {
    const items = c.items || [];
    const ratio = String(c.ratio || '4:5').replace(':', '/');
    const lis = items.map((it, i) => {
      const loc = `${k.id}_${i + 1}`;
      const a = 'href' in it ? la(it.href, loc, { track: it.track }) : null;
      const img = `<span class="rail__img">${pic(it.image, `${loc}.image`)}${it.play ? playMark() : ''}</span>`;
      const tx = it.title || it.sub ? `<span class="rail__tx">${it.title ? `<b>${esc(it.title)}</b>` : ''}${it.sub ? `<small>${esc(it.sub)}</small>` : ''}</span>` : '';
      return `<li>${a ? `<a class="rail__it" ${a}>` : '<div class="rail__it">'}${img}${tx}${a ? '</a>' : '</div>'}</li>`;
    }).join('');
    const count = c.count ? `<span class="kick">${String(items.length).padStart(2, '0')}</span>` : '';
    const hd = c.kicker || count ? `<div class="list__hd">${kick(c.kicker) || '<span></span>'}${count}</div>` : '';
    const title = c.title ? `<h2 class="ttl list__t">${ttl(c.title, c.accent)}</h2>` : '';
    return `<section ${k.attrs}${!c.title && c.kicker ? ` aria-label="${esc(c.kicker)}"` : ''} style="--rail-ratio:${esc(ratio)}"><div class="box">${hd}${title}<ul class="rail${c.wide ? ' rail--wide' : ''}">${lis}</ul></div></section>`;
  },
};

// ── validación de la raíz ─────────────────────────────────────────
if (!meta.title) errors.push('meta.title es obligatorio');
if (!meta.description) errors.push('meta.description es obligatorio');
long(meta.title, 60, 'meta.title');
long(meta.description, 160, 'meta.description');
const cards = C.cards || [];
if (!cards.length) errors.push('cards está vacío');
if (cards.length > 12) warns.push(`${cards.length} tarjetas: el hub no explica, dirige (lo sano es ≤ 12)`);
if (!C.bar?.cta) warns.push('bar.cta vacío: el hub queda sin acción principal fija en el móvil');
if ((C.bar?.items || []).length > 3) warns.push('bar.items: más de 3 atajos no caben en 360 px');
long(C.bar?.cta?.text, 18, 'bar.cta.text');
const layout = C.layout || 'feed';
if (!['feed', 'board'].includes(layout)) errors.push(`layout «${layout}» no existe (feed, board)`);

// ── render ────────────────────────────────────────────────────────
const ids = new Set();
let h1Done = false, stickers = 0;
const body = cards.map((c, i) => {
  const T = TYPES[c.type];
  if (!T) { errors.push(`cards[${i}]: tipo «${c.type}» no existe (${Object.keys(TYPES).join(', ')})`); return ''; }
  const id = c.id || `${c.type}-${i + 1}`;
  if (ids.has(id)) errors.push(`id repetido: ${id}`);
  ids.add(id);
  const size = c.size || T.size, tone = c.tone ?? T.tone;
  if (!T.sizes.includes(size)) errors.push(`${id}: size «${size}» no vale para ${c.type} (${T.sizes.join(', ')})`);
  if (!(tone >= 0 && tone <= 6)) errors.push(`${id}: tone ${tone} fuera de 0–6`);
  const k = { id, eager: i < 3, attrs: `class="c c--${c.type} t-${tone} z-${size} rv" id="${esc(id)}"` };
  if ((c.type === 'intro' || c.type === 'portrait') && !h1Done && (c.claim || c.title)) { k.h1 = true; h1Done = true; }
  if (c.type === 'tile' && c.sticker) k.stickerFlip = stickers++ % 2 === 1;
  return R[c.type](c, k);
}).join('\n');

const decor = (C.decor || []).length
  ? `<div class="decor" aria-hidden="true">${C.decor.map(d => icon(d.glyph, `at-${d.at || 'tr'}${d.spin ? ' spin' : ''}`)).join('')}</div>`
  : '';

const top = C.top
  ? `<header class="top">${C.top.href ? `<a class="wm" ${la(C.top.href, 'top_wm')}>` : '<span class="wm">'}${esc(C.top.wordmark || meta.siteName || '')}${C.top.href ? '</a>' : '</span>'}${(C.top.links || []).length ? `<nav aria-label="${L.outs}">${C.top.links.map(l => (a => (a ? `<a ${a}>${esc(l.label)} ${arrow(l.href)}</a>` : ''))(la(l.href, `top_${l.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`))).join('')}</nav>` : ''}</header>`
  : '';

const F = C.footer || {};
const year = new Date().getFullYear();
const foot = `<footer class="foot${F.mark ? ' foot--mark' : ''}">${F.mark ? `<span class="foot__mark" aria-hidden="true">${esc(F.mark)}</span>` : ''}${F.name && !F.mark ? `<span>${esc(F.name)}</span>` : ''}${(F.links || []).length ? `<nav aria-label="${L.legal}">${F.links.map(l => (a => (a ? `<a ${a}>${esc(l.label)}</a>` : ''))(la(l.href, `foot_${l.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`))).join('')}</nav>` : ''}<span>${esc(F.note || `© ${year} ${F.mark ? F.name || '' : ''}`.trim())}</span></footer>`;

const B = C.bar;
const bar = B
  ? `<nav class="bar" aria-label="${L.bar}">${(B.items || []).map(it => (a => (a ? `<a class="bar__it" ${a}>${icon(it.icon || 'circulo', 'bar__gl')}<span>${esc(it.label)}</span></a>` : ''))(la(it.href, `bar_${it.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`))).join('')}${B.cta ? (a => (a ? `<a class="bar__cta" ${a}>${esc(B.cta.text)}</a>` : ''))(la(B.cta.href, 'bar_cta', { track: B.cta.track || 'cta_click', utm: B.cta.utm })) : ''}</nav>`
  : '';

if (!h1Done) warns.push('sin intro ni portrait con título: se pone un h1 oculto con meta.siteName');
const h1 = h1Done ? '' : `<h1 class="sr">${esc(meta.siteName || meta.title)}</h1>`;

if (!DRAFT && placeholders.length) errors.push(`no se publica con fotos pendientes: ${placeholders.join(', ')}`);
if (!DRAFT && pending.length) errors.push(`no se publica con enlaces pendientes: ${pending.join(', ')}`);

if (errors.length) {
  console.error('✗ ' + errors.join('\n✗ '));
  process.exit(1);
}

const og = [
  meta.canonical && `<link rel="canonical" href="${esc(meta.canonical)}">`,
  `<meta property="og:type" content="profile">`,
  meta.canonical && `<meta property="og:url" content="${esc(meta.canonical)}">`,
  `<meta property="og:title" content="${esc(meta.ogTitle || meta.siteName || meta.title)}">`,
  `<meta property="og:description" content="${esc(meta.description)}">`,
  meta.siteName && `<meta property="og:site_name" content="${esc(meta.siteName)}">`,
  meta.locale && `<meta property="og:locale" content="${esc(meta.locale)}">`,
  meta.image && `<meta property="og:image" content="${esc(meta.image)}">`,
  meta.image && meta.imageAlt && `<meta property="og:image:alt" content="${esc(meta.imageAlt)}">`,
  `<meta name="twitter:card" content="${meta.image ? 'summary_large_image' : 'summary'}">`,
].filter(Boolean).join('\n');

const fonts = meta.fonts
  ? `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="${esc(meta.fonts)}">`
  : '';
const custom = fs.existsSync(path.join(DIR, 'custom.css')) ? `\n<link rel="stylesheet" href="${esc(url('custom.css'))}">` : '';
if (meta.icon) exists(meta.icon, 'meta.icon');
else warns.push('sin meta.icon: la pestaña queda sin ícono');
const favicon = `<link rel="icon" href="${meta.icon ? esc(url(meta.icon)) : 'data:,'}">`;

const html = `<!DOCTYPE html>
<html lang="${esc(meta.lang || 'es')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
${DRAFT ? '<meta name="robots" content="noindex, nofollow">\n' : ''}${og}
${meta.themeColor ? `<meta name="theme-color" content="${esc(meta.themeColor)}">\n` : ''}${favicon}
${fonts}
<link rel="stylesheet" href="${esc(url('tokens.css'))}">
<link rel="stylesheet" href="${esc(url('hub.css'))}">${custom}
<script>(function(d){if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window){d.classList.add("js");setTimeout(function(){if(!(window.HUB&&window.HUB.ready))d.classList.remove("js")},3000)}})(document.documentElement);</script>
<script src="${esc(url('hub.js'))}" defer></script>
${meta.headHtml || ''}
</head>
<body class="${[B ? 'has-bar' : '', DRAFT ? 'is-draft' : ''].filter(Boolean).join(' ')}" data-page="${esc(meta.page || 'links')}">
<!-- Generado por tools/build-hub.mjs desde content.json: no se edita a mano. -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">${[...used].map(n => SYM[n]).join('')}</svg>
${decor}
${DRAFT && meta.ribbon !== false ? `<div class="ribbon">${esc(meta.ribbon || L.draft)}</div>\n` : ''}<div class="hub hub--${layout}" id="top">
${top}
<main class="grid">
${h1}${body}
</main>
${foot}
</div>
${bar}
</body>
</html>
`;

if (path.resolve(DIR) !== path.resolve(TPL)) {
  for (const f of ['hub.css', 'hub.js']) fs.copyFileSync(path.join(TPL, f), path.join(DIR, f));
  if (!fs.existsSync(path.join(DIR, 'tokens.css'))) {
    fs.copyFileSync(path.join(TPL, 'tokens.css'), path.join(DIR, 'tokens.css'));
    warns.push('tokens.css no existía: se copió el de partida (ajústalo a la marca)');
  }
}
fs.writeFileSync(path.join(DIR, 'index.html'), html);

const rel = path.relative(ROOT, DIR) || '.';
console.log(`✓ ${rel}/index.html · ${cards.length} tarjetas · ${layout}${DRAFT ? ' · borrador (noindex)' : ''}`);
if (placeholders.length) console.log(`  fotos pendientes (${placeholders.length}): ${placeholders.join(', ')}`);
if (pending.length) console.log(`  enlaces pendientes (${pending.length}): ${pending.join(', ')}`);
for (const w of warns) console.log(`  ! ${w}`);
