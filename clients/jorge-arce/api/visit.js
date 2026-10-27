// Aviso de visitas de los previews. /igy-visit.js llama aqui cuando alguien abre un preview
// (o su propuesta) y esto le manda un correo a Pablo: quien, cuando, desde donde y con que.
//
// Variables en Vercel (Settings → Environment Variables):
//   RESEND_API_KEY  la clave de resend.com
//   ALERT_TO        el correo que recibe los avisos (con onboarding@resend.dev, el de la cuenta de Resend)
//   ALERT_FROM      opcional, cuando igniteyourself.co este verificado en Resend
// Sin clave no se manda nada: la visita solo queda en los logs de Vercel.

// el nombre de cada preview; un preview que no este aqui no avisa
const PEOPLE = {
  pettingill: 'Bernard Pettingill',
  rodriguez: 'Rick Rodriguez',
  brant: 'Patrick Brant',
  'mark-cooke': 'Mark Cooke',
  kappelman: 'Leon Kappelman',
  'kappelman-gareis': 'Leon Kappelman',
  'kappelman-getty': 'Leon Kappelman',
  freudenthal: 'Robert Freudenthal',
  habib: 'Nagy Habib',
  nilsson: 'Johan Nilsson',
  vishwanathan: 'Priya Vishwanathan',
  adriana: 'Adriana Mejía Cuartas',
  'adriana-gareis': 'Adriana Mejía Cuartas',
  arce: 'Jorge Arce',
  hart: 'Jamie Hart',
};

const BOTS = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|embedly|scanner|python|curl|wget/i;
const SOURCE = /^https:\/\/((www\.)?igniteyourself\.co|[a-z0-9-]+\.vercel\.app)(\/|$)/i;

// freno entre avisos repetidos de la misma persona en la misma instancia
const seen = new Map();
const QUIET = 10 * 60 * 1000;

const clip = (s, n) => String(s == null ? '' : s).slice(0, n);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function device(ua) {
  const os = /iPhone/.test(ua) ? 'iPhone'
    : /iPad/.test(ua) ? 'iPad'
    : /Android/.test(ua) ? (/Mobile/.test(ua) ? 'Android' : 'tablet Android')
    : /Macintosh/.test(ua) ? 'Mac'
    : /Windows/.test(ua) ? 'Windows'
    : /CrOS/.test(ua) ? 'Chromebook'
    : /Linux/.test(ua) ? 'Linux' : 'otro sistema';
  const app = /LinkedInApp/.test(ua) ? 'app de LinkedIn'
    : /GSA\//.test(ua) ? 'app de Google'
    : /FBAN|FBAV/.test(ua) ? 'app de Facebook'
    : /Instagram/.test(ua) ? 'app de Instagram'
    : /Edg(A|iOS)?\//.test(ua) ? 'Edge'
    : /OPR\//.test(ua) ? 'Opera'
    : /Firefox|FxiOS/.test(ua) ? 'Firefox'
    : /CriOS|Chrome\//.test(ua) ? 'Chrome'
    : /Safari\//.test(ua) ? 'Safari' : 'navegador';
  return os + ' · ' + app;
}

function place(h) {
  let city = '';
  try { city = decodeURIComponent(h['x-vercel-ip-city'] || ''); } catch (e) { city = String(h['x-vercel-ip-city'] || ''); }
  const region = clip(h['x-vercel-ip-country-region'], 8);
  const code = clip(h['x-vercel-ip-country'], 4);
  let country = code;
  try { if (code) country = new Intl.DisplayNames(['es'], { type: 'region' }).of(code) || code; } catch (e) {}
  return [clip(city, 60), region, country].filter(Boolean).join(', ') || 'sin dato';
}

function when(tz) {
  const d = new Date();
  const fmt = (zone, o) => new Intl.DateTimeFormat('es-ES', Object.assign({ timeZone: zone }, o)).format(d);
  let line = fmt('Europe/Madrid', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) + ' en Madrid';
  if (tz && tz !== 'Europe/Madrid') {
    try { line += ' · ' + fmt(tz, { hour: '2-digit', minute: '2-digit' }) + ' en su zona (' + tz + ')'; } catch (e) {}
  }
  return line;
}

function origin(ref) {
  if (!ref) return 'enlace directo (correo, WhatsApp o escrito a mano)';
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '');
    return host === 'igniteyourself.co' ? 'otra página de su preview' : host;
  } catch (e) { return 'sin dato'; }
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const done = (code) => { res.statusCode = code || 204; res.end(); };
  if (req.method !== 'POST') return done(405);

  const h = req.headers;
  if (!SOURCE.test(String(h.origin || h.referer || ''))) return done();
  const ua = clip(h['user-agent'], 400);
  if (!ua || BOTS.test(ua)) return done();

  let b = req.body;
  if (Buffer.isBuffer(b)) b = b.toString('utf8');
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b !== 'object') return done();

  const slug = clip(b.slug, 40);
  const who = Object.prototype.hasOwnProperty.call(PEOPLE, slug) ? PEOPLE[slug] : '';
  if (!who) return done();
  const kind = b.kind === 'proposal' ? 'proposal' : 'open';
  const path = /^\/[a-z0-9\-/]*$/i.test(String(b.path || '')) && String(b.path).startsWith('/' + slug) ? clip(b.path, 120) : '/' + slug;

  const ip = String(h['x-forwarded-for'] || '').split(',')[0].trim();
  const key = kind + '|' + slug + '|' + ip;
  const now = Date.now();
  if (seen.has(key) && now - seen.get(key) < QUIET) return done();
  seen.set(key, now);

  const n = Math.max(1, Math.min(999, parseInt(b.n, 10) || 1));
  const w = Math.max(0, Math.min(9999, parseInt(b.w, 10) || 0));
  const tz = /^[A-Za-z_]+(\/[A-Za-z0-9_+\-]+){0,2}$/.test(String(b.tz || '')) ? String(b.tz) : clip(h['x-vercel-ip-timezone'], 40);

  const subject = kind === 'proposal' ? '★ ' + who + ' abrió la propuesta'
    : n > 1 ? '👀 ' + who + ' volvió a su preview (visita ' + n + ')'
    : '👀 ' + who + ' abrió su preview';
  const rows = [
    ['Página', 'https://igniteyourself.co' + path],
    ['Cuándo', when(tz)],
    ['Dónde', place(h) + ' (aproximado, por IP)'],
    ['Dispositivo', device(ua) + (w ? ' · pantalla de ' + w + ' px' : '')],
    ['Llegó desde', origin(clip(b.ref, 300))],
    ['Visitas en ese dispositivo', String(n)],
  ];
  const foot = 'Aviso automático de igniteyourself.co. Para que tus propias visitas no cuenten, abre cualquier preview con ?soyyo al final, una vez en cada navegador.';

  console.log('[igy-visit]', JSON.stringify({ who, kind, path, n, place: rows[2][1], device: rows[3][1], from: rows[4][1] }));

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ALERT_TO;
  if (apiKey && to) {
    const text = subject + '\n\n' + rows.map((r) => r[0] + ': ' + r[1]).join('\n') + '\n\n' + foot;
    const html = '<div style="font:15px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#14161A">'
      + '<p style="font-size:18px;margin:0 0 14px"><b>' + esc(subject) + '</b></p>'
      + '<table style="border-collapse:collapse">' + rows.map((r) => '<tr><td style="padding:3px 18px 3px 0;color:#6b6f76;vertical-align:top">'
        + esc(r[0]) + '</td><td style="padding:3px 0">' + esc(r[1]) + '</td></tr>').join('') + '</table>'
      + '<p style="margin:18px 0 0;font-size:12px;color:#8a8e95">' + esc(foot) + '</p></div>';
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.ALERT_FROM || 'Ignite Yourself <onboarding@resend.dev>',
          to: to.split(',').map((s) => s.trim()).filter(Boolean),
          subject, text, html,
        }),
      });
      if (!r.ok) console.log('[igy-visit] resend', r.status, clip(await r.text(), 300));
    } catch (e) {
      console.log('[igy-visit] resend error', e.message);
    }
  }
  return done();
};
