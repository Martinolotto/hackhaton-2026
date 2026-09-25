# content-research.md

## Feature 002 — Consultar guía preventiva

**Producto:** guía preventiva pública sobre engaños y riesgos en entornos digitales  
**Estado del documento:** investigación editorial y validación de fuentes; **no es todavía la guía final**  
**Fecha de corte:** 25 de septiembre de 2026  
**Criterio central:** cada bloque futuro debe enseñar una habilidad concreta y aplicable por una persona no técnica.

---

# 1. Metodología de fuentes

## 1.1. Cómo se trató el material recibido

La respuesta previa de Perplexity se utilizó únicamente como **índice de fuentes candidatas**. Sus resúmenes no se consideraron evidencia por sí mismos.

Para una afirmación importante se siguió este orden:

1. volver a la fuente original;
2. identificar qué afirma realmente y en qué contexto;
3. revisar fecha, organismo y alcance;
4. buscar una fuente de mayor autoridad cuando la disponible era comercial, periodística o secundaria;
5. distinguir una **señal de riesgo** de una **prueba de fraude**;
6. evitar trasladar estadísticas o conclusiones fuera de la población a la que se refieren;
7. conservar explícitamente contradicciones y limitaciones.

## 1.2. Jerarquía aplicada

Prioridad editorial:

1. organismos oficiales argentinos;
2. organismos públicos o CERT/CSIRT reconocidos;
3. organismos públicos internacionales;
4. documentación oficial de plataformas y proveedores;
5. documentación técnica especializada;
6. prensa, blogs y material comercial solo como complemento o ejemplo.

La autoridad de una fuente no convierte automáticamente todas sus frases en reglas universales. Una recomendación oficial puede ser correcta en su contexto pero demasiado general para convertirse literalmente en microcopy.

## 1.3. Principios editoriales no negociables

- **Indicador ≠ prueba.**
- **Apariencia legítima ≠ autenticidad.**
- **HTTPS ≠ sitio legítimo.**
- **Ausencia de señales visibles ≠ seguridad.**
- **Una voz, imagen o video convincente ≠ identidad comprobada.**
- **La verificación independiente vale más que seguir comprobando dentro del mismo mensaje.**
- No usar porcentajes sin fuente primaria, población y período.
- No convertir un caso policial o fiscal en una estimación de prevalencia nacional.
- No afirmar que una modalidad “siempre” es fraude salvo que la regla dependa de una política institucional concreta y esté claramente contextualizada.
- La guía debe ayudar a decidir; no reemplazar la decisión humana.

## 1.4. Escala de clasificación

- **A — fuente principal:** base suficientemente sólida para una afirmación central.
- **B — fuente complementaria:** útil para explicar, precisar o respaldar un detalle.
- **C — ejemplo/contexto:** caso o material que ilustra una modalidad sin justificar por sí solo una regla general.
- **DESCARTAR:** duplicado, autoridad innecesariamente baja, afirmaciones no verificadas, fuente superada por una mejor o contenido demasiado débil para el producto.

---

# 2. Auditoría de las 31 fuentes recibidas

| Nº | Fuente del índice | Clasificación | Decisión editorial |
|---:|---|---|---|
| 1 | SixHack Academy — *Fraudulent Domains: Typosquatting and IDN Homograph Attacks* | **B** | Útil para ejemplos de typosquatting, subdominios e IDN. No usar como autoridad principal para HTTPS, dominio registrable o Punycode cuando existen Google Chrome, MDN e ICANN. Su frase “la parte justo antes del TLD” es demasiado simplificada para dominios con sufijos públicos compuestos. |
| 2 | Google Safety Center — consejos de seguridad | **B** | Documentación oficial de plataforma. Útil para revisión de enlaces, remitentes y verificación previa. |
| 3 | CISA — *Recognize and Report Phishing* | **A** | Organismo público especializado. Mantener como fuente internacional principal para señales de phishing y acción segura. |
| 4 | Argentina.gob.ar — *¿Qué es el phishing?* | **A** | Fuente argentina principal. Mantener, pero **no trasladar literalmente** el candado/HTTPS como prueba de legitimidad. |
| 5 | Check Point — email spoofing / Reply-To | **B** | Aporta una explicación técnica válida de `From` y `Reply-To`. El detalle de headers es opcional y probablemente demasiado avanzado para el flujo principal. |
| 6 | INCIBE — phishing | **A** | Organismo público especializado. Buen complemento internacional para correo, enlaces, adjuntos y urgencia. |
| 7 | Argentina.gob.ar — ingeniería social | **A** | Fuente argentina principal para manipulación, canales, suplantación e IA. |
| 8 | CyberGhost — estafas en WhatsApp | **DESCARTAR** | Material comercial. Las reglas útiles pueden respaldarse mejor con Meta/WhatsApp, BCRA, UFECI e INCIBE. |
| 9 | ComputerHoy — código de 6 dígitos de WhatsApp | **DESCARTAR** | Nota periodística secundaria. Reemplazada por documentación oficial de WhatsApp/Meta y patrones observados por UFECI. |
| 10 | Google Safety Center | **DESCARTAR** | **Duplicado de la fuente 2.** |
| 11 | MPBA — Operativo “Fake Coins” | **C** | Fuente oficial y reciente, pero es un caso/investigación concreta. Excelente para la sección argentina y para ilustrar inversiones fraudulentas; no extrapolar como prevalencia general. |
| 12 | iProUP — QR/quishing | **DESCARTAR** | Fuente periodística/especializada. Reemplazada por FBI, FTC y Meta para QR y enlaces. |
| 13 | FTC — formas de pago exigidas por estafadores | **A** | Organismo público. Muy útil si se conserva el contexto: **contacto inesperado + exigencia de un método específico/difícil de revertir**. |
| 14 | MPBA — Fake Coins | **DESCARTAR** | **Duplicado de la fuente 11.** |
| 15 | Okta — OTP | **B** | Definición técnica útil. Para reglas de “no compartir códigos”, priorizar BCRA/Meta; para resistencia al phishing, priorizar NIST. |
| 16 | CEC — ataques a MFA (2021) | **DESCARTAR** | Más antiguo y no necesario. NIST SP 800-63B actual ofrece una fuente primaria mejor sobre OTP y resistencia al phishing. |
| 17 | Privacy Guides — MFA | **B** | Buena explicación independiente, pero NIST y CISA son preferibles para afirmaciones centrales. |
| 18 | Cyber Welfare — adjuntos peligrosos | **DESCARTAR** | Puede ilustrar extensiones, pero Microsoft ofrece documentación oficial más fuerte sobre macros, adjuntos y contenido activo. |
| 19 | Barracuda — *2026 Email Threats Report* | **C** | Puede contextualizar “quishing”, pero es informe comercial. No hace falta para las reglas centrales. |
| 20 | FBI — QR scams | **A** | Organismo público. Fuente principal internacional para explicar que un QR puede llevar a un sitio/pago malicioso y que el QR en sí no prueba legitimidad. |
| 21 | Argentina.gob.ar — ingeniería social | **DESCARTAR** | **Duplicado de la fuente 7.** |
| 22 | ENISA — European Cybersecurity Month / ingeniería social | **B** | Organismo público europeo; útil como marco conceptual, aunque agrega poco frente a fuentes argentinas e INCIBE/CISA. |
| 23 | Argentina.gob.ar — ingeniería social / IA | **DESCARTAR** | **Duplicado de la fuente 7.** |
| 24 | U.S. Bank — deepfake fraud | **C** | Contexto empresarial útil. No usar sus cifras o afirmaciones de cantidad mínima de audio como fundamento principal. |
| 25 | Adaptive Security — estadísticas de deepfakes | **DESCARTAR** | Acumula estadísticas secundarias y comerciales. No usar “2.137%”, “3 segundos = 85%” ni pérdidas agregadas sin volver a la fuente primaria de cada dato. |
| 26 | Yahoo News — clonación de voz | **DESCARTAR** | Nota periodística basada en terceros. FTC ofrece una fuente pública directa para la misma recomendación de llamar a un número conocido. |
| 27 | UFECI — *Informe 2024: Casos y modalidades reportadas a UFECI* | **A** | Fuente argentina principal para patrones observados. Las cifras corresponden a **reportes recibidos por UFECI durante 2024**, no a toda la población argentina ni a 2026. |
| 28 | MPBA — Fake Coins | **DESCARTAR** | **Duplicado de la fuente 11.** |
| 29 | Neuquén Cibersegura — material de phishing | **C** | Oficial provincial y útil como material educativo local, pero contiene simplificaciones absolutas como “los bancos nunca te van a llamar”. No usar esa formulación como regla universal. |
| 30 | CISA — *Recognize and Report Phishing* | **DESCARTAR** | **Duplicado de la fuente 3.** |
| 31 | Que.es citando INCIBE | **DESCARTAR** | Prensa secundaria. Existe material directo de INCIBE, por lo que no aporta fundamento adicional. |

## 2.1. Duplicados detectados

- **2 = 10:** Google Safety Center.
- **3 = 30:** CISA, phishing.
- **7 = 21 = 23:** Argentina.gob.ar, ingeniería social.
- **11 = 14 = 28:** MPBA, “Fake Coins”.

El índice original contiene 31 entradas, pero varias no representan 31 fuentes independientes.

---

# 3. Fuentes seleccionadas y fuentes de reemplazo

Además de las mejores fuentes del índice, se incorporaron fuentes primarias o más fuertes para cubrir huecos.

## A. Argentina — fuentes principales

### AR-01 — Argentina.gob.ar / Con Vos en la Web: Phishing
**Título:** ¿Qué es el phishing?  
**Actualización indicada:** junio de 2026  
**URL:** https://www.argentina.gob.ar/justicia/convosenlaweb/situaciones/phishing

Aporta:
- phishing como ingeniería social;
- remitentes parecidos;
- diferencias pequeñas en URL;
- enlaces y adjuntos;
- revisión del remitente completo;
- no compartir códigos;
- contactar al servicio ante dudas.

**Matiz obligatorio:** la página recomienda revisar candado/HTTPS, pero ese indicador no autentica por sí solo la identidad del sitio.

### AR-02 — Argentina.gob.ar / Con Vos en la Web: Ingeniería social
**Título:** ¿Qué es la ingeniería social y cómo me protejo?  
**Actualización indicada:** junio de 2026  
**URL:** https://www.argentina.gob.ar/justicia/convosenlaweb/situaciones/que-es-la-ingenieria-social-y-como-protegerte

Aporta:
- manipulación;
- suplantación de familiares, soporte y personas de confianza;
- llamadas, mensajería, correo y redes;
- premios/promociones limitadas;
- deepfakes de voz, imagen y video;
- autenticación en dos pasos.

### AR-03 — Banco Central de la República Argentina
**Título:** ¿Cómo prevenir estafas virtuales?  
**URL:** https://www.bcra.gob.ar/como-prevenir-estafas-virtuales/

Aporta:
- contacto por correo, llamadas, mensajes, redes y sitios falsos;
- no actuar bajo presión;
- entrar al sitio oficial escribiendo la dirección o usando la app oficial;
- no compartir contraseñas ni códigos por canales de soporte no verificados;
- activar doble factor;
- comprobar pagos en la propia cuenta antes de entregar productos o devolver dinero;
- contactar inmediatamente al proveedor financiero por canales oficiales ante una operación sospechosa.

### AR-04 — UFECI / Ministerio Público Fiscal
**Título:** Informe 2024 — Casos y modalidades reportadas a UFECI  
**Edición:** junio de 2025  
**URL:** https://www.mpf.gob.ar/ufeci/files/2025/06/UFECI_informe_anual_2024-1.pdf

Aporta evidencia observacional argentina:
- 34.468 reportes recibidos por UFECI en 2024;
- 21,1% más reportes que en 2023;
- aumento de transferencias voluntarias inducidas luego de mensajes de WhatsApp que aparentan provenir de conocidos;
- llamadas de falsos representantes de bancos, billeteras o servicios;
- uso de códigos de activación de WhatsApp para tomar cuentas;
- phishing también asociado a organismos públicos, multas, citaciones y trámites.

**Limitación:** población = personas/casos que llegaron a UFECI. No permite estimar “qué porcentaje de argentinos sufre X” ni afirmar que el patrón de 2024 es el dominante en septiembre de 2026.

### AR-05 — Comisión Nacional de Valores
**Título:** Advertencia al público inversor sobre nuevas estafas virtuales  
**Fecha:** 9 de diciembre de 2025  
**URL:** https://www.argentina.gob.ar/noticias/advertencia-al-publico-inversor-sobre-nuevas-estafas-virtuales

Aporta:
- publicaciones y contactos por redes/mensajería;
- promesas de ganancias rápidas y seguras;
- imitación de logos, nombres, dominios y diseños;
- uso de figuras públicas;
- transferencias sucesivas bajo pretextos;
- verificación de registro/autorización en CNV.

### AR-06 — MPBA
**Título:** Operativo “Fake Coins”: Estafas de inversión, aplicaciones falsas y criptoactivos ilícitos  
**Fecha:** 27 de mayo de 2026  
**URL:** https://www.mpba.gov.ar/novedad/2672

Uso recomendado: **caso reciente**, no regla general. Ilustra investigaciones argentinas en las que la captación comenzó con publicaciones o contactos que prometían ganancias rápidas y seguras.

## B. Fuentes públicas internacionales

### INT-01 — CISA
**Recurso:** Secure Our World — Phishing Tip Sheet  
**URL:** https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-Phishing-Tip-Sheet.pdf

Aporta:
- lenguaje urgente/emocional;
- URL acortada no confiable;
- dirección de correo que no coincide;
- pedidos de información personal/financiera;
- adjuntos inesperados;
- reportar a la organización usando el contacto obtenido desde su propio sitio.

### INT-02 — INCIBE
**Tema:** Phishing / fraudes en mensajería  
**URLs:**
- https://www.incibe.es/aprendeciberseguridad/phishing
- https://www.incibe.es/ciudadania/blog/principales-fraudes-en-redes-sociales-y-whatsapp

Aporta:
- enlaces y adjuntos;
- urgencia y emociones;
- suplantación;
- verificación por otro canal;
- variaciones pequeñas en direcciones web.

### INT-03 — FTC: métodos de pago
**Título:** Una manera de detectar estafas: cómo te piden que pagues  
**Fecha:** 22 de julio de 2026  
**URL:** https://consumidor.ftc.gov/alertas-para-consumidores/2026/07/una-manera-de-detectar-estafas-como-te-piden-que-pagues

Aporta:
- contexto de contacto inesperado;
- exigencia de un único método como transferencia, cripto, app de pago o gift card;
- dificultad de recuperación;
- comprobar a la persona/empresa antes de enviar.

### INT-04 — FTC: publicidad en redes
**Título:** Are ads on social media vetted or checked for scams?  
**Fecha:** 10 de agosto de 2026  
**URL:** https://consumer.ftc.gov/consumer-alerts/2026/08/are-ads-social-media-vetted-or-checked-scams-heres-what-know

Aporta:
- aparecer como anuncio dentro de una red social no prueba legitimidad;
- un anuncio puede imitar marcas;
- conviene investigar a la empresa antes de comprar a partir del anuncio.

### INT-05 — FTC: clonación de voz
**Título:** Scammers use AI to enhance their family emergency schemes  
**URL:** https://consumer.ftc.gov/comment/180311

Aporta:
- una muestra corta de audio puede servir para imitar una voz;
- no confiar en la voz como prueba;
- llamar a un número ya conocido de la persona;
- usar otro familiar/contacto si no se la puede localizar.

No se incorpora ningún número exacto de “segundos necesarios” porque no hace falta para enseñar la habilidad y las cifras secundarias encontradas no mejoran la decisión.

### INT-06 — FBI: QR
**Título:** FBI Tech Tuesday: Building a Digital Defense Against QR Code Scams  
**Fecha:** 19 de septiembre de 2023  
**URL:** https://www.fbi.gov/contact-us/field-offices/elpaso/news/fbi-tech-tuesday-building-a-digital-defense-against-qr-code-scams

Aporta:
- el QR puede dirigir a web o portal de pago;
- un QR puede llevar a un destino malicioso;
- sospechar si, luego de escanear, se piden credenciales;
- evitar QR recibidos por correo/SMS si no se confirmó legitimidad.

### INT-07 — NIST SP 800-63B
**URL:** https://pages.nist.gov/800-63-4/sp800-63b.html

Aporta:
- MFA no es una categoría homogénea;
- OTP y otros códigos que se ingresan manualmente **no son resistentes al phishing** porque pueden ser capturados y retransmitidos;
- existen métodos criptográficos resistentes al phishing.

Para la guía pública no hace falta enseñar AAL, FIDO o protocolos; el valor editorial es evitar el mensaje falso “tener un código vuelve imposible el phishing”.

## C. Documentación oficial de plataformas/proveedores

### TECH-01 — Google Chrome
**Título:** Comprobar si la conexión de un sitio es segura  
**URL:** https://support.google.com/chrome/answer/95617?hl=es

Aporta el matiz clave:
- el indicador de conexión segura describe la privacidad de la conexión;
- incluso con conexión segura hay que comprobar el nombre del sitio en la barra de direcciones.

### TECH-02 — MDN
**Título:** Registrable domain  
**URL:** https://developer.mozilla.org/en-US/docs/Glossary/Registrable_domain

Aporta:
- un dominio registrable se define respecto del **effective top-level domain**;
- no siempre puede enseñarse correctamente como “la palabra justo antes del último punto”;
- ejemplos como `.ac.uk` muestran por qué una regla manual simplificada puede fallar.

### TECH-03 — ICANN
**Tema:** Internationalized Domain Names / A-label  
**URLs:**
- https://www.icann.org/resources/idn
- https://www.icann.org/en/icann-acronyms-and-terms/a-label-en

Aporta:
- los IDN permiten caracteres de distintos alfabetos;
- su forma ASCII puede representarse como A-label con prefijo `xn--` y Punycode.

**Uso editorial:** avanzado y secundario. Solo mostrar “Punycode” si la interfaz explica antes para qué sirve. `xn--` no significa por sí solo “fraude”.

### TECH-04 — Meta / WhatsApp
**Título:** New WhatsApp Tools and Tips to Beat Messaging Scams  
**Fecha:** 5 de agosto de 2025  
**URL:** https://about.fb.com/news/2025/08/new-whatsapp-tools-tips-beat-messaging-scams/

Aporta:
- pausar, cuestionar y verificar;
- si alguien dice ser un familiar/amigo, contactar directamente por otro medio;
- dinero rápido, gift cards, PIN, presión para actuar como posibles señales.

### TECH-05 — Meta / WhatsApp
**Tema:** advertencias de vinculación de dispositivos  
**Fecha:** marzo de 2026  
**URL:** https://about.fb.com/news/2026/03/meta-launches-new-anti-scam-tools-deploys-ai-technology-to-fight-scammers-and-protect-people/

Aporta:
- un estafador puede intentar que la persona comparta un código de vinculación o escanee un QR que vincule otro dispositivo a su cuenta.

### TECH-06 — Microsoft Support
**Temas:** macros y malware  
**URLs:**
- https://support.microsoft.com/en-us/office/vba/enable-or-disable-macros-in-microsoft-365-files
- https://support.microsoft.com/en-us/security/how-malware-can-infect-your-pc

Aporta:
- algunas macros pueden introducir malware;
- no habilitar macros/contenido activo si no se sabe qué hacen;
- no es necesario habilitar macros solo para ver o editar un documento;
- un adjunto inesperado sigue siendo riesgoso aunque parezca provenir de alguien conocido.

---

# 4. Fuentes descartadas y afirmaciones que no deben pasar a producto

## 4.1. Estadísticas no aprobadas para uso

No incorporar por ahora:

- “los intentos con deepfakes crecieron 2.137% en tres años”;
- “3 segundos de audio alcanzan para 85% de similitud”;
- “pérdidas por deepfakes superiores a USD 1,28 mil millones”;
- cualquier cifra de U.S. Bank, Adaptive Security, Yahoo/NordVPN o prensa que no haya sido rastreada hasta su fuente primaria exacta.

No son necesarias para enseñar la habilidad principal: **una voz convincente ya no alcanza como prueba de identidad; verificar por un canal conocido**.

## 4.2. Formulaciones demasiado fuertes

### “Si tiene HTTPS/candado, es seguro”
**No usar.**  
HTTPS protege la conexión; no prueba que la organización detrás del sitio sea quien la persona cree.

### “La parte real del dominio es siempre la que está justo antes del TLD”
**No usar como regla universal.**  
Los sufijos públicos pueden ser compuestos. Una explicación correcta requiere el concepto de `effective TLD`. Para público general conviene enseñar con ejemplos concretos y, en producto, resaltar visualmente el dominio relevante.

### “Un banco nunca te llama”
**No usar.**  
Es una simplificación de algunas campañas educativas. La regla útil es: una llamada entrante no prueba identidad; ante una acción sensible, cortar y volver por un canal oficial conocido.

### “Ningún servicio legítimo solicita datos por email”
**No usar.**  
Es demasiado absoluto. La guía debe enfocarse en solicitudes inesperadas de contraseñas, códigos, datos financieros o acciones sensibles, y en verificar por canal independiente.

### “Si te piden pagar por transferencia/cripto/app/gift card, es fraude”
**No usar sin contexto.**  
La FTC formula la señal en un escenario de **contacto inesperado** donde la persona exige que solo se pague mediante un método específico. Transferencias y cripto también tienen usos legítimos.

### “`xn--` significa sitio malicioso”
**No usar.**  
`xn--` identifica una representación ASCII de un dominio internacionalizado. Puede ser totalmente legítimo. Solo justifica revisar con más cuidado si el nombre esperado no coincide.

### “Errores ortográficos = phishing”
**No usar como prueba.**  
Pueden ser una señal, pero CISA señala que los errores de redacción son hoy menos constantes. Además, la IA facilita mensajes gramaticalmente correctos.

---

# 5. Contradicciones y matices validados

## 5.1. Candado / HTTPS

**Argentina.gob.ar** recomienda comprobar candado y HTTPS dentro de sus medidas contra phishing.  
**Google Chrome** aclara que el símbolo indica que la información viaja de manera privada entre la persona y el sitio y que, aun así, se debe revisar el nombre del sitio.

### Decisión editorial
Conservar ambas ideas:

> HTTPS es mejor que una conexión sin cifrar, pero **no demuestra que el sitio pertenezca a la organización que aparenta representar**.

No presentar la recomendación argentina como incorrecta; presentar su límite.

## 5.2. MFA / códigos

Hay consenso en recomendar MFA. Sin embargo, **NIST** distingue métodos: un OTP escrito manualmente puede ser capturado por una página falsa y retransmitido.

### Decisión editorial
La guía puede decir:

> Activar el segundo factor ayuda a proteger la cuenta, pero un código de verificación sigue siendo secreto. Si una persona o página falsa consigue que lo ingreses o se lo compartas, puede intentar usarlo.

No hace falta enseñar una clasificación técnica de todos los métodos MFA en esta feature.

## 5.3. Calidad del texto de un mensaje

Fuentes educativas antiguas o generales destacan errores gramaticales. CISA los mantiene como señal, pero los califica como **menos comunes**; Argentina.gob.ar además reconoce que IA puede producir mensajes más convincentes.

### Decisión editorial
La mala redacción puede sumar sospecha. La buena redacción **no suma autenticidad**.

## 5.4. Identidad aparente

Nombre visible, foto, logo, voz, video, número o diseño pueden ser falsificados o reutilizados.

### Decisión editorial
La interfaz debe repetir una idea transversal:

> Ver lo esperado no prueba quién está detrás. Cuando la acción tiene costo —dinero, acceso, código, descarga o datos— verificá por un canal independiente.

---

# 6. Matriz de conocimiento validado por tema

## 6.1. Revisar un enlace o sitio web

### Conocimiento respaldado
- Un sitio puede imitar visualmente a otro y usar una dirección parecida.
- En una URL, un nombre de marca al principio no prueba que ese sea el dominio controlado por la marca.
- HTTPS indica una conexión protegida; no autentica por sí solo a la organización esperada.
- Los dominios registrables no se pueden explicar correctamente con la regla simplista “últimas dos palabras separadas por punto” en todos los casos.
- Los IDN pueden contener caracteres de otros alfabetos y tener una representación Punycode `xn--`; esto es legítimo como tecnología y solo debe tratarse como motivo de revisión si el dominio no coincide con lo esperado.

### Señales observables
- letras faltantes, cambiadas o agregadas;
- nombre de marca situado en una parte secundaria de la dirección;
- dominio que no coincide con el conocido;
- enlace recibido por mensaje en una operación sensible;
- URL acortada que oculta el destino;
- `xn--` cuando la persona esperaba un dominio simple en alfabeto latino.

### Acciones concretas
1. Mirar la barra de direcciones, no solo el diseño de la página.
2. Comparar el nombre con una referencia confiable.
3. Para bancos, billeteras, organismos o cuentas importantes: evitar entrar desde el enlace recibido y abrir la app oficial, un marcador guardado o escribir la dirección conocida.
4. Si el dominio no puede identificarse con seguridad, no continuar con login, pago o entrega de datos.

### Qué NO permite concluir
- “Tiene candado” ≠ legítimo.
- “Tiene el logo correcto” ≠ legítimo.
- “No tiene faltas” ≠ seguro.
- `xn--` ≠ malicioso.

### Ejemplo simple
```text
seguridad.banco-ejemplo.com
→ el sitio está bajo banco-ejemplo.com

banco-ejemplo.seguridad-login.com
→ el nombre que controla el sitio es seguridad-login.com
```

**Nota editorial:** el ejemplo sirve para `.com`. No convertirlo en una regla universal para todos los sufijos de Internet.

### Fuentes exactas
AR-01, AR-03, INT-01, TECH-01, TECH-02, TECH-03.

---

## 6.2. Revisar un correo

### Conocimiento respaldado
- El nombre visible del remitente puede no corresponder con su dirección real.
- Los atacantes pueden usar direcciones parecidas a las legítimas.
- Un mensaje puede contener enlaces, formularios o adjuntos como parte del engaño.
- Urgencia, pedidos de datos y adjuntos inesperados son señales revisables.
- La ausencia de errores ortográficos no autentica un correo.

### Señales observables
- dirección completa que no coincide con la organización;
- cambios mínimos en el dominio;
- pedido inesperado de contraseña, código o datos financieros;
- enlace cuyo destino no coincide con el texto visible;
- adjunto inesperado;
- presión para actuar antes de verificar.

### Acciones concretas
1. Expandir y revisar la dirección completa del remitente.
2. Compararla con mensajes legítimos anteriores o con el dominio publicado en el sitio oficial.
3. No usar el enlace del mensaje si la acción es sensible.
4. Abrir la app/sitio oficial por separado.
5. Ante un adjunto inesperado, confirmar primero con el remitente por otro canal.

### Qué NO permite concluir
- Nombre y logo correctos ≠ correo auténtico.
- Buena ortografía ≠ correo auténtico.
- Haber recibido antes mensajes reales de esa marca ≠ este mensaje es real.

### Ejemplo simple
```text
Nombre visible: Banco Ejemplo
Dirección: seguridad@banco-ejemplo-ayuda.net
```
El nombre visible dice poco. La dirección completa debe comprobarse.

### Fuente opcional avanzada
Check Point permite explicar `Reply-To`, pero no se recomienda mostrarlo en el flujo inicial salvo que la UI tenga un modo “ver detalles técnicos”.

### Fuentes exactas
AR-01, INT-01, INT-02, TECH-06; Check Point como B.

---

## 6.3. Revisar mensajes y suplantaciones

### Conocimiento respaldado
- Los estafadores pueden hacerse pasar por familiares, personas conocidas, soporte, bancos, billeteras, organismos o empresas.
- Una cuenta real también puede estar comprometida.
- En reportes recibidos por UFECI durante 2024 se observaron mensajes de WhatsApp que aparentaban provenir de conocidos y llevaban a transferencias voluntarias.
- Códigos de activación o vinculación pueden permitir tomar o vincular una cuenta.
- Verificación por otro canal rompe el supuesto de identidad.

### Señales observables
- número nuevo con historia de “cambié de teléfono”;
- pedido inesperado de dinero;
- código que la persona no inició;
- solicitud de escanear un QR o compartir un código para “verificar” algo;
- solicitud inusual desde una cuenta conocida;
- intento de mover la conversación a otra plataforma antes de pagar.

### Acciones concretas
1. No asumir identidad por foto, nombre o historial del chat.
2. Llamar o escribir al número que ya estaba guardado.
3. Si no responde, confirmar con otra persona del círculo.
4. No compartir códigos recibidos por SMS/app.
5. No escanear un QR para vincular una cuenta si no se inició deliberadamente esa acción.

### Qué NO permite concluir
- “Me escribió desde su cuenta de siempre” ≠ sigue teniendo control de la cuenta.
- Foto y forma de hablar correctas ≠ identidad confirmada.
- Un código legítimo enviado por la propia plataforma ≠ debe compartirse.

### Ejemplo simple
> “Hola, cambié de número. ¿Me transferís y mañana te devuelvo?”

Respuesta preventiva: no discutir dentro del mismo chat; contactar al número conocido o a otro canal previo.

### Fuentes exactas
AR-02, AR-03, AR-04, TECH-04, TECH-05, INT-02.

---

## 6.4. Presión, urgencia y manipulación

### Conocimiento respaldado
- La ingeniería social busca modificar decisiones a través de confianza, miedo, urgencia, recompensa o autoridad.
- Premios/promociones limitadas, amenazas o problemas supuestamente inmediatos aparecen repetidamente en fuentes oficiales.
- La presión reduce el tiempo disponible para una verificación independiente.

### Señales observables
- “ahora o perdés la oportunidad”;
- “no le cuentes a nadie”;
- “tu cuenta se bloquea hoy”;
- “ganaste, pero primero…”;
- “soy soporte / banco / autoridad, seguí estos pasos ya”;
- una acción irreversible presentada como única salida.

### Acciones concretas
1. Separar **urgencia del mensaje** de **urgencia real**.
2. No decidir dentro del mismo canal que introduce la presión.
3. Buscar el canal oficial por cuenta propia.
4. Si hay dinero o acceso en juego, consultar a otra persona antes de actuar cuando sea posible.

### Qué NO permite concluir
- Urgencia ≠ fraude automáticamente.
- Un tono tranquilo/profesional ≠ legitimidad.
- Falta de presión ≠ seguridad.

### Ejemplo simple
> “Tenés una deuda. Pagá en los próximos 10 minutos desde este enlace o se suspende tu cuenta.”

La habilidad no es “detectar si miente por cómo escribe”; es salir del mensaje y comprobar la deuda dentro del servicio oficial.

### Fuentes exactas
AR-02, AR-03, INT-01, INT-02, TECH-04.

---

## 6.5. Pagos, códigos y acciones sensibles

### Conocimiento respaldado
- Un pedido de dinero inesperado merece verificación previa.
- Exigir un único método de pago difícil de revertir es una señal fuerte en el contexto de contactos inesperados.
- Los códigos de verificación deben tratarse como secretos.
- Antes de entregar un producto o devolver dinero, conviene verificar la acreditación dentro de la propia cuenta.
- MFA ayuda, pero OTP ingresado manualmente no es técnicamente resistente al phishing.

### Señales observables
- transferencia urgente;
- cripto/gift card/app de pago como única opción;
- pedido de PIN/código;
- “te transferí de más, devolveme” sin que el dinero aparezca realmente en la cuenta;
- pantalla o comprobante enviado por la otra persona como única evidencia de pago.

### Acciones concretas
1. Verificar el saldo/movimiento dentro de la propia app bancaria o billetera.
2. No basarse en una captura o comprobante enviado.
3. No compartir códigos.
4. Si el pedido llegó inesperadamente, confirmar identidad y motivo por otro canal.
5. Ante fraude u operación no reconocida, contactar al proveedor financiero cuanto antes por su canal oficial.

### Qué NO permite concluir
- Transferencia o cripto ≠ fraude por definición.
- Tener MFA ≠ imposible caer en phishing.
- Comprobante visual ≠ dinero acreditado.

### Ejemplo simple
> “Te mandé $80.000 por error. Devolveme $60.000 a este alias.”

Antes de cualquier devolución: abrir la cuenta por cuenta propia y comprobar qué importe se acreditó realmente.

### Fuentes exactas
AR-03, INT-03, INT-07, TECH-04.

---

## 6.6. Archivos, QR y descargas

### Conocimiento respaldado
- Un archivo adjunto inesperado puede contener contenido malicioso.
- Macros/contenido activo pueden ejecutar acciones; Microsoft recomienda no habilitarlos si no se conoce exactamente qué hacen.
- No hace falta activar macros solamente para leer o editar un documento corriente.
- Un QR es un contenedor de datos/destino, no un sello de legitimidad.
- Un QR puede llevar a un sitio falso, portal de pago o flujo de vinculación de una cuenta.

### Señales observables
- archivo que no se esperaba;
- documento que exige “Habilitar contenido/macros”;
- QR recibido en mensaje no solicitado;
- QR que lleva a login o pedido de credenciales;
- solicitud de escanear un QR para “verificar” la cuenta;
- destino mostrado por el teléfono que no coincide con la organización esperada.

### Acciones concretas
1. Confirmar el adjunto antes de abrirlo si no se esperaba.
2. No habilitar macros solo porque el documento lo solicita.
3. Ver el destino del QR antes de continuar, cuando el dispositivo lo muestre.
4. Aplicar al destino del QR las mismas reglas que a cualquier enlace.
5. Para pagos, verificar comercio/destinatario dentro de la app antes de confirmar.

### Qué NO permite concluir
- PDF/Word/Excel ≠ seguro por ser un formato común.
- QR impreso ≠ legítimo.
- QR dentro de una app o correo conocido ≠ legítimo automáticamente.

### Ejemplo simple
Un QR pegado sobre una cartelería puede llevar a un destino distinto del que la persona espera. La comprobación relevante ocurre **después de escanear y antes de ingresar datos o pagar**.

### Fuentes exactas
TECH-06, INT-06, TECH-05, AR-03.

---

## 6.7. Publicidad, promociones e inversiones

### Conocimiento respaldado
- La presencia de un anuncio dentro de una red social no prueba que el anunciante sea legítimo.
- Estafadores pueden imitar marcas y utilizar publicidad o publicaciones.
- CNV ha advertido sobre ofertas difundidas por redes y mensajería con promesas de altas ganancias y aparentes respaldos.
- Logos, diseños o imágenes de figuras públicas pueden formar parte de la apariencia del fraude.
- En inversiones reguladas, debe comprobarse si corresponde registro/autorización ante CNV.

### Señales observables
- ganancia “rápida”, “segura” o “garantizada”;
- presión para invertir ahora;
- sucesivos pagos para “impuesto”, “tasa”, “liberación” o “desbloqueo”;
- figura pública usada como autoridad;
- plataforma o asesor sin verificación en registro oficial;
- precio/promoción extraordinaria que obliga a salir del flujo normal de compra.

### Acciones concretas
1. No usar la existencia del anuncio como validación.
2. Buscar a la empresa por fuera del anuncio.
3. En inversiones, consultar los registros/alertas de CNV cuando corresponda.
4. Verificar la URL y no transferir a contactos/cuentas no verificados.
5. Buscar antecedentes y quejas como señal complementaria, sin asumir que “no encontrar quejas” valida el negocio.

### Qué NO permite concluir
- Anuncio pagado ≠ empresa verificada.
- Famoso en el video ≠ respaldo real.
- App disponible en una tienda ≠ inversión legítima.
- Alta rentabilidad ≠ fraude automáticamente; “garantizada, rápida, sin riesgo” sí amerita verificación fuerte.

### Ejemplo simple
> Video con una figura conocida + “rentabilidad garantizada” + botón “invertí hoy”.

Habilidad: salir del anuncio, buscar la entidad por nombre en canales oficiales y verificar su situación antes de transferir.

### Fuentes exactas
AR-05, AR-06 como contexto, INT-04, AR-03.

---

## 6.8. IA, deepfakes y clonación de voz

### Conocimiento respaldado
- IA puede generar o manipular voz, imagen, video y mensajes.
- Una voz puede ser imitada a partir de muestras de audio disponibles.
- La calidad del contenido sintético puede volver poco confiable una evaluación basada solo en “parece real”.
- La verificación debe apoyarse en un canal o dato independiente.

### Señales observables
Las anomalías visuales o de voz **pueden existir**, pero no deben ser la habilidad central porque:
- pueden desaparecer con mejores herramientas;
- una persona no técnica puede no detectarlas;
- contenido real también puede tener fallas de audio/video.

### Acciones concretas
1. Si hay un pedido sensible, no confiar solo en voz/video.
2. Cortar y llamar al número conocido.
3. Si no se logra contacto, consultar a otra persona de confianza.
4. No enviar dinero/códigos basándose únicamente en una llamada, audio o video inesperado.
5. Evaluar el contexto: urgencia, secreto, cambio de cuenta, método de pago y pedido inusual.

### Qué NO permite concluir
- Voz idéntica ≠ persona auténtica.
- Video realista ≠ identidad autenticada.
- “No veo fallas de IA” ≠ contenido real.
- Un detector automático de deepfakes ≠ certeza absoluta.

### Ejemplo simple
> Audio con la voz de un familiar: “Me pasó algo, no llames a nadie, transferime ya”.

La respuesta útil es verificar a la persona por su número conocido o mediante alguien cercano, no intentar “escuchar si la IA respira raro”.

### Fuentes exactas
AR-02, INT-05, TECH-04.

---

## 6.9. Patrones recientes observados en Argentina

### Encabezado editorial recomendado
**Patrones observados recientemente en Argentina**  
**Actualizado: septiembre de 2026**

### Patrón A — Suplantación de contactos y transferencias
UFECI describió en su informe 2024 un crecimiento gradual de transferencias voluntarias luego de mensajes de WhatsApp que aparentaban provenir de una persona conocida, así como toma de cuentas mediante códigos de activación.

**Contexto obligatorio:** son modalidades presentes en reportes recibidos por UFECI en 2024.

### Patrón B — Falsos representantes de bancos/billeteras/servicios
UFECI describió llamadas con excusas como autorizar compras o “verificar seguridad”, en algunos casos buscando instalar software de acceso remoto o inducir acciones financieras.

BCRA mantiene en 2026 una guía que alerta sobre falsos llamados/mensajes de bancos, billeteras, organismos y servicios.

### Patrón C — Phishing que imita organismos y trámites
UFECI observó durante 2024 campañas que simulaban multas, citaciones o trámites vinculados a organismos públicos, además de las campañas bancarias.

### Patrón D — Inversiones difundidas por redes y mensajería
CNV advirtió en diciembre de 2025 sobre esquemas con promesas de ganancias rápidas/seguras, logos o dominios imitativos y figuras públicas.

En mayo de 2026, MPBA informó el operativo “Fake Coins”, investigación de un conjunto de hechos con modalidades similares iniciadas mediante publicaciones/contactos con promesas de ganancias rápidas y seguras.

### Qué NO permite concluir
- No prueba que estas sean “las cuatro estafas más comunes de Argentina en 2026”.
- El informe UFECI 2024 no es una encuesta nacional.
- Un operativo judicial no mide prevalencia.
- Las modalidades cambian.

### Fuente exacta y fecha
AR-03, AR-04, AR-05, AR-06.

---

## 6.10. Verificación independiente

### Conocimiento respaldado
La acción transversal más sólida de las fuentes es **salir del canal que hizo el pedido** y comprobar la identidad o situación por un medio obtenido independientemente.

### Acciones concretas
Según el caso:
- abrir la app oficial;
- escribir una dirección conocida;
- usar un marcador propio;
- llamar al número guardado previamente;
- obtener el teléfono desde el sitio oficial;
- consultar un registro oficial;
- preguntar a otro familiar/contacto;
- comprobar el movimiento dentro de la propia cuenta.

### Qué NO es verificación independiente
- responder al mismo mensaje “¿sos vos?”;
- llamar al número que viene dentro del mensaje sospechoso;
- tocar otro enlace enviado por el mismo remitente;
- confiar en otra captura enviada por esa persona;
- preguntar al supuesto soporte si el supuesto soporte es real.

### Ejemplo simple
Mensaje: “Tu banco bloqueó la cuenta. Llamá al 0800 de este SMS.”

Verificación independiente:
1. cerrar el SMS;
2. abrir la app bancaria o el sitio escrito por cuenta propia;
3. obtener desde allí el canal oficial;
4. consultar el estado real.

### Fuentes exactas
AR-03, INT-01, INT-02, INT-05, TECH-04.

---

## 6.11. Checklist rápido antes de actuar

Este checklist debe funcionar como una **pausa de decisión**, no como detector.

### Propuesta validada

**Antes de pagar, iniciar sesión, compartir un código, descargar o enviar datos:**

1. **¿Quién me lo pide?**  
   ¿Confirmé la identidad por fuera de este mensaje?

2. **¿A dónde me lleva?**  
   ¿Revisé el dominio/destino en vez de confiar en logo, diseño o candado?

3. **¿Me están apurando?**  
   ¿Puedo salir del mensaje y comprobar la situación por mi cuenta?

4. **¿La acción es sensible?**  
   Dinero, contraseña, código, documento, acceso remoto, descarga o vinculación de cuenta requieren una verificación extra.

5. **¿Estoy comprobando en una fuente independiente?**  
   App oficial, sitio escrito por mí, número conocido, registro oficial o contacto previo.

### Cierre recomendado
> Una señal sola no demuestra fraude. Y que no veas señales tampoco demuestra seguridad. Si la acción puede causar una pérdida o dar acceso a una cuenta, verificá por un canal independiente antes de continuar.

### Fuentes exactas
Síntesis de AR-01, AR-02, AR-03, INT-01, TECH-04.

---

# 7. Estructura editorial recomendada para la guía final

La guía no debería copiar la matriz de investigación completa. Se recomienda una capa editorial más corta y orientada a acción.

## Estructura global

### Introducción breve
**Objetivo:** “No necesitás adivinar si algo es una estafa. Podés revisar señales y verificar antes de actuar.”

Aclaración:
- una señal no es prueba;
- la guía no certifica sitios, personas ni mensajes;
- las modalidades cambian.

## Bloques principales

1. **Revisá a dónde te lleva**
   - dominio y URL;
   - HTTPS como conexión, no identidad;
   - enlace recibido vs acceso independiente.

2. **Revisá quién te contacta**
   - correo;
   - mensajería;
   - cuenta conocida comprometida.

3. **Detectá presión antes de decidir**
   - urgencia;
   - autoridad;
   - premio;
   - secreto;
   - oportunidad limitada.

4. **Protegé acciones sensibles**
   - pagos;
   - códigos;
   - login;
   - datos;
   - acceso remoto.

5. **No confíes en el formato**
   - adjuntos;
   - QR;
   - publicidad;
   - apps/plataformas;
   - logos.

6. **Voz e imagen ya no prueban identidad**
   - IA/deepfakes;
   - verificación externa.

7. **Patrones observados en Argentina**
   - bloque fechado;
   - 3–4 patrones;
   - fuente/contexto;
   - sin ranking.

8. **Checklist antes de actuar**
   - cinco preguntas.

## Plantilla para cada bloque

### TÍTULO
Una habilidad, no una categoría abstracta.

### Qué mirar
2–4 indicadores visibles.

### Por qué importa
Una frase que conecte señal con riesgo.

### Cómo comprobarlo
2–4 pasos concretos.

### Ejemplo
Una situación cotidiana.

### Qué no asumir
Una frase de límite.

### Fuente/s
1–3 fuentes fuertes, no una lista exhaustiva.

---

# 8. Contenido potencial de UI

## 8.1. Tarjeta interactiva de URL

**Título:** “Encontrá el dominio que realmente importa”

Visual:
```text
seguridad.[banco-ejemplo.com]
[banco-ejemplo].seguridad-login.com
                [seguridad-login.com]
```

Microcopy:
> El nombre de una marca puede aparecer en una parte de la dirección sin controlar el sitio.

Callout:
> El candado/HTTPS protege la conexión. No confirma por sí solo quién es el dueño del sitio.

**No agregar una regla automatizada simplista para `.com.ar`, `.gob.ar`, `.co.uk`, etc. sin usar una lista de sufijos públicos o un parser adecuado.**

## 8.2. Tarjeta “salí del mensaje”

CTA editorial:
**Verificá por otro canal**

Ejemplos por contexto:
- banco → abrir la app;
- familiar → llamar al número guardado;
- organismo → escribir el sitio oficial;
- inversión → consultar CNV;
- comercio → comprobar el pago en la propia cuenta.

## 8.3. Chip transversal “Esto no prueba”

Pequeño bloque repetible:

> **Esto no prueba autenticidad:** logo, foto, candado, nombre visible, buena ortografía, voz conocida o anuncio patrocinado.

Evitar mostrar demasiados elementos de una vez; seleccionar el que corresponda al bloque.

## 8.4. Tarjeta de acción sensible

**Antes de continuar, verificá si te piden:**
- dinero;
- contraseña;
- código;
- documento;
- acceso remoto;
- descarga;
- vincular otro dispositivo.

No etiquetar automáticamente como fraude. Etiqueta sugerida:
**“Requiere verificación extra”**.

## 8.5. Tarjeta QR

Flujo:
1. escanear no equivale a confiar;
2. ver el destino;
3. revisar la dirección;
4. comprobar destinatario/contexto;
5. recién después pagar o iniciar sesión.

## 8.6. Tarjeta IA

**Título:** “¿Reconocés la voz? Igual verificá.”

Texto:
> Una voz o imagen puede ser imitada. Si te piden dinero, un código o una acción urgente, contactá a la persona por un número o canal que ya conocías.

## 8.7. Bloque “Patrones en Argentina”

Cada patrón debe tener:
- título corto;
- “Observado en…”;
- fecha;
- fuente;
- contexto de la fuente;
- “Las modalidades cambian”.

Ejemplo de etiqueta:
> **Fuente: UFECI — reportes recibidos durante 2024**

No:
> “Esta es la estafa más común en Argentina.”

## 8.8. Estados de lenguaje

Preferir:
- “señal para revisar”;
- “amerita verificar”;
- “no alcanza para confirmar”;
- “comprobá por otro canal”.

Evitar:
- “100% falso”;
- “sitio seguro”;
- “fraude detectado”;
- “siempre”;
- “nunca” salvo reglas concretas de una institución específica.

---

# 9. Citas/fuentes sugeridas por bloque editorial

| Bloque | Fuente principal | Complementos |
|---|---|---|
| URL/sitio | AR-01 + TECH-01 | TECH-02, TECH-03, INT-01 |
| Correo | AR-01 | INT-01, INT-02, Check Point solo para detalle técnico |
| Mensajes/suplantación | AR-02 + AR-04 | AR-03, TECH-04, TECH-05 |
| Presión/manipulación | AR-02 + AR-03 | INT-01, INT-02, TECH-04 |
| Pagos/códigos | AR-03 + INT-03 | INT-07, TECH-04 |
| Archivos/QR | TECH-06 + INT-06 | TECH-05, INT-01 |
| Publicidad/inversiones | AR-05 | INT-04, AR-06 como caso |
| IA/deepfake/voz | AR-02 + INT-05 | TECH-04 |
| Patrones Argentina | AR-04 + AR-05 | AR-03, AR-06 |
| Verificación independiente | AR-03 | INT-01, INT-02, INT-05, TECH-04 |
| Checklist | síntesis transversal | no necesita citar cada línea en UI; mantener fuentes en “Acerca de esta guía” |

---

# 10. Temas que todavía requieren investigación

## 10.1. Dominio registrable en una UI para público argentino
La idea es sólida, pero falta definir una explicación que:
- funcione con `.com`, `.com.ar`, `.gob.ar` y otros sufijos;
- no enseñe una regla técnicamente falsa;
- siga siendo simple.

**Recomendación de producto:** si la app va a analizar URLs programáticamente, usar una implementación basada en Public Suffix List/equivalente y no lógica manual del tipo “últimos dos segmentos”.

## 10.2. Fuente argentina específica para QR manipulados
Hay buena evidencia pública internacional (FBI/FTC) y advertencias generales argentinas, pero no se encontró en esta auditoría una guía nacional argentina de autoridad comparable dedicada específicamente a sustitución física de QR.

No inventar un patrón argentino de “stickers superpuestos” hasta contar con fuente local suficiente si se desea presentarlo como tendencia argentina.

## 10.3. Fuente argentina de alto nivel sobre adjuntos/macros
Argentina.gob.ar advierte sobre adjuntos, pero Microsoft es la fuente técnica más clara hallada para macros. Si el producto exige una fuente pública argentina específica de malware en documentos, todavía falta buscarla.

## 10.4. Deepfakes en Argentina
Argentina.gob.ar reconoce el uso de deepfakes en ingeniería social, pero no se validó una serie estadística argentina robusta y reciente sobre frecuencia o pérdidas.

La guía no necesita estadísticas para ser útil.

## 10.5. Actualización de UFECI
Al 25 de septiembre de 2026, la sección pública de informes de UFECI consultada muestra como informe anual disponible **“Informe 2024: Casos y modalidades reportadas a UFECI”**.

Por ello:
- usar ese informe como contexto histórico reciente;
- fechar claramente sus datos;
- no presentarlo como “estado de 2026”;
- reemplazarlo si UFECI publica un informe 2025/2026 antes de cerrar el producto.

## 10.6. Recuperación después del incidente
La feature actual se centra en prevención. BCRA y otras fuentes contienen acciones posteriores —contactar al banco, bloquear accesos, denunciar—, pero conviene decidir si esto pertenece a esta guía o a una feature distinta.

---

# 11. Decisiones editoriales ya cerradas por esta investigación

1. **HTTPS se conserva como información de conexión, nunca como sello de legitimidad.**
2. **La verificación independiente será la habilidad transversal principal.**
3. **No se usarán estadísticas comerciales de deepfakes en la versión actual.**
4. **Los datos UFECI se etiquetarán por período y población: “reportes recibidos por UFECI en 2024”.**
5. **Fake Coins se utilizará como caso reciente, no como estimación de frecuencia.**
6. **Un anuncio patrocinado no será tratado como validación de identidad o legitimidad.**
7. **Los QR se tratarán como enlaces/destinos que requieren revisión, no como una categoría “segura/insegura” por sí misma.**
8. **La voz, foto, video, nombre visible o cuenta conocida no se usarán como prueba suficiente de identidad.**
9. **La guía no emitirá diagnósticos automáticos de “es estafa / no es estafa”.**
10. **Punycode será opcional; si aparece, se explicará primero.**
11. **La ausencia de errores, urgencia o señales típicas no se presentará como prueba de seguridad.**

---

# 12. Próxima etapa editorial

Con esta base ya se puede pasar a redactar la guía pública bloque por bloque.

Orden recomendado:

1. URL/sitio.
2. Correo.
3. Mensajes/suplantación.
4. Presión/manipulación.
5. Pagos/códigos.
6. Archivos/QR.
7. Publicidad/inversiones.
8. IA/deepfakes.
9. Patrones Argentina.
10. Verificación independiente.
11. Checklist.

Para cada bloque, redactar primero la **habilidad que se quiere enseñar** y luego reducir el conocimiento validado a la plantilla:

> **Qué mirar → Por qué importa → Cómo comprobarlo → Ejemplo → Qué no asumir → Fuentes**

No agregar contenido solo para “llenar” una sección. Si un bloque no logra enseñar una acción concreta, debe fusionarse, reducirse o eliminarse.
