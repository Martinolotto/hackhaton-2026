export const preventiveGuide = {
  title: "Guía preventiva: verificá antes de actuar",
  editorialUpdatedAt: "25 de septiembre de 2026",
  introduction: [
    "No necesitás adivinar si algo es una estafa. Podés revisar señales, salir del mensaje y verificar antes de actuar.",
    "Una señal aislada no demuestra engaño. Una apariencia legítima tampoco confirma autenticidad, y no encontrar señales visibles no garantiza seguridad. Cuando te pidan dinero, datos, códigos, acceso o una descarga, comprobá la situación por un canal independiente. La decisión final sigue siendo tuya.",
  ],
  sections: [
    {
      id: "destino",
      title: "Revisá adónde te lleva",
      shortTitle: "Adónde te lleva",
      category: "Enlaces y sitios",
      whatToLookFor: [
        "La dirección completa que aparece en la barra del navegador.",
        "Letras cambiadas, agregadas o faltantes en el dominio.",
        "El nombre de una marca colocado en una parte secundaria de la dirección.",
        "Enlaces acortados o recibidos dentro de un pedido sensible.",
      ],
      whyItMatters:
        "Un sitio puede copiar el diseño de una organización y usar una dirección parecida. HTTPS protege la conexión, pero no demuestra que el sitio pertenezca a quien dice representar.",
      howToCheck: [
        "Mirá la barra de direcciones, no solo el logo o el diseño.",
        "Compará el dominio con una referencia que ya sepas confiable.",
        "Para bancos, billeteras, organismos o cuentas importantes, abrí la app oficial, usá un marcador propio o escribí la dirección conocida.",
        "Si no podés identificar el dominio con seguridad, no inicies sesión, pagues ni entregues datos.",
      ],
      example: {
        lines: [
          "seguridad.banco-ejemplo.com → en este ejemplo, el sitio está bajo banco-ejemplo.com",
          "banco-ejemplo.seguridad-login.com → en este ejemplo, el sitio está bajo seguridad-login.com",
        ],
        note: "La comparación sirve para explicar el concepto, no para crear una regla universal basada en “los últimos dos segmentos”. Existen sufijos públicos compuestos y no hace falta aprender a analizarlos técnicamente: si dudás, entrá por un acceso oficial que ya conocías.",
      },
      whatNotToAssume:
        "Candado o HTTPS no significa sitio legítimo. Un logo correcto, una dirección sin faltas o un diseño profesional tampoco confirman quién controla el sitio.",
      sourceIds: ["AR-01", "TECH-01", "TECH-02"],
    },
    {
      id: "contacto",
      title: "Revisá quién te contacta",
      shortTitle: "Quién te contacta",
      category: "Correo y mensajería",
      whatToLookFor: [
        "La dirección completa del remitente, no solo el nombre visible.",
        "Un número nuevo que dice pertenecer a alguien conocido.",
        "Un pedido inusual de dinero, datos o códigos desde una cuenta conocida.",
        "Una solicitud para compartir un código o escanear un QR de vinculación que no iniciaste.",
      ],
      whyItMatters:
        "El nombre, la foto y el historial visible pueden imitarse. También puede ocurrir que una cuenta real haya sido comprometida y ya no esté bajo control de su dueño.",
      howToCheck: [
        "En correos, desplegá y revisá la dirección completa.",
        "Comparala con el dominio publicado en el sitio oficial o con mensajes legítimos anteriores.",
        "Si dice ser una persona conocida, llamala al número que ya tenías guardado.",
        "No compartas códigos ni vincules otro dispositivo por un pedido inesperado.",
      ],
      example: {
        quote: "Hola, cambié de número. ¿Me transferís y mañana te devuelvo?",
        note: "No intentes confirmar la identidad dentro de ese mismo chat. Contactá el número anterior o consultá a otra persona del círculo.",
      },
      whatNotToAssume:
        "Una foto, un nombre, una forma de escribir conocida o una cuenta usada antes no prueban que la misma persona siga detrás.",
      sourceIds: ["AR-01", "AR-04", "TECH-05"],
    },
    {
      id: "presion",
      title: "Detectá presión antes de decidir",
      shortTitle: "Presión antes de decidir",
      category: "Urgencia y manipulación",
      whatToLookFor: [
        "Plazos como “ahora”, “hoy” o “última oportunidad”.",
        "Amenazas o uso de autoridad: bloqueo, deuda, soporte, banco u organismo.",
        "Premios, ganancias o promociones que exigen actuar primero.",
        "Pedidos de secreto o de no consultar a nadie.",
      ],
      whyItMatters:
        "La urgencia, el miedo, la recompensa y la autoridad pueden reducir el tiempo que te das para comprobar. La presión busca que decidas dentro del mismo canal que hace el pedido.",
      howToCheck: [
        "Separá la urgencia del mensaje de la urgencia real.",
        "Salí de la conversación antes de decidir.",
        "Buscá por tu cuenta el canal oficial y comprobá allí la situación.",
        "Si hay dinero o acceso en juego, consultá a otra persona antes de actuar cuando sea posible.",
      ],
      example: {
        quote:
          "Tenés una deuda. Pagá en los próximos 10 minutos desde este enlace o se suspende tu cuenta.",
        note: "No decidas por el tono. Cerrá el mensaje y revisá la deuda dentro del servicio oficial.",
      },
      whatNotToAssume:
        "La urgencia no prueba fraude. Un tono tranquilo o profesional tampoco prueba legitimidad, y la ausencia de presión no garantiza seguridad.",
      sourceIds: ["AR-02", "AR-03", "INT-01"],
    },
    {
      id: "acciones-sensibles",
      title: "Protegé las acciones sensibles",
      shortTitle: "Acciones sensibles",
      category: "Dinero, códigos y acceso",
      whatToLookFor: [
        "Pedidos inesperados de dinero o de un método de pago específico.",
        "Solicitudes de contraseña, PIN o código de verificación.",
        "Instrucciones para dar control remoto del equipo o vincular otro dispositivo.",
        "Capturas o comprobantes presentados como única prueba de un pago.",
      ],
      whyItMatters:
        "Estas acciones pueden entregar dinero, datos o control de una cuenta. Algunas son difíciles de revertir, por eso necesitan una verificación extra antes de continuar.",
      howToCheck: [
        "Revisá pagos y movimientos dentro de tu propia app bancaria o billetera.",
        "No compartas códigos: aunque los envíe la plataforma real, siguen siendo secretos.",
        "No des acceso remoto ni vincules un dispositivo por un pedido inesperado.",
        "Abrí el servicio oficial por separado antes de iniciar sesión o responder.",
      ],
      example: {
        quote: "Te mandé $80.000 por error. Devolveme $60.000 a este alias.",
        note: "Antes de devolver algo, abrí tu cuenta por tu cuenta y comprobá qué importe se acreditó realmente.",
      },
      whatNotToAssume:
        "Una transferencia, una app de pago o una criptomoneda no implican fraude por sí solas. Un comprobante visual no demuestra que el dinero esté acreditado. Tener segundo factor tampoco vuelve imposible el phishing.",
      sourceIds: ["AR-03", "AR-04", "INT-03"],
    },
    {
      id: "formato",
      title: "No confíes solo en el formato",
      shortTitle: "El formato no alcanza",
      category: "Archivos, QR y publicidad",
      whatToLookFor: [
        "Adjuntos que no esperabas o documentos que piden habilitar contenido activo.",
        "QR que llevan a un inicio de sesión, pago o vinculación de cuenta.",
        "Publicidades con marcas, logos o figuras conocidas.",
        "Promociones extraordinarias que te sacan del flujo normal de compra.",
      ],
      whyItMatters:
        "Un archivo común puede ejecutar acciones si habilitás funciones automáticas. Un QR solo oculta un destino. Y aparecer dentro de una plataforma o como anuncio patrocinado no valida a quien publica.",
      howToCheck: [
        "Confirmá un adjunto inesperado por otro canal antes de abrirlo.",
        "No habilites macros o contenido activo si no sabés exactamente qué hacen.",
        "Después de escanear un QR, revisá el destino antes de ingresar datos o pagar.",
        "Salí del anuncio y buscá a la empresa o comercio por un canal independiente.",
      ],
      example: {
        text: "Ves un anuncio con una figura conocida, una promoción excepcional y un botón para pagar hoy. No uses el anuncio como validación: buscá a la empresa por fuera de la publicidad y revisá el destino antes de continuar.",
      },
      whatNotToAssume:
        "PDF, Word, Excel o QR no significan “seguro”. Un logo, una app conocida, una plataforma popular o un anuncio patrocinado tampoco prueban legitimidad.",
      sourceIds: ["TECH-06", "INT-06", "INT-04"],
    },
    {
      id: "voz-imagen",
      title: "Verificá la identidad aunque reconozcas la voz o la imagen",
      shortTitle: "Voz e imagen",
      category: "IA y suplantación",
      whatToLookFor: [
        "Un pedido inesperado de dinero, datos o códigos.",
        "Urgencia, secreto o indicaciones de no llamar a nadie.",
        "Un cambio de cuenta, número o método de pago.",
        "Una voz, foto o video usados como única prueba de identidad.",
      ],
      whyItMatters:
        "La IA puede imitar o manipular voz, imagen, video y mensajes. Buscar fallas visuales o de audio no es una comprobación confiable: el contenido sintético puede ser convincente y el contenido real también puede tener imperfecciones.",
      howToCheck: [
        "Cortá la comunicación si aparece un pedido sensible.",
        "Llamá al número conocido de la persona.",
        "Si no responde, consultá a otro contacto de confianza.",
        "No envíes dinero ni códigos basándote solo en una llamada, audio o video.",
      ],
      example: {
        quote:
          "Audio con la voz de un familiar: “Me pasó algo, no llames a nadie, transferime ya”.",
        note: "No intentes decidir si “suena a IA”. Contactá a la persona por el número que ya conocías o verificá con alguien cercano.",
      },
      whatNotToAssume:
        "Una voz idéntica, una foto convincente o un video realista no confirman identidad. No detectar fallas tampoco demuestra que el contenido sea real.",
      sourceIds: ["AR-02", "INT-05"],
    },
    {
      id: "argentina",
      title: "Poné los patrones recientes en contexto",
      shortTitle: "Patrones en Argentina",
      category: "Argentina y período",
      whatToLookFor: [
        "Esta selección muestra modalidades documentadas en Argentina. Es ilustrativa y no exhaustiva.",
      ],
      patterns: [
        {
          title: "Suplantación de contactos y pedidos de transferencia",
          modality:
            "Mensajes que aparentan provenir de una persona conocida y toma de cuentas mediante códigos de activación.",
          organizations: "UFECI",
          sourceIds: ["AR-04"],
          geography: "Argentina",
          periodAndContext:
            "reportes recibidos por UFECI durante 2024; no es una encuesta sobre toda la población argentina.",
        },
        {
          title: "Falsos representantes de bancos, billeteras o servicios",
          modality:
            "Llamadas que buscan inducir acciones financieras, instalar acceso remoto o entregar información.",
          organizations: "UFECI",
          sourceIds: ["AR-04"],
          geography: "Argentina",
          periodAndContext: "reportes recibidos por UFECI durante 2024.",
        },
        {
          title: "Phishing que imita organismos y trámites",
          modality:
            "Mensajes sobre multas, citaciones o trámites que aparentan provenir de organismos públicos.",
          organizations: "UFECI",
          sourceIds: ["AR-04"],
          geography: "Argentina",
          periodAndContext: "reportes recibidos por UFECI durante 2024.",
        },
        {
          title: "Inversiones difundidas por redes y mensajería",
          modality:
            "Promesas de ganancias rápidas o seguras, imitación de logos, dominios o figuras públicas y pedidos sucesivos de dinero.",
          organizations: "CNV y MPBA",
          sourceIds: ["AR-05", "AR-06"],
          geography: "Argentina",
          periodAndContext:
            "Advertencia de CNV del 9 de diciembre de 2025 y caso concreto “Fake Coins” informado por MPBA el 27 de mayo de 2026. El caso no mide la frecuencia nacional de esta modalidad.",
        },
      ],
      whyItMatters:
        "Conocer modalidades documentadas ayuda a reconocer cuándo conviene pausar. Las modalidades cambian y una lista histórica no reemplaza la evaluación del contexto ni una comprobación independiente.",
      howToCheck: [
        "Mirá qué organismo documentó el patrón y a qué período se refiere.",
        "No uses el mismo mensaje, número o enlace para confirmar el pedido.",
        "Buscá por tu cuenta el canal oficial de la persona, entidad u organismo.",
        "Si se trata de una inversión, verificá el registro o autorización que corresponda ante CNV antes de transferir.",
      ],
      example: {
        text: "Una publicación promete ganancias rápidas y seguras, usa una figura conocida y lleva a una conversación privada para transferir. Salí de la publicación y consultá la entidad y sus autorizaciones en canales oficiales.",
      },
      whatNotToAssume:
        "Esta selección no establece frecuencia, no ordena modalidades y no es una estimación nacional. El informe de UFECI describe los reportes que recibió durante 2024; un operativo judicial describe un caso concreto. Esta sección es una referencia editorial estática, no un feed, monitoreo ni alerta operativa, y no pretende representar todas las amenazas vigentes.",
      sourceIds: ["AR-04", "AR-05", "AR-06"],
    },
  ],
  checklist: [
    {
      question: "¿Quién me lo pide?",
      prompt: "¿Confirmé la identidad por fuera de este mensaje?",
    },
    {
      question: "¿Adónde me lleva?",
      prompt:
        "¿Revisé el dominio o destino en vez de confiar en el logo, diseño o candado?",
    },
    {
      question: "¿Me están apurando?",
      prompt: "¿Puedo salir del mensaje y comprobar la situación por mi cuenta?",
    },
    {
      question: "¿La acción es sensible?",
      prompt:
        "Dinero, contraseña, código, documento, acceso remoto, descarga o vinculación de cuenta requieren una verificación extra.",
    },
    {
      question: "¿Estoy verificando por una fuente independiente?",
      prompt:
        "App oficial, sitio escrito por vos, número conocido, registro oficial o contacto previo.",
    },
  ],
  checklistClosing:
    "Una señal sola no demuestra fraude. Y que no veas señales tampoco demuestra seguridad. Si la acción puede causar una pérdida o dar acceso a una cuenta, verificá por un canal independiente antes de continuar.",
  closing: {
    title: "¿Tenés una interacción concreta que te genera dudas?",
    body: "Esta guía ofrece orientación general: no evalúa ni certifica mensajes, sitios o personas.",
    prompt:
      "Si tenés un caso real y querés revisarlo con su contenido y contexto, elegí:",
    ctaLabel: "Evaluar una interacción",
    ctaPath: "/evaluar",
    note: "El recorrido de evaluación puede pedirte que inicies sesión. La decisión final sigue siendo tuya.",
  },
  about: {
    title: "Acerca de esta guía y sus fuentes",
    paragraphs: [
      "El contenido fue curado a partir de organismos públicos argentinos e internacionales y documentación técnica confiable.",
      "Las modalidades cambian: una señal aislada no demuestra fraude y la ausencia de señales visibles no garantiza seguridad. La guía se actualiza mediante revisiones editoriales versionadas; no es un servicio de monitoreo ni una fuente de alertas en tiempo real.",
    ],
  },
  sources: [
    {
      id: "AR-01",
      organization: "Argentina.gob.ar / Con Vos en la Web",
      title: "¿Qué es el phishing?",
      date: "Actualización indicada: junio de 2026",
      urls: [
        "https://www.argentina.gob.ar/justicia/convosenlaweb/situaciones/phishing",
      ],
    },
    {
      id: "AR-02",
      organization: "Argentina.gob.ar / Con Vos en la Web",
      title: "¿Qué es la ingeniería social y cómo me protejo?",
      date: "Actualización indicada: junio de 2026",
      urls: [
        "https://www.argentina.gob.ar/justicia/convosenlaweb/situaciones/que-es-la-ingenieria-social-y-como-protegerte",
      ],
    },
    {
      id: "AR-03",
      organization: "Banco Central de la República Argentina",
      title: "¿Cómo prevenir estafas virtuales?",
      urls: ["https://www.bcra.gob.ar/como-prevenir-estafas-virtuales/"],
    },
    {
      id: "AR-04",
      organization: "UFECI / Ministerio Público Fiscal",
      title: "Informe 2024: Casos y modalidades reportadas a UFECI",
      date: "Edición: junio de 2025",
      urls: [
        "https://www.mpf.gob.ar/ufeci/files/2025/06/UFECI_informe_anual_2024-1.pdf",
      ],
    },
    {
      id: "AR-05",
      organization: "Comisión Nacional de Valores",
      title: "Advertencia al público inversor sobre nuevas estafas virtuales",
      date: "9 de diciembre de 2025",
      urls: [
        "https://www.argentina.gob.ar/noticias/advertencia-al-publico-inversor-sobre-nuevas-estafas-virtuales",
      ],
    },
    {
      id: "AR-06",
      organization: "MPBA",
      title:
        "Operativo “Fake Coins”: Estafas de inversión, aplicaciones falsas y criptoactivos ilícitos",
      date: "27 de mayo de 2026",
      urls: ["https://www.mpba.gov.ar/novedad/2672"],
    },
    {
      id: "INT-01",
      organization: "CISA",
      title: "Secure Our World — Phishing Tip Sheet",
      urls: [
        "https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-Phishing-Tip-Sheet.pdf",
      ],
    },
    {
      id: "INT-03",
      organization: "FTC",
      title: "Una manera de detectar estafas: cómo te piden que pagues",
      date: "22 de julio de 2026",
      urls: [
        "https://consumidor.ftc.gov/alertas-para-consumidores/2026/07/una-manera-de-detectar-estafas-como-te-piden-que-pagues",
      ],
    },
    {
      id: "INT-04",
      organization: "FTC",
      title: "Are ads on social media vetted or checked for scams?",
      date: "10 de agosto de 2026",
      urls: [
        "https://consumer.ftc.gov/consumer-alerts/2026/08/are-ads-social-media-vetted-or-checked-scams-heres-what-know",
      ],
    },
    {
      id: "INT-05",
      organization: "FTC",
      title: "Scammers use AI to enhance their family emergency schemes",
      urls: ["https://consumer.ftc.gov/comment/180311"],
    },
    {
      id: "INT-06",
      organization: "FBI",
      title: "Building a Digital Defense Against QR Code Scams",
      date: "19 de septiembre de 2023",
      urls: [
        "https://www.fbi.gov/contact-us/field-offices/elpaso/news/fbi-tech-tuesday-building-a-digital-defense-against-qr-code-scams",
      ],
    },
    {
      id: "TECH-01",
      organization: "Google Chrome",
      title: "Comprobar si la conexión de un sitio es segura",
      urls: ["https://support.google.com/chrome/answer/95617?hl=es"],
    },
    {
      id: "TECH-02",
      organization: "MDN",
      title: "Registrable domain",
      urls: [
        "https://developer.mozilla.org/en-US/docs/Glossary/Registrable_domain",
      ],
    },
    {
      id: "TECH-05",
      organization: "Meta / WhatsApp",
      title: "Meta Launches New Anti-Scam Tools…",
      date: "Marzo de 2026",
      urls: [
        "https://about.fb.com/news/2026/03/meta-launches-new-anti-scam-tools-deploys-ai-technology-to-fight-scammers-and-protect-people/",
      ],
    },
    {
      id: "TECH-06",
      organization: "Microsoft Support",
      title:
        "Enable or disable macros in Microsoft 365 files y How malware can infect your PC",
      urls: [
        "https://support.microsoft.com/en-us/office/vba/enable-or-disable-macros-in-microsoft-365-files",
        "https://support.microsoft.com/en-us/security/how-malware-can-infect-your-pc",
      ],
    },
  ],
};
