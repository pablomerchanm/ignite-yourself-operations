# Lote de prueba — Celda B (abogados boutique) · 2026-07-29

5 investigados → **5 calificados (4 A + 1 B)** · 2 exclusiones documentadas · Correo T1 hallado: **4/5 (80%)**.

## Técnicas de descubrimiento de correo que funcionaron (replicables)
1. **CalBar (California):** el perfil oficial publica el correo tras una ofuscación de ~20 correos señuelo; el real es el único span visible por CSS (`#eN{display:inline}`). Se lee el visible — nunca se deduce. → T1 con URL oficial.
2. **Florida Bar:** el perfil oficial publica el correo protegido con Cloudflare (`data-cfemail`); se decodifica el atributo de la propia página (= lo que renderiza el navegador). → T1 con URL oficial.
3. **Bios de firma boutique:** Corboy & Demetrio publica correo + línea directa en la bio (T1 ideal). GMSR publica el directorio completo de correos.
4. **Regla confirmada:** ZoomInfo/directorios de enriquecimiento muestran correos inferidos/redactados → se descartan siempre (§8.2).

## Bloqueos técnicos (para el summary final)
- 403 a fetch no-navegador: trustlitigation.la, martindale.com, superlawyers.com, aia.org, sec.gov/EDGAR clásico (efts.sec.gov sí abre). Mitigación: fuentes oficiales + snippets de búsqueda.
- FL Bar: buscador find-mbr es JS/POST (sin resultados por GET) — los perfiles se alcanzan vía búsqueda web indexada.
- NY courts attorney search: requiere POST/captcha → admisiones NY quedan [UNCONFIRMED] (Stutman).
- LinkedIn: login-wall (999) — solo URL + señal de existencia.
- Riesgo documentado: un buscador atribuyó a Soto el perfil de bar de un colega de su misma firma — verificar SIEMPRE nombre en la página destino.

## Lecciones de fit
- "Boutique" hay que re-verificarla en presente: Grippo & Elden se fusionó con Shook (2015) → exclusión.
- "Partner Emeritus" = señal de retiro → exclusión (Richland) aunque el correo T1 esté publicado.
- La paradoja §3 se confirma: el fit más alto sin esfuerzo de contacto (Stutman, 86) fue el único T3.
