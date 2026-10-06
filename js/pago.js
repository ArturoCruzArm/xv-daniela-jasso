/* ============================================================
   AVISO DE SALDO PENDIENTE — selector y álbum
   Mientras eventos.saldo_pendiente > 0 (Supabase) las fotos no se
   muestran: se ve un aviso con el saldo y un botón de WhatsApp.
   Para abrir el acceso basta poner saldo_pendiente = 0; no hay que
   volver a publicar el sitio.
   Se carga en <head>, antes que todo, para que la página no alcance
   a pintar ni a descargar fotos mientras se consulta el saldo.
   ============================================================ */
(function () {
    'use strict';
    let CFG = {};          // config.js se carga al final del body: se lee en DOMContentLoaded
    const html = document.documentElement;

    const css = document.createElement('style');
    css.textContent = `
      html.pago-revisando body > *:not(#pago-aviso) { visibility: hidden; }
      html.pago-bloqueado body > *:not(#pago-aviso) { display: none !important; }
      #pago-aviso { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px 16px;
        background: linear-gradient(160deg, #7a0f1d, #c0273a); font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
      #pago-aviso .caja { background: #fff; color: #2a1215; max-width: 440px; width: 100%; border-radius: 18px;
        padding: 28px 24px; text-align: center; box-shadow: 0 18px 50px rgba(0,0,0,.25); }
      #pago-aviso .icono { font-size: 44px; line-height: 1; }
      #pago-aviso h1 { font-size: 22px; margin: 12px 0 6px; }
      #pago-aviso p { margin: 8px 0; line-height: 1.5; color: #4b3135; }
      #pago-aviso .saldo { font-size: 34px; font-weight: 800; color: #b3192e; margin: 14px 0 4px; }
      #pago-aviso .nota { font-size: 13px; color: #7d6266; }
      #pago-aviso a.wa { display: inline-block; margin-top: 16px; background: #25d366; color: #fff; text-decoration: none;
        font-weight: 700; padding: 13px 22px; border-radius: 999px; font-size: 16px; }
    `;
    document.head.appendChild(css);
    html.classList.add('pago-revisando');

    const fmt = n => '$' + Math.round(n).toLocaleString('es-MX');

    function mostrarAviso(saldo) {
        html.classList.add('pago-bloqueado');
        const nombre = (CFG.nombreCorto || CFG.nombre || '').trim();
        const total = (CFG.totalFotos || (window.PHOTOS || []).length) || '';
        const msg = `Hola, queremos liquidar el saldo de ${fmt(saldo)} de ${nombre ? 'los XV de ' + nombre : 'nuestro evento'} para abrir el selector de fotos.`;
        const tel = CFG.telefono || '524779203776';
        const div = document.createElement('div');
        div.id = 'pago-aviso';
        div.innerHTML = `<div class="caja">
            <div class="icono">📸</div>
            <h1>¡Tus fotos ya están listas!</h1>
            <p>${total ? `Ya preparamos <strong>${total} fotos</strong> de tu evento.` : 'Ya preparamos las fotos de tu evento.'}
               Para abrir el selector y el álbum solo falta liquidar el saldo de tu paquete:</p>
            <div class="saldo">${fmt(saldo)}</div>
            <p class="nota">En cuanto lo recibamos se abre el acceso, sin cambiar de enlace.</p>
            <a class="wa" href="https://wa.me/${tel}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Liquidar por WhatsApp</a>
          </div>`;
        document.body.prepend(div);
        // las demás secciones no se pintan; se cortan además las descargas que ya hubieran empezado
        const quitar = () => document.querySelectorAll('img[src]').forEach(i => { if (!div.contains(i)) i.removeAttribute('src'); });
        quitar();
        // el selector y el album pintan la rejilla despues: tampoco dejamos que descarguen esas fotos
        new MutationObserver(quitar).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
    }

    function revisar() {
        CFG = window.EVENT_CONFIG || {};
        if (!CFG.supabaseUrl || !CFG.supabaseAnon || !CFG.slug) { html.classList.remove('pago-revisando'); return; }
        fetch(`${CFG.supabaseUrl}/rest/v1/eventos?slug=eq.${encodeURIComponent(CFG.slug)}&select=saldo_pendiente&limit=1`, {
            headers: { apikey: CFG.supabaseAnon, Authorization: 'Bearer ' + CFG.supabaseAnon },
            cache: 'no-store',
        })
        .then(r => r.ok ? r.json() : [])
        .then(rows => {
            const saldo = +(rows[0] && rows[0].saldo_pendiente) || 0;
            if (saldo > 0) mostrarAviso(saldo);
            html.classList.remove('pago-revisando');
        })
        // si Supabase no responde no se bloquea a quien ya pagó (el selector tampoco podría guardar)
        .catch(() => html.classList.remove('pago-revisando'));
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', revisar) : revisar();
})();
