/* ============================================================
   CONFIG ÚNICA DEL EVENTO — XV Años Daniela Guadalupe Jasso Moreno
   Cambiar SOLO aquí. Todas las páginas leen de window.EVENT_CONFIG.
   ============================================================ */
window.EVENT_CONFIG = {
    // ── Identidad ─────────────────────────────────────────────
    slug:        'xv-daniela-jasso',
    nombre:      'Daniela Guadalupe Jasso Moreno',
    nombreCorto: 'Daniela',
    tipo:        'XV Años',

    // ── Fecha (mes en base 0: 9 = octubre). Misa a las 12:00 ──
    fechaEvento: new Date(2026, 9, 3, 12, 0, 0),
    fechaTexto:  'Sábado 3 de octubre de 2026',

    // ── Contacto ──────────────────────────────────────────────
    telefono:        '524779203776',              // WhatsApp FORO 7
    contactoTitular: 'Ana Lilia Moreno Gómez',    // mamá de la quinceañera

    // ── Paquete contratado ────────────────────────────────────
    paquete: {
        nombre:          'Fotografía y Video · Paquete 1',
        fotosImpresas:   50,
        medidaImpresion: '5x7 pulgadas',
        ampliaciones:    1,
        videoHoras:      '2:00 hrs en 4K (original y copia)',
        incluye: [
            '50 fotos del evento impresas en 5x7 pulgadas',
            '1 película USB en 4K de 2:00 hrs, original y copia',
            '1 caja impresa para la USB',
            '1 caja impresa para las fotografías',
            '1 fotografía ampliada 50x60 cm',
            '1 sesión fotográfica antes del evento o el día del evento',
            '1 hora de ceremonia y 4 horas de recepción'
        ]
    },

    // ── Límites del selector ──────────────────────────────────
    limiteImpresion:    50,
    limiteAmpliacion:   1,      // la ampliación 50x60 cm
    limiteAlbum:        null,   // null = sin límite
    costoFotoAdicional: 15,     // MXN por foto impresa extra

    // ── Supabase ──────────────────────────────────────────────
    supabaseUrl:  'https://nzpujmlienzfetqcgsxz.supabase.co',
    supabaseAnon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56cHVqbWxpZW56ZmV0cWNnc3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODYzMzYsImV4cCI6MjA5MDI2MjMzNn0.xl3lsb-KYj5tVLKTnzpbsdEGoV9ySnswH4eyRuyEH1s'
};

/* ============================================================
   HERRAMIENTAS DEL SELECTOR
   Este arreglo define TODO: tarjetas de conteo, botones de
   filtro, botones del modal, colores, textos de ayuda y los
   filtros válidos de album.html?filtro=…
   ============================================================ */
(function (C) {
window.HERRAMIENTAS = [
    {
        id:      'impresion',
        icono:   '📸',
        nombre:  'Impresión',
        textoBtn:'Impresión (' + C.paquete.medidaImpresion.replace(' pulgadas', '') + ')',
        limite:  C.limiteImpresion,
        fraseIncluida: C.paquete.fotosImpresas + ' fotos impresas en ' + C.paquete.medidaImpresion,
        columna: 'impresion',
        ayuda:   'Marca las fotos que quieres <strong>impresas en papel tamaño ' + C.paquete.medidaImpresion +
                 '</strong>. Tu paquete incluye ' + C.limiteImpresion + '. Si marcas más, abajo aparece un aviso naranja ' +
                 'con el costo extra ($' + C.costoFotoAdicional + ' MXN por foto adicional). Estas son las fotos que ' +
                 'recibes físicas en tu caja impresa.'
    },
    {
        id:      'ampliacion',
        icono:   '🖼️',
        nombre:  'Ampliación',
        textoBtn:'Ampliación 50x60',
        limite:  C.limiteAmpliacion,
        columna: 'ampliacion',
        ayuda:   'La foto que quieres <strong>ampliada a 50x60 cm</strong>. Tu paquete incluye <strong>1</strong>, ' +
                 'así que elige la que más te guste: es la que va a colgarse en tu casa. Si la sesión se hace con ' +
                 'tiempo y el paquete está liquidado, te la llevamos ya impresa al salón el día del evento.'
    },
    {
        id:      'album',
        icono:   '📖',
        nombre:  'Álbum Digital',
        textoBtn:'Álbum Digital',
        limite:  null,
        columna: 'datos.album',
        ayuda:   'Las fotos que quieres en tu <strong>álbum digital</strong>: la galería en línea que puedes compartir por WhatsApp con familia y amigos. No tiene límite y no cuesta extra. Marca aquí tus favoritas aunque ya las hayas marcado para impresión.'
    },
    {
        id:      'descartada',
        icono:   '❌',
        nombre:  'Descartadas',
        textoBtn:'Descartar',
        limite:  null,
        columna: 'descartada',
        ayuda:   'Fotos que <strong>no quieres</strong> (saliste parpadeando, movida, repetida…). Al descartarlas <strong>desaparecen de la vista general</strong> para que no estorben mientras eliges. No se borran: siempre puedes verlas en el filtro «Descartadas» y quitarles la marca si te arrepientes.'
    }
];
})(window.EVENT_CONFIG);
