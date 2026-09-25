# Especificación de feature: Consultar una guía preventiva mínima

**Rama de feature**: `feature/next-sdd`

**Creada**: 2026-09-25

**Estado**: Borrador

**Entrada**: Descripción de la feature: "Consultar una guía preventiva mínima"

**Fuentes normativas**: decisión humana vigente; `docs/paso0/03-sistema-ideal.md`;
`docs/paso0/04-trazabilidad.md`; `docs/paso0/05-mvp-24h.md`;
`specs/001-evaluar-interaccion-digital/spec.md`;
`.specify/memory/constitution.md`; `AGENTS.md`.

**Carácter**: primer incremento aprobado posterior al núcleo C1 con C2 integrado;
recuperación mínima, predominantemente estática, de C3/M4.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Consultar orientación preventiva (Prioridad: P1)

Como cualquier persona, quiero acceder sin autenticarme a una guía breve y clara
sobre interacciones digitales potencialmente engañosas, para reconocer situaciones
que justifican cautela antes de realizar una acción potencialmente perjudicial.

**Por qué tiene esta prioridad**: Es el valor preventivo central de la feature y
recupera la necesidad secundaria aprobada de preparación y reconocimiento sin
competir con el recorrido de evaluación de un caso concreto.

**Prueba independiente**: Una persona sin sesión accede a la guía, recorre todas
las categorías y puede identificar señales que merecen cautela, límites de esas
señales y una conducta preventiva aplicable, sin utilizar la evaluación ni ningún
servicio externo.

**Escenarios de aceptación**:

1. **Dado** que una persona no inició sesión, **cuando** accede a la guía,
   **entonces** puede leer todo el contenido preventivo sin que se le solicite
   autenticación.
2. **Dado** que una persona consulta la guía, **cuando** recorre su contenido,
   **entonces** encuentra orientación sobre señales, indicadores y tácticas de
   engaño frecuentes; identidad y apariencia de legitimidad; presión y
   manipulación; acciones solicitadas; comprobaciones independientes; qué hacer
   antes de actuar; y límites de interpretación.
3. **Dada** una señal aislada o la ausencia aparente de señales, **cuando** la
   persona consulta la explicación correspondiente, **entonces** la guía aclara
   que ninguna de esas situaciones demuestra por sí sola engaño, autenticidad o
   seguridad.

---

### Historia de usuario 2 - Aplicar pasos preventivos generales (Prioridad: P2)

Como persona expuesta a una interacción que me genera cautela, quiero encontrar
acciones generales, simples y proporcionadas, para pausar y verificar por un canal
independiente antes de decidir.

**Por qué tiene esta prioridad**: La información preventiva produce valor cuando
se convierte en una conducta aplicable y conserva la agencia de la persona, sin
actuar como detector ni reemplazar una confirmación independiente.

**Prueba independiente**: Ante una situación descrita de forma general, una
persona puede localizar en la guía al menos un paso de comprobación independiente
y una circunstancia en la que conviene detenerse antes de actuar.

**Escenarios de aceptación**:

1. **Dado** que una interacción ejerce urgencia o presión, **cuando** la persona
   consulta la guía, **entonces** encuentra una recomendación concreta de pausar
   y evitar actuar mientras falte una comprobación suficiente.
2. **Dado** que una interacción presenta una identidad aparentemente legítima,
   **cuando** la persona consulta cómo comprobarla, **entonces** encuentra pasos
   generales para buscar un canal independiente y no reutilizar exclusivamente
   los datos de contacto aportados por la propia interacción.
3. **Dado** que se solicita una acción sensible o difícil de revertir, **cuando**
   la persona consulta la categoría correspondiente, **entonces** encuentra una
   orientación concreta para detenerse, comprobar la solicitud y conservar la
   decisión final.
4. **Dado** que una persona busca un veredicto definitivo, **cuando** lee la guía,
   **entonces** encuentra límites explícitos que evitan presentar indicadores,
   apariencias o recomendaciones generales como una certificación.

---

### Historia de usuario 3 - Pasar de prevención a evaluación (Prioridad: P3)

Como persona que reconoce una duda en una interacción concreta, quiero poder
iniciar claramente el recorrido existente de evaluación, para revisar ese caso
con su contenido y contexto en lugar de aplicar reglas generales como un detector.

**Por qué tiene esta prioridad**: Conecta C3 con el núcleo C1+C2 sin modificarlo y
mantiene la separación aprobada entre aprendizaje preventivo y evaluación
contextual.

**Prueba independiente**: Desde la guía se identifica y activa una acción clara
para evaluar una interacción; el recorrido de evaluación conserva sus reglas de
acceso y comportamiento existentes.

**Escenarios de aceptación**:

1. **Dado** que una persona tiene un caso real que desea revisar, **cuando**
   consulta la guía, **entonces** encuentra una acción visible y comprensible para
   “Evaluar una interacción”.
2. **Dado** que una persona sin sesión activa esa acción, **cuando** pasa al
   recorrido de evaluación, **entonces** se aplican los requisitos de
   autenticación ya definidos por la feature 001 sin impedir el acceso público a
   la guía.
3. **Dado** que una persona activa la acción desde la guía, **cuando** llega al
   recorrido de evaluación, **entonces** la feature 001 conserva su alcance,
   contrato y comportamiento sin cambios.

### Casos límite

- Si una persona interpreta una sola señal como prueba definitiva, la guía debe
  corregir explícitamente esa conclusión y remitir al contexto y a la
  comprobación independiente.
- Si una interacción no presenta señales evidentes, la guía no debe afirmar que
  es segura ni auténtica.
- Si una identidad, diseño, dominio, remitente o lenguaje parecen legítimos, la
  guía debe tratarlos como apariencia y no como confirmación.
- Si la urgencia dificulta completar muchos pasos, la guía debe priorizar la
  pausa y una comprobación independiente antes de la acción solicitada.
- Si una persona consulta desde una pantalla angosta o amplia, debe poder leer y
  recorrer todas las categorías y acceder a las acciones principales.
- Si el mecanismo de evaluación o cualquier servicio externo no está disponible,
  la guía debe seguir siendo completamente consultable.
- Si una persona busca analizar los detalles de su caso dentro de la guía, el
  producto debe diferenciar la orientación general y conducirla al recorrido de
  evaluación existente, sin emitir una evaluación desde esta feature.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **RF-001**: La guía preventiva DEBE ser accesible públicamente y NO DEBE exigir
  registro ni sesión para consultar su contenido completo.
- **RF-002**: La guía DEBE tener una finalidad exclusivamente preventiva y
  educativa.
- **RF-003**: La guía NO DEBE evaluar, clasificar ni emitir una conclusión sobre
  una interacción concreta.
- **RF-004**: La guía DEBE organizar el contenido en pocas categorías
  comprensibles y diferenciables.
- **RF-005**: La guía DEBE cubrir señales e indicadores que pueden justificar
  cautela y explicar tácticas de engaño frecuentes sin convertirlas en una lista
  infalible o cerrada.
- **RF-006**: La guía DEBE cubrir la diferencia entre identidad presentada,
  apariencia de legitimidad y autenticidad comprobada.
- **RF-007**: La guía DEBE explicar cómo la presión, la urgencia y otras formas de
  manipulación pueden adelantar una acción a la verificación.
- **RF-008**: La guía DEBE cubrir tipos generales de acciones solicitadas que
  merecen atención, especialmente cuando impliquen información sensible, dinero,
  acceso, descarga, ingreso a enlaces o decisiones difíciles de revertir.
- **RF-009**: La guía DEBE explicar cómo realizar comprobaciones mediante canales
  independientes de la interacción dudosa.
- **RF-010**: La guía DEBE indicar qué hacer antes de actuar, incluyendo pausar,
  revisar el contexto, evitar una acción mientras falte evidencia suficiente y
  acudir a una fuente oficial o persona competente cuando corresponda.
- **RF-011**: La guía DEBE explicar cuándo una duda concreta puede justificar
  iniciar el recorrido “Evaluar una interacción”.
- **RF-012**: Cada categoría DEBE comunicar al menos una acción concreta que la
  persona pueda aplicar.
- **RF-013**: La guía DEBE afirmar explícitamente que un indicador aislado no es
  prueba concluyente de engaño.
- **RF-014**: La guía DEBE afirmar explícitamente que una apariencia legítima no
  demuestra autenticidad ni seguridad.
- **RF-015**: La guía DEBE afirmar explícitamente que la ausencia de señales
  evidentes no garantiza seguridad.
- **RF-016**: La guía DEBE evitar alarmismo, afirmaciones absolutas, porcentajes
  ficticios y cualquier lenguaje que prometa detectar, certificar o descartar un
  engaño.
- **RF-017**: La guía DEBE mantener visible que las recomendaciones son generales,
  que una confirmación oficial puede seguir siendo necesaria y que la decisión
  final pertenece a la persona.
- **RF-018**: La guía DEBE ofrecer una acción clara hacia el recorrido existente
  “Evaluar una interacción” para quien tenga un caso concreto.
- **RF-019**: El paso desde la guía hacia la evaluación DEBE conservar los
  requisitos de autenticación definidos por la feature 001.
- **RF-020**: Esta feature NO DEBE modificar el alcance, las entradas, las salidas,
  los errores ni ningún otro comportamiento contractual de la feature 001.
- **RF-021**: El contenido preventivo DEBE ser breve, legible y orientado a la
  acción, de modo que una persona pueda localizar una categoría y una conducta
  aplicable sin leer necesariamente la guía completa.
- **RF-022**: Todas las categorías y acciones principales DEBEN poder consultarse
  y utilizarse tanto en pantallas angostas como amplias.
- **RF-023**: El contenido completo de la guía DEBE permanecer disponible aunque
  el recorrido de evaluación o servicios externos estén temporalmente
  indisponibles.
- **RF-024**: La guía NO DEBE solicitar ni conservar contenido de interacciones,
  datos personales, preferencias ni historial de lectura.
- **RF-025**: El contenido DEBE ser curado y común para todas las personas; NO
  DEBE generarse ni personalizarse dinámicamente.

### Alcance explícito

#### IN

- una superficie preventiva de acceso público;
- contenido breve y curado;
- pocas categorías comprensibles;
- señales, indicadores y tácticas de engaño frecuentes;
- identidad y apariencia de legitimidad;
- presión, urgencia y manipulación;
- acciones solicitadas que merecen atención;
- comprobaciones independientes;
- orientación sobre qué hacer antes de actuar;
- límites de interpretación y lenguaje sin falsa certeza;
- navegación sencilla y lectura clara en pantallas angostas y amplias;
- una acción clara hacia “Evaluar una interacción”;
- diseño coherente con el producto existente, sin redefinirlo.

#### OUT

- evaluación, clasificación o detección de un caso concreto;
- cambios al comportamiento o contrato de la feature 001;
- base de datos, almacenamiento o historial;
- gestión de contenido, administración o publicación desde el producto;
- perfiles o personalización;
- contenido generado o actualizado dinámicamente;
- Gemini u otros mecanismos de evaluación;
- alertas en tiempo real y notificaciones;
- comunidad, C5, reportes, antecedentes o reputación;
- imágenes, archivos o análisis multimodal;
- interfaces de servicio nuevas;
- scraping, recuperación automática de contenido o comprobaciones externas
  automáticas.

### Entidades clave

- **Guía preventiva**: conjunto breve y coherente de orientación educativa que
  ayuda a reconocer situaciones que justifican cautela sin evaluar casos
  concretos.
- **Categoría preventiva**: agrupación comprensible de un tema aprobado, con una
  explicación breve, límites de interpretación y al menos una acción concreta.
- **Acción preventiva general**: conducta aplicable antes de actuar, como pausar,
  revisar contexto o comprobar mediante un canal independiente; no constituye una
  decisión ni una verificación ejecutada por el producto.
- **Acceso a evaluación**: invitación visible a utilizar el recorrido existente
  de la feature 001 cuando la persona tenga una interacción concreta que quiera
  revisar.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: En el 100 % de las pruebas de acceso sin sesión, una persona puede
  abrir y consultar el contenido completo de la guía sin autenticarse.
- **CE-002**: Una revisión de contenido confirma la presencia de los siete temas
  mínimos: señales, indicadores y tácticas frecuentes; identidad y apariencia de
  legitimidad; presión, urgencia y manipulación; acciones solicitadas;
  comprobaciones independientes; qué hacer antes de actuar; y límites de
  interpretación.
- **CE-003**: El 100 % de las categorías contiene al menos una acción concreta y
  comprensible que una persona puede aplicar antes de actuar.
- **CE-004**: En una revisión conjunta previa a integración, cada integrante del
  equipo puede localizar en menos de dos minutos una señal que justifica cautela,
  una comprobación independiente y una circunstancia en la que conviene pausar o
  iniciar una evaluación.
- **CE-005**: Una revisión de todo el contenido no encuentra indicadores
  presentados como pruebas definitivas, apariencias presentadas como autenticidad,
  ausencia de señales presentada como garantía, porcentajes ficticios ni promesas
  de detección o certificación.
- **CE-006**: Desde la guía, una persona encuentra y activa una acción claramente
  identificada como “Evaluar una interacción”; al continuar, se conservan las
  reglas de acceso y el comportamiento aprobado de la feature 001.
- **CE-007**: En pruebas manuales sobre al menos una pantalla angosta y una amplia,
  el 100 % de las categorías, advertencias y acciones principales permanece
  legible, recorrible y utilizable sin pérdida de contenido.
- **CE-008**: En el 100 % de las pruebas realizadas con el servicio de evaluación
  y servicios externos indisponibles, la guía conserva visible y utilizable todo
  su contenido preventivo.
- **CE-009**: Una revisión funcional confirma que consultar la guía no crea ni
  modifica datos personales, preferencias, historial o casos.

## Supuestos

- La decisión humana vigente convierte la preferencia por acceso público en el
  comportamiento esperado de esta feature.
- El contenido preventivo es el mismo para visitantes y personas autenticadas.
- Las siete áreas mínimas pueden presentarse como categorías separadas o como
  agrupaciones equivalentes, siempre que cada tema sea claramente localizable y
  conserve sus acciones y límites.
- La guía utiliza contenido curado a partir de Paso 0; esta specification define
  su cobertura y reglas, no redacta el texto editorial definitivo.
- El recorrido de evaluación de la feature 001 existe, está integrado y conserva
  sus requisitos de autenticación y contrato sin cambios.
- Una persona sin sesión puede consultar la guía y, si decide evaluar un caso,
  completar el acceso requerido por la feature 001 al iniciar ese recorrido.
- La guía reduce parcialmente la brecha de falta de sospecha, pero no garantiza
  que una persona reconozca todos los engaños ni reemplaza una evaluación
  contextual o confirmación oficial.
- La actualización futura del contenido curado será una modificación versionada
  del producto; no se requiere administración desde la experiencia de usuario.
