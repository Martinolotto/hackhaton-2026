# 01 · Entender problemática

**Estado**: `CERRADA`
**Entrada**: [consigna original](00-consigna-original.md)
**Fuentes normativas**:
[proceso 01](../../../antes-de-programar/docs/procesos/01-entender-problematica.md)
y [Mermaid 01](../../../antes-de-programar/diagrams/mermaid/01-entender-problematica.mmd)

## Comprensión consolidada

### Hechos de la consigna

- El área temática es Seguridad.
- Las personas interactúan diariamente con mensajes, sitios web, redes sociales
  y otros servicios digitales.
- Pueden encontrarse con intentos de fraude, suplantaciones de identidad,
  información engañosa u otras situaciones de riesgo.
- Reconocer esas situaciones a tiempo continúa siendo un desafío.
- La seguridad de las personas y de su información puede verse afectada.
- No se proporcionó un desafío adicional, población objetivo, geografía,
  rúbrica ni restricción complementaria.

### Decisiones humanas de alcance

Martino y Gastón decidieron:

- utilizar **persona expuesta** como actor principal;
- considerar la problemática transversal a cualquier persona que interactúe en
  entornos digitales, sin segmentación demográfica en esta etapa;
- estudiar únicamente situaciones con intención deliberada de engañar;
- incluir un **actor malicioso o adversario**, que puede ser persona, grupo,
  campaña u otro origen adversario;
- admitir cualquier canal digital, sin reducir el problema a sitios web ni a
  phishing;
- incluir información engañosa o desinformación solo cuando exista intención de
  engañar y pueda afectar una decisión relevante para la seguridad personal o
  de la información;
- excluir errores accidentales, vulnerabilidades o ataques invisibles sin
  interacción interpretable, fallos puramente técnicos y riesgos sin componente
  de engaño humano.

Estas son decisiones de alcance del análisis, no resultados de investigación ni
requisitos de una solución.

### Evidencia externa disponible

- Una revisión sistemática de 169 estudios sobre ingeniería social identifica
  urgencia/escasez, autoridad y afinidad entre los sesgos más investigados, pero
  advierte que el contexto y los procesos cognitivos no siempre están bien
  representados y que los efectos son difíciles de aislar.
- En un experimento con 472 participantes sobre emails, la presión temporal
  redujo la precisión de detección. La mala redacción o escasa personalización
  no mejoraron por sí solas la discriminación, y revisar URLs se asoció con un
  mejor resultado cuando las personas efectivamente lo hicieron.
- Reportes de consumidores de Estados Unidos muestran que la suplantación puede
  adoptar identidades diversas y producir pérdidas relevantes. Son
  autorreportes no verificados y no permiten inferir prevalencia local.
- Guías de prevención recomiendan verificar mediante canales conocidos e
  independientes y consultar a una persona de confianza. Son recomendaciones,
  no evidencia de que esas acciones sean siempre posibles o habituales.

Fuentes:

- [FTC Consumer Sentinel Network Data Book 2024](https://www.ftc.gov/system/files/ftc_gov/pdf/csn-annual-data-book-2024.pdf)
- [Cognición e ingeniería social — revisión sistemática](https://doi.org/10.1145/3635149)
- [Susceptibilidad al phishing — revisión sistemática](https://doi.org/10.1016/j.cose.2026.105096)
- [Presión temporal e indicadores de engaño — experimento](https://doi.org/10.1016/j.cose.2022.102937)
- [FTC — verificación independiente](https://consumer.ftc.gov/articles/how-avoid-scam)

### Hipótesis e inferencias que no son hechos

- La dificultad puede combinar desconocimiento de indicadores, interpretación
  incorrecta, apariencia de legitimidad, barreras de verificación, presión
  psicológica, confianza previa, ambigüedad y acción precipitada.
- No se demostró que todas esas condiciones sean causas en todos los canales.
- No se asume que una edad, experiencia o perfil demográfico determine
  vulnerabilidad.
- Los tres casos aportados por el equipo son casos de análisis que permiten
  probar el modelo; no constituyen una muestra de prevalencia.
- La definición de necesidades, insights, POV y problemática central que sigue
  es una síntesis metodológica candidata sometida a revisión humana.

## Dominio, vocabulario y frontera

### Vocabulario acordado

- **Actor principal**: persona expuesta.
- **Actor adversario**: persona, grupo, campaña u otro origen adversario que
  crea, manipula o distribuye contenido o interacciones con intención
  deliberada de engañar a la persona expuesta.
- **Contexto**: entorno digital.
- **Canales o plataformas**: medios por los que la persona recibe o encuentra
  contenido digital, como mensajería, correo, redes sociales, web, llamadas,
  marketplaces y publicidad.
- **Contenido digital**: elemento neutral que la persona recibe o encuentra;
  puede ser legítimo o riesgoso.
- **Interacción digital**: encuentro concreto entre la persona expuesta y
  contenido digital dentro de un contexto.
- **Indicador de riesgo**: característica del contenido o del contexto que puede
  sugerir que existe riesgo.
- **Entidad legítima referenciada**: elemento contextual que aparece cuando una
  interacción utiliza o suplanta la identidad, reputación o confianza de una
  persona, empresa, institución o servicio legítimo. Puede afectar la apariencia
  de legitimidad, la confianza, la identidad presentada y los mecanismos de
  verificación, pero no es un actor ni posee necesidad o POV propios.

No se usa «señal» simultáneamente para nombrar contenido e indicador.

### Dimensiones descriptivas

- **Modo de exposición directo**: el contenido llega a un espacio dirigido a la
  persona, por ejemplo DM, SMS, correo o llamada.
- **Modo de exposición indirecto**: el contenido queda expuesto y la persona lo
  encuentra, por ejemplo publicidad, publicación, web, marketplace o QR
  público.
- **Alcance**: individual, grupal o masivo.
- **Personalización**: genérico o personalizado.

Estas dimensiones pueden combinarse. Un SMS puede ser directo, masivo y
genérico; una publicidad segmentada puede ser indirecta, masiva o segmentada y
personalizada. No son requisitos de producto.

### Sistema objeto

La realidad estudiada comprende interacciones digitales en las que un actor
adversario intenta engañar deliberadamente a una persona expuesta mediante
contenido que ella puede observar e interpretar antes de tomar una decisión
capaz de afectar su seguridad o la de su información.

Incluye, entre otros, phishing, estafas por mensajes, suplantación, sitios
falsos, enlaces maliciosos usados mediante engaño, publicidad u ofertas
fraudulentas, fraudes en marketplaces, solicitudes fraudulentas de dinero,
robo de credenciales, perfiles falsos, llamadas fraudulentas, QR usados en un
engaño y malware distribuido mediante interacción engañosa.

Información engañosa o desinformación entra solo cuando hay intención deliberada
de engañar y puede influir en una decisión relevante para la seguridad. Quedan
fuera errores accidentales, riesgos puramente técnicos o invisibles para la
persona y malware sin componente de engaño humano.

La formulación es coherente con la consigna: delimita «engaños y riesgos» sin
reducirlos a un canal, y hace operable la condición de reconocimiento sin
introducir una solución.

## Casos contrastados

### Caso A · Oferta laboral en TikTok

- **Modo**: exposición indirecta.
- **Contenido y contexto**: publicidad de una oferta laboral en TikTok.
- **Apariencia de legitimidad**: anuncio convincente, cuenta construida,
  actividad y testimonios aparentes.
- **Indicadores posibles**: poca presencia externa, empresa, referencias o
  personas difíciles de verificar, dominio o información corporativa dudosos.
- **AS-IS de verificación posible**: buscar empresa, sitio oficial, referencias
  independientes y personas relacionadas; contrastar varias fuentes.
- **Barrera observada por el equipo**: la verificación demanda tiempo,
  conocimiento y búsqueda distribuida.
- **Límite de evidencia**: no se especificó una acción ni consecuencia concreta;
  no se infiere cuál sería.

### Caso B · Enlace desde la cuenta de un amigo

- **Modo**: exposición directa.
- **Contenido y contexto**: mensaje con enlace desde una cuenta conocida.
- **Apariencia de legitimidad**: confianza previa en la identidad visible.
- **Indicadores posibles**: URL o dominio extraño y comportamiento inusual.
- **Acción en juego**: abrir el enlace.
- **AS-IS de verificación posible**: contactar al amigo por otro medio, revisar
  el dominio o buscar información externa.
- **Hallazgo**: origen real e identidad presentada pueden diferir; una cuenta
  legítima puede estar comprometida.
- **Hipótesis**: la confianza previa puede reducir la sospecha inicial.

### Caso C · Alerta urgente de una entidad conocida

- **Modo**: exposición directa.
- **Contenido y contexto**: mensaje sobre un supuesto problema urgente con una
  cuenta y pedido de verificación de datos.
- **Apariencia de legitimidad**: nombre, identidad visual y lenguaje
  institucional.
- **Indicadores posibles**: urgencia, solicitud inesperada, enlace externo y
  pedido de credenciales.
- **Acción en juego**: acceder al enlace o proporcionar datos.
- **Hipótesis respaldada parcialmente por investigación**: la presión temporal
  puede reducir la evaluación y favorecer una acción anterior a la
  verificación.

Los casos muestran exposición directa e indirecta, confianza por identidad,
apariencia institucional, presión y verificación distribuida. No prueban que
estas condiciones expliquen todos los engaños.

## AS-IS consolidado

### Preparación

La persona entra a una interacción con conocimientos, experiencias, hábitos de
confianza y recursos de verificación previos. Esa preparación puede influir en
qué indicadores observa, pero no se presume que el conocimiento garantice una
decisión correcta.

### Exposición, reconocimiento y decisión

1. El actor adversario crea, manipula o distribuye contenido digital y puede
   presentarlo mediante una identidad legítima aparente.
2. El contenido llega por un canal dirigido o queda expuesto para que la
   persona lo encuentre.
3. Se produce una interacción digital: la persona interpreta conjuntamente
   contenido, identidad presentada, canal, contexto y acción solicitada.
4. Puede advertir o no indicadores de riesgo.
5. Si no surge sospecha, puede actuar apoyándose en la legitimidad aparente o
   en su interpretación cotidiana de la situación.
6. Si surge duda, puede intentar verificar por otra fuente, revisar dominio o
   URL, buscar referencias, consultar a alguien, postergar o abandonar.
7. La verificación puede exigir tiempo, conocimiento y acceso a información
   distribuida, y puede producir evidencia suficiente, insuficiente o
   contradictoria.
8. La persona decide actuar o detenerse. La decisión puede evitar el perjuicio
   o convertir la exposición en pérdida de información, acceso, cuentas,
   recursos o seguridad.

El flujo admite retroalimentación: nueva información o una consulta puede hacer
que la persona reinterprete la interacción.

### Significado de «reconocer a tiempo»

Interpretación metodológica validable:

> Reconocer o verificar el riesgo antes de que la persona realice una acción
> capaz de convertir la exposición en un perjuicio.

Esta formulación representa correctamente la consigna porque conserva el foco
en el reconocimiento oportuno y sitúa el límite temporal antes de la acción
potencialmente dañina. Es una interpretación operativa, no una frase literal de
la fuente.

### Brecha de reconocimiento

Se distinguen tres momentos:

1. **Preparación**: qué sabe y qué hábitos posee la persona antes de exponerse.
2. **Reconocimiento**: si advierte que la interacción merece atención.
3. **Evaluación o verificación**: cómo contrasta la interacción una vez que
   existe duda, antes de actuar.

La tensión central es que una ayuda consultiva solo puede activarse cuando ya
existe sospecha. Si la persona no reconoce nada inusual, puede no buscar ayuda.
Esto mantiene abierta la relación entre preparación, reconocimiento y
verificación sin convertirla en funcionalidades.

## Actores contemplados

### Actor principal · Persona expuesta

- **Situación actual y participación**: interactúa cotidianamente con contenido
  digital legítimo y engañoso mediante múltiples canales. Debe interpretar la
  interacción y decidir si confiar, verificar, actuar o detenerse.
- **Problemas y dificultades**: los indicadores pueden ser desconocidos,
  ambiguos, técnicos o quedar eclipsados por apariencia legítima, confianza
  previa o presión. La verificación puede requerir tiempo, conocimiento y
  fuentes distribuidas. Si no aparece sospecha inicial, la persona puede actuar
  sin iniciar ninguna verificación.
- **Necesidad principal — evaluación/verificación**: cuando existe duda o
  sospecha, evaluar e interpretar los indicadores y verificar suficientemente
  la legitimidad de la interacción antes de realizar una acción potencialmente
  perjudicial.
- **Necesidad secundaria — preparación/reconocimiento**: desarrollar
  conocimiento y capacidad reutilizables para reconocer que una interacción
  merece cautela, incluso antes de tener una sospecha claramente formada.
- **Motivaciones y contexto**: continuar usando entornos digitales y responder a
  interacciones legítimas sin exponer información, cuentas, recursos o
  seguridad. Opera con tiempo, atención, conocimientos y evidencia variables,
  y no puede tratar toda interacción como peligrosa.
- **Insight candidato 1**: el problema no es solamente que existan o falten
  indicadores; una interacción diseñada para parecer legítima puede hacer que
  indicadores disponibles no sean observados, comprendidos o considerados
  suficientes para detener la acción.
- **Insight candidato 2**: verificar no siempre es una acción sencilla: puede
  requerir abandonar el canal original, reconstruir el origen y contrastar
  información dispersa antes de que la presión o la confianza conduzcan a
  actuar.
- **Insight candidato 3**: la verificación depende a menudo de que exista una
  sospecha inicial; cuando la interacción no la provoca, la persona puede no
  activar ningún mecanismo de ayuda.
- **POV candidato**: Cuando existe duda o sospecha, la persona expuesta necesita
  evaluar y verificar suficientemente la legitimidad de la interacción antes de
  actuar, porque un engaño deliberado puede aprovechar apariencia legítima,
  confianza, presión e información ambigua o distribuida. La preparación para
  reconocer antes que una interacción merece cautela es una necesidad
  complementaria.

### Actor adversario · Actor malicioso

- **Situación actual y participación**: persona, grupo, campaña u origen
  adversario que crea, manipula o distribuye contenido con intención deliberada
  de engañar e influir en una decisión.
- **Problema operativo desde su perspectiva**: debe lograr que la interacción
  parezca suficientemente legítima para provocar una acción antes de que la
  persona detecte o verifique el engaño.
- **Necesidad operativa**: inducir una interpretación o acción favorable al
  engaño. No es una necesidad que la solución futura deba satisfacer.
- **Motivaciones y contexto**: pueden incluir obtención de dinero, información,
  credenciales, acceso o influencia; el objetivo concreto varía según el caso y
  no se generaliza.
- **Insight candidato**: el engaño depende de la distancia entre origen real e
  identidad presentada y de reducir la probabilidad de una verificación
  independiente antes de la acción.
- **POV analítico**: El actor adversario necesita que la persona acepte la
  legitimidad aparente y actúe porque su objetivo depende de superar o evitar el
  reconocimiento y la verificación. Este POV describe su papel causal y no
  orienta el valor de una solución.

### Elemento contextual · Entidad legítima referenciada

Es relevante cuando su identidad, relación o reputación modifica materialmente
la confianza de la persona expuesta. Los casos B y C muestran ese papel
contextual. No es actor principal ni secundario, no posee una necesidad que deba
satisfacerse y no recibe POV.

Los únicos actores del problema son la persona expuesta y el actor adversario.
La entidad legítima referenciada, los canales, las plataformas, las redes de
apoyo y las fuentes de consulta permanecen como contexto o participantes del
AS-IS, no como actores.

## Síntesis de la problemática

### Perspectivas, relaciones y tensiones

- El actor adversario intenta influir en la interpretación y decisión.
- La persona expuesta necesita decidir con evidencia limitada sin paralizar sus
  interacciones digitales legítimas.
- Una entidad legítima referenciada puede aportar confianza aparente aunque no
  sea el origen real.
- La verificación puede depender de fuentes, personas o canales externos y
  exigir más esfuerzo que actuar dentro de la interacción original.
- Existe una tensión entre actuar con fluidez y detenerse ante incertidumbre; no
  toda interacción incierta es peligrosa ni todo engaño ofrece indicadores
  inequívocos.

### Síntomas, características y causas

- **Manifestación confirmada**: dificultad para reconocer engaños y riesgos a
  tiempo.
- **Características de los engaños identificadas por alcance o casos**:
  apariencia legítima, identidad presentada confiable, indicadores técnicos o
  contextuales y posibles presiones de urgencia, miedo, autoridad o recompensa.
- **Evidencia causal parcial**: la presión temporal redujo la precisión en un
  experimento de clasificación de emails; revisar URLs se asoció con mejor
  desempeño. Las revisiones respaldan estudiar factores cognitivos, sociales y
  contextuales, pero no demuestran una causa única.
- **Hipótesis del equipo aún no universalizadas**: desconocimiento de
  indicadores, dificultad técnica para verificar, confianza en marcas o
  personas conocidas, información insuficiente y actuación anterior a la
  verificación.
- **Patrón derivado de los casos**: la legitimidad aparente y el costo
  distribuido de verificar pueden debilitar o retrasar el reconocimiento.

### Necesidades humanas candidatas

1. **Necesidad principal — evaluación/verificación**: cuando existe duda o
   sospecha, interpretar los indicadores considerando contenido y contexto y
   verificar suficientemente la legitimidad antes de una acción potencialmente
   perjudicial.
2. **Necesidad secundaria — preparación/reconocimiento**: desarrollar
   conocimiento transferible que permita advertir que una interacción merece
   cautela, incluso antes de una sospecha claramente formada.

Estas necesidades expresan acciones y resultados humanos; no prescriben
herramientas, contenidos ni funcionalidades.

### Problemática central candidata

> Las personas expuestas interactúan cotidianamente, a través de múltiples
> canales digitales, con contenido que puede haber sido creado, manipulado o
> distribuido deliberadamente para engañarlas. Antes de actuar deben determinar
> si la interacción es confiable, pero la apariencia de legitimidad, la
> confianza en identidades conocidas, la presión psicológica, la ambigüedad de
> los indicadores y el esfuerzo requerido para contrastar información pueden
> dificultar el reconocimiento y la verificación. Cuando no surge sospecha o no
> se verifica a tiempo, la persona puede realizar una acción que exponga su
> información, cuentas, recursos o seguridad.

La formulación integra actor, intención adversaria, contexto multicanal, brecha
de reconocimiento, barreras de verificación y consecuencias sin anticipar una
solución.

## Ideas de solución diferidas

- Se descartó como supuesto general un intermediario permanente que intercepte
  todas las interacciones, porque no puede presumirse acceso a todos los
  canales.
- El equipo conserva una idea vinculada con concientización e información
  centralizada sobre seguridad digital. Podría relacionarse con preparación y
  reconocimiento, pero no está validada como solución ni constituye requisito.
- Analizar texto o imágenes es una posible decisión futura de alcance; no limita
  la definición del problema, que incluye contenido, contexto, identidad,
  origen, canal y acción solicitada.

## Vacíos materiales antes del Problem Gate

No quedan decisiones materiales bloqueantes conocidas para revisar el Problem
Gate a nivel de una hackathon.

Limitaciones que deben conservarse:

- los casos del equipo no demuestran frecuencia ni representatividad;
- la evidencia experimental consultada se concentra principalmente en phishing
  y email, por lo que no universaliza causas a todos los canales;
- no se determinó una prevalencia geográfica, pero no es bloqueante porque el
  equipo decidió una problemática transversal y no fundamenta la síntesis en
  cifras locales;
- la entidad legítima referenciada se conserva únicamente como elemento
  contextual que puede afectar legitimidad aparente, confianza, identidad
  presentada y verificación.

Estas limitaciones impiden afirmar causas universales, pero no impiden
comprender suficientemente el sistema objeto, el AS-IS, los actores, las
necesidades y la problemática central candidata.

## Problem Gate

### Comprobación metodológica

- [x] Investigación suficiente para decidir a nivel de hackathon.
- [x] Sistema objeto, contexto y frontera comprendidos.
- [x] Actores relevantes y AS-IS comprendidos.
- [x] Los dos actores contemplados —persona expuesta y actor adversario— tienen
  situación, problema, necesidad o propósito, motivaciones, insight y POV.
- [x] Perspectivas comparadas y problemática central sintetizada.
- [x] No se diseñó una solución ni se formularon HMW.
- [x] No quedan ambigüedades bloqueantes conocidas.

### Decisión humana explícita

- **Martino**: `APROBADO`
- **Gastón**: `APROBADO`
- **Problem Gate**: `APROBADO`
- **Fecha o referencia de revisión**: 2026-09-24.
- **Observaciones o correcciones requeridas**: ninguna. El equipo aprobó
  evaluación/verificación como necesidad principal,
  preparación/reconocimiento como necesidad secundaria y el resto del modelo
  documentado.

Martino y Gastón aprobaron explícitamente el Problem Gate. Esta decisión
habilita Fase 02.

## Validación de la fase

- **Cobertura del proceso Markdown**: completa para revisión.
- **Cobertura del Mermaid**: investigación, sistema objeto, contexto, AS-IS,
  análisis por actor, comparación, causas e integración cubiertos.
- **Contradicciones o faltantes conocidos**: no se detectaron contradicciones
  entre proceso y Mermaid ni vacíos bloqueantes. Se documentaron límites de
  evidencia.
- **Resultado**: `APROBADO Y CERRADO`.

## Estado de cierre

Fase 01 cerrada por aprobación explícita de Martino y Gastón. Problem Gate
aprobado.

## Entrega

Este artefacto entrega problemática central, actores, necesidades, insights y
POV validados a [02 · Ideación de solución](02-ideacion-solucion.md).

## Revisión humana

- **Estado de revisión**: aprobada por Martino y Gastón.
- **Cambios solicitados**: ninguno.
- **Evidencia de cierre**: mensaje conjunto del 2026-09-24 con
  `Martino: APROBADO`, `Gastón: APROBADO` y aprobación explícita del Problem
  Gate.
