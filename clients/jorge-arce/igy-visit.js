/* Aviso de visitas de los previews de Ignite Yourself.
   Cuando alguien abre un preview y lo deja a la vista unos segundos, avisa a /api/visit, que le
   manda un correo a Pablo. Una vez por pestana, y otra aparte si abre la propuesta. Sin cookies.
   Para que tus propias visitas no cuenten: abre cualquier preview con ?soyyo, una vez en cada
   navegador (?nosoyyo lo deshace). Tambien apaga Vercel Analytics en ese navegador. */
(function () {
  var ls = null, ss = null;
  try { ls = window.localStorage; } catch (e) {}
  try { ss = window.sessionStorage; } catch (e) {}
  try {
    if (/[?&]soyyo(=|&|$)/.test(location.search)) ls.setItem('igy-me', '1');
    if (/[?&]nosoyyo(=|&|$)/.test(location.search)) ls.removeItem('igy-me');
    if (ls && ls.getItem('igy-me')) return;
  } catch (e) {}
  if (navigator.webdriver) return;

  var parts = location.pathname.split('/').filter(Boolean);
  var slug = parts[0];
  if (!slug) return;
  var kind = parts[1] === 'proposal' ? 'proposal' : 'open';
  var flag = 'igy-sent-' + slug + '-' + kind;
  try { if (ss && ss.getItem(flag)) return; } catch (e) {}

  var timer = null, sent = false;
  function send() {
    if (sent) return;
    sent = true;
    try { ss.setItem(flag, '1'); } catch (e) {}
    var n = 1;
    if (kind === 'open') {
      try { n = (parseInt(ls.getItem('igy-n-' + slug), 10) || 0) + 1; ls.setItem('igy-n-' + slug, String(n)); } catch (e) {}
    }
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    var body = JSON.stringify({ slug: slug, kind: kind, path: location.pathname, ref: document.referrer || '',
      tz: tz, w: (window.screen && screen.width) || 0, n: n });
    try { if (navigator.sendBeacon && navigator.sendBeacon('/api/visit', body)) return; } catch (e) {}
    try { fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: body, keepalive: true }); } catch (e) {}
  }
  // solo cuenta tras 3 segundos a la vista: los escaneres de enlaces y las vistas previas no esperan
  function watch() {
    if (sent) return;
    if (document.visibilityState === 'visible') { if (!timer) timer = setTimeout(send, 3000); }
    else if (timer) { clearTimeout(timer); timer = null; }
  }
  document.addEventListener('visibilitychange', watch);
  watch();
})();
