# Especificación de feature: Evaluación guiada de una interacción digital

**Rama de feature**: `feature/mvp-sdd`

**Creada**: 2026-09-24

**Estado**: Borrador

**Entrada**: Descripción de la feature: "Evaluación guiada de una interacción digital"

**Fuentes normativas**: decisión humana vigente; `docs/paso0/05-mvp-24h.md`;
`docs/paso0/03-sistema-ideal.md` para contexto; `.specify/memory/constitution.md`;
`AGENTS.md`.

**Carácter**: specification transversal y compartida del único producto.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Evaluar una interacción dudosa (Prioridad: P1)

Como persona registrada con una sesión válida, quiero describir libremente una
interacción digital que me genera dudas y aportar su contexto, para recibir una
evaluación estructurada que me ayude a comprender el caso y verificar antes de
actuar.

**Por qué tiene esta prioridad**: Es el valor central del MVP. Sin una evaluación
explicable de una entrada real y libre, el producto no resuelve la necesidad
principal identificada.

**Prueba independiente**: Una persona autenticada ingresa una interacción no
precocinada y el contexto mínimo; la prueba se supera si recibe una evaluación
completa, comprensible y limitada, aunque no realice una verificación posterior.

**Escenarios de aceptación**:

1. **Dado** que la persona tiene una sesión válida y dispone de una interacción
   dudosa, **cuando** aporta texto o una descripción, canal, identidad presentada,
   relación previa, acción solicitada, motivo de la duda y, si los conoce, URL y
   origen observable, **entonces** recibe una evaluación con todas las secciones
   obligatorias y sin que los datos aportados se presenten como verificados.
2. **Dado** cualquiera de los casos A, B o C definidos como fixtures del Paso 0,
   **cuando** una persona autenticada lo ingresa, **entonces** el recorrido acepta
   el caso y produce una evaluación completa sin depender de un tipo de caso
   precocinado.
3. **Dado** un caso libre distinto de los fixtures A, B y C, **cuando** contiene
   la entrada mínima, **entonces** puede evaluarse mediante el mismo recorrido.
4. **Dado** que la evidencia disponible no permite sostener una estimación de
   riesgo, **cuando** se genera la evaluación, **entonces** el riesgo se expresa
   como `no determinable`, la incertidumbre se informa por separado y se explican
   los faltantes que limitan la conclusión.
5. **Dado** que la persona dispone de una captura PNG, JPEG o WEBP de hasta 4 MB,
   **cuando** la adjunta opcionalmente junto al contexto textual, **entonces** la
   captura se usa como contexto adicional no verificado, no se persiste y la
   respuesta conserva la misma estructura explicable.

---

### Historia de usuario 2 - Verificar y obtener una reevaluación (Prioridad: P2)

Como persona que ya recibió una evaluación inicial, quiero realizar una de las
comprobaciones independientes sugeridas, informar qué hice y qué observé, para
obtener una única reevaluación que incorpore esa nueva información.

**Por qué tiene esta prioridad**: Convierte el análisis en apoyo concreto para
verificar antes de actuar y demuestra que una nueva evidencia puede modificar la
síntesis sin prometer certeza.

**Prueba independiente**: A partir de una evaluación inicial, la persona selecciona
o describe una comprobación, aporta su resultado y recibe exactamente una
reevaluación actualizada que explica qué cambió, qué no cambió y qué incertidumbre
permanece.

**Escenarios de aceptación**:

1. **Dado** que existe una evaluación inicial, **cuando** la persona revisa sus
   próximos pasos, **entonces** encuentra verificaciones independientes concretas
   y priorizadas.
2. **Dado** que la persona realizó una comprobación propuesta, **cuando** informa
   la comprobación y el resultado observado, **entonces** recibe una reevaluación
   que incorpora ese aporte, actualiza las dimensiones afectadas y conserva las
   limitaciones pertinentes.
3. **Dado** que el resultado aportado es ambiguo, contradictorio o insuficiente,
   **cuando** se realiza la reevaluación, **entonces** el sistema lo refleja como
   tal y no fuerza una reducción del riesgo o de la incertidumbre.
4. **Dado** que la persona ya obtuvo la reevaluación permitida, **cuando** intenta
   iniciar otra dentro del mismo recorrido, **entonces** el producto informa el
   límite del MVP y no genera una nueva reevaluación.

---

### Historia de usuario 3 - Acceder y usar el recorrido con resguardos (Prioridad: P3)

Como visitante o persona registrada, quiero entender qué partes son públicas y
qué resguardos tiene la evaluación, para acceder por los medios existentes sin
exponer información sensible ni interpretar el resultado como una certificación.

**Por qué tiene esta prioridad**: El control de acceso, la privacidad funcional y
el manejo honesto de fallos protegen a la persona y sostienen la confianza en el
recorrido central.

**Prueba independiente**: Se comprueba que landing, registro y login continúan
accesibles sin sesión, que la evaluación exige autenticación, que la advertencia
sobre datos sensibles es visible y que una indisponibilidad termina en un error
explícito sin evaluación fabricada.

**Escenarios de aceptación**:

1. **Dado** un visitante sin sesión, **cuando** accede a la landing, al registro o
   al login, **entonces** puede utilizar esas capacidades públicas existentes.
2. **Dado** un visitante sin sesión válida, **cuando** intenta iniciar o enviar una
   evaluación, **entonces** no puede realizarla y recibe una indicación clara para
   autenticarse.
3. **Dada** una persona que prepara una entrada, **cuando** revisa el formulario o
   guía de ingreso, **entonces** ve una advertencia explícita de no enviar
   contraseñas, códigos de verificación, datos bancarios ni otra información
   sensible.
4. **Dado** que el mecanismo de evaluación no está disponible, **cuando** la
   persona solicita una evaluación o reevaluación, **entonces** recibe un mensaje
   de fallo y no se presenta contenido fabricado como evaluación.

### Casos límite

- Si falta texto o descripción, o algún dato contextual mínimo, el recorrido
  identifica lo que falta y no solicita la evaluación hasta que se complete o se
  declare que el dato no se conoce cuando corresponda.
- Una URL aportada se trata como información declarada por la persona; no se abre,
  analiza ni presenta como verificada automáticamente.
- Si el origen observable no se conoce, queda explícitamente señalado como
  información faltante en vez de impedir el recorrido.
- Si riesgo e incertidumbre parecen apuntar en direcciones distintas —por ejemplo,
  riesgo bajo con incertidumbre alta—, ambos se conservan y explican sin colapsarlos
  en una única conclusión.
- Si la entrada contiene pocos indicadores o muchos elementos de legitimidad
  aparente, la evaluación no concluye por cantidad ni equipara apariencia con
  evidencia.
- Si la sesión deja de ser válida durante el recorrido, no se genera una nueva
  evaluación ni reevaluación y se informa que es necesario volver a autenticarse.
- Si el resultado de una comprobación contradice la evaluación inicial, la
  reevaluación explica el cambio y conserva visibles las contradicciones restantes.
- Si el contenido puede implicar un perjuicio inmediato, la orientación prioriza
  pausar la acción y acudir a un canal independiente u oficial, sin actuar ni
  decidir en nombre de la persona.
- Si una captura declara un formato no permitido, su contenido no coincide con el
  formato declarado o supera 4 MB, el recorrido la rechaza antes de evaluar.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **RF-001**: La landing, el registro y el login existentes DEBEN permanecer
  accesibles públicamente.
- **RF-002**: El recorrido de evaluación DEBE exigir una sesión válida tanto para
  la evaluación inicial como para la reevaluación.
- **RF-003**: Una persona sin sesión válida NO DEBE poder realizar una evaluación
  ni una reevaluación.
- **RF-004**: La feature DEBE reutilizar el registro y el login existentes sin
  requerir perfiles, historial ni nuevas capacidades de autenticación.
- **RF-005**: La persona autenticada DEBE poder ingresar texto libre o una
  descripción libre de la interacción; el producto NO DEBE limitar la entrada a
  casos precocinados.
- **RF-006**: El recorrido DEBE recoger como contexto el canal, la identidad
  presentada, la relación previa, la acción solicitada y el motivo de la duda.
- **RF-007**: El recorrido DEBE permitir aportar una URL opcional y el origen
  observable cuando se conozca, y DEBE permitir declarar como desconocido el origen.
- **RF-008**: Antes del envío, el producto DEBE advertir que no se incluyan
  contraseñas, códigos de verificación, datos bancarios ni otra información
  sensible.
- **RF-009**: La evaluación DEBE distinguir de manera comprensible la información
  aportada por la persona, las interpretaciones realizadas y la información faltante.
- **RF-010**: Cada evaluación inicial DEBE incluir: resumen interpretado,
  indicadores, elementos de legitimidad aparente, evidencia disponible,
  contradicciones, información faltante, riesgo estimado, incertidumbre,
  verificaciones independientes priorizadas, orientación de cautela, aprendizaje
  breve y limitaciones explícitas.
- **RF-011**: El riesgo estimado DEBE usar exactamente una de estas categorías:
  `bajo`, `medio`, `alto` o `no determinable`, e incluir una explicación contextual.
- **RF-012**: La incertidumbre DEBE usar exactamente una de estas categorías:
  `baja`, `media` o `alta`, e incluir una explicación contextual independiente de
  la explicación del riesgo.
- **RF-013**: El producto DEBE presentar riesgo e incertidumbre como dimensiones
  diferentes; una categoría de una dimensión NO DEBE determinar automáticamente
  la categoría de la otra.
- **RF-014**: Los indicadores DEBEN presentarse como señales contextuales y NO
  como evidencia concluyente por sí mismos.
- **RF-015**: Los elementos de legitimidad aparente NO DEBEN presentarse como
  prueba de autenticidad o seguridad.
- **RF-016**: La evaluación NO DEBE afirmar que una fuente, URL, remitente,
  identidad u origen fue verificado cuando esa verificación no ocurrió.
- **RF-017**: La evaluación NO DEBE usar porcentajes, probabilidades ficticias,
  promesas de certeza absoluta ni lenguaje que certifique seguridad o legitimidad.
- **RF-018**: Toda evaluación DEBE aclarar que `riesgo bajo` no significa `seguro`,
  que la evaluación tiene limitaciones y que la decisión final pertenece a la
  persona.
- **RF-019**: Después de la evaluación inicial, el producto DEBE proponer
  verificaciones independientes concretas y ordenadas por prioridad para el caso.
- **RF-020**: La persona DEBE poder aportar qué comprobación realizó y qué resultado
  observó.
- **RF-021**: El producto DEBE permitir exactamente una reevaluación por recorrido
  a partir del resultado aportado y DEBE impedir ciclos adicionales en el MVP.
- **RF-022**: La reevaluación DEBE conservar la misma estructura explicable de la
  evaluación inicial y señalar qué conclusiones cambiaron, cuáles se mantuvieron y
  qué incertidumbre o faltantes permanecen.
- **RF-023**: El flujo completo DEBE poder concluir sin guardar el caso, la
  evaluación ni un historial como requisito funcional.
- **RF-024**: Si el mecanismo de evaluación no está disponible o no puede producir
  una respuesta válida, el producto DEBE comunicar el fallo claramente y NO DEBE
  fabricar, completar ni presentar una evaluación aparente.
- **RF-025**: Los casos A, B y C del Paso 0 DEBEN poder ejecutarse como fixtures de
  aceptación, pero NO DEBEN restringir los tipos de entrada admitidos.
- **RF-026**: El producto NO DEBE analizar automáticamente la URL aportada ni
  realizar verificaciones externas automáticas dentro de esta feature.
- **RF-027**: La persona DEBE poder adjuntar opcionalmente una captura PNG, JPEG o
  WEBP de hasta 4 MB sin eliminar ninguno de los campos contextuales existentes.
- **RF-028**: La captura DEBE mantenerse solo en memoria durante el request y el
  recorrido local; NO DEBE escribirse a disco, persistirse en Supabase ni originar
  tablas, Storage, OCR propio, lectura EXIF o herramientas externas.
- **RF-029**: Una captura válida DEBE enviarse a Gemini junto al texto como contexto
  multimodal no verificado y NO DEBE presentarse como detector automático ni prueba
  concluyente de fraude, autenticidad o seguridad.
- **RF-030**: Cuando no exista captura, el transporte y evaluación textual vigentes
  DEBEN conservar su comportamiento.
- **RF-031**: La captura seleccionada DEBE poder previsualizarse, reemplazarse o
  eliminarse antes del envío, mostrando nombre, tamaño y que no será almacenada.
- **RF-032**: Si el recorrido alcanza la única reevaluación y la captura continúa
  disponible en memoria, el frontend DEBE reenviar el mismo archivo; un refresh no
  obliga a reconstruirlo ni recuperarlo.
- **RF-033**: La respuesta HTTP, structured output, escalas, Auth, rate limit,
  failover y límite de una reevaluación DEBEN permanecer sin cambios semánticos.

### Alcance explícito

Esta specification cubre un único recorrido transversal: acceso autenticado,
entrada libre y contextual, evaluación inicial explicable, una comprobación
aportada por la persona, una reevaluación y cierre con orientación humana.

Quedan fuera del alcance actual: comunidad o C5, persistencia de casos, perfiles,
historial, un dashboard nuevo, notificaciones, monitoreo, AnythingLLM,
verificaciones externas automáticas, análisis automático de URL, imágenes como
requisito obligatorio, múltiples reevaluaciones y ampliaciones de autenticación.

### Entidades clave

- **Interacción digital**: Encuentro dudoso descrito por la persona mediante su
  contenido disponible y el contexto en el que ocurrió.
- **Contexto de la interacción**: Canal, identidad presentada, origen observable si
  se conoce, relación previa, acción solicitada y motivo de la duda.
- **Evaluación**: Síntesis explicable vigente del caso, compuesta por observaciones,
  inferencias, evidencia, contradicciones, faltantes, riesgo, incertidumbre,
  verificaciones, cautelas, aprendizaje y límites.
- **Verificación independiente**: Comprobación propuesta que busca contrastar una
  afirmación, identidad, origen o acción mediante un canal distinto del elemento
  dudoso.
- **Resultado de verificación**: Descripción aportada por la persona sobre la
  comprobación que realizó y lo que observó; puede confirmar, contradecir o no
  resolver aspectos del caso.
- **Reevaluación**: Única actualización permitida de la evaluación inicial que
  incorpora el resultado aportado y explica el efecto de la nueva información.
- **Captura opcional**: Archivo PNG, JPEG o WEBP de hasta 4 MB aportado como
  contexto adicional no verificado y conservado únicamente en memoria.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: En el 100 % de las pruebas de aceptación con los fixtures A, B y C y
  al menos un caso libre adicional, una persona autenticada puede completar la
  entrada y obtener una evaluación inicial estructurada.
- **CE-002**: El 100 % de las evaluaciones y reevaluaciones válidas contiene las
  doce secciones obligatorias indicadas en RF-010 y usa únicamente las escalas
  cualitativas aprobadas para riesgo e incertidumbre.
- **CE-003**: En el 100 % de las pruebas de acceso, los visitantes pueden acceder a
  landing, registro y login, mientras que ningún visitante sin sesión válida puede
  obtener una evaluación o reevaluación.
- **CE-004**: En el 100 % de los recorridos completos de aceptación, la persona
  puede aportar el resultado de una comprobación, recibe una sola reevaluación y no
  puede iniciar una segunda reevaluación.
- **CE-005**: En una revisión humana del equipo previa a producción, cada revisor
  identifica correctamente, sin explicación adicional, el nivel de riesgo, el
  grado de incertidumbre, una verificación priorizada y que la decisión final
  sigue siendo humana.
- **CE-006**: En el 100 % de las pruebas de indisponibilidad, se muestra un fallo
  explícito y no aparece una evaluación total o parcialmente fabricada.
- **CE-007**: En al menos un recorrido representativo cronometrado, la persona
  completa desde el inicio de la entrada hasta la evaluación inicial en menos de
  cinco minutos, sin contar demoras externas.
- **CE-008**: En una revisión de contenido de todas las salidas de aceptación no
  aparece ninguna certificación de seguridad, fuente no comprobada presentada como
  verificada, probabilidad ficticia ni equivalencia entre un indicador y una prueba.
- **CE-009**: Las pruebas aceptan PNG, JPEG y WEBP válidos, rechazan formato o
  tamaño inválido, conservan el flujo sin imagen y demuestran que una captura puede
  reenviarse en la única reevaluación sin persistencia.

## Supuestos

- La decisión humana vigente de exigir sesión válida prevalece sobre la mención
  histórica del Paso 0 que permitía completar el núcleo sin cuenta.
- El registro y el login actuales ya permiten que una persona obtenga una sesión;
  esta feature solo depende de su disponibilidad y no redefine su comportamiento.
- La forma técnica de validar la sesión se decidirá en el plan posterior.
- La URL es texto aportado para contextualizar el caso; no implica navegación,
  recuperación de contenido ni comprobación automática.
- Cuando el origen observable no se conoce, explicitar esa ausencia aporta más
  valor que bloquear el recorrido.
- El recorrido puede mantener el contexto necesario mientras está en curso, pero
  no requiere conservarlo como caso o historial después de finalizarlo.
- Las comprobaciones son realizadas por la persona fuera del mecanismo automático
  de evaluación; el producto guía, recibe el resultado declarado y lo incorpora con
  sus límites.
- Los fixtures A, B y C se mantienen como material de aceptación ya aprobado en el
  Paso 0 y no definen categorías cerradas del producto.
