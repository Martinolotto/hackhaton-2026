# Quickstart de validación — Guía preventiva

## Objetivo

Verificar de forma reproducible que `/aprendizaje` implementa la specification y
el [contrato de interfaz](contracts/guide-ui-contract.md), sin depender de backend
ni ampliar la feature 001.

## Prerrequisitos

- Node.js 22 o superior.
- Dependencias del frontend instalables desde `frontend/package-lock.json`.
- La SPA actual requiere `VITE_SUPABASE_URL` y
  `VITE_SUPABASE_PUBLISHABLE_KEY` (o `VITE_SUPABASE_ANON_KEY`) para inicializarse,
  según `frontend/.env.example`. Son la configuración pública existente; no se
  necesita una sesión válida para leer la guía.
- Para validar solo la guía no se necesitan backend, Gemini ni secretos.
- Para comprobar el retorno autenticado del CTA se utiliza la configuración
  Supabase ya existente del proyecto; esa prueba de integración es complementaria
  a la lectura pública.

## Preparación y ejecución

Desde la raíz del repositorio:

```bash
cd frontend
npm ci
npm run dev
```

Abrir la URL informada por Vite y navegar a `/aprendizaje`.

## Validaciones automatizables existentes

```bash
cd frontend
npm run lint
npm run build
```

Resultado esperado: ambos comandos finalizan con código 0 y la compilación no
requiere backend ni descarga contenido editorial.

## Escenario 1 — Acceso público y autonomía

1. Cerrar sesión o abrir una ventana privada.
2. Acceder directamente a `/aprendizaje`.
3. No iniciar backend ni configurar Gemini.
4. Si es posible, bloquear la URL del backend en las herramientas del navegador y
   recargar.

Resultado esperado:

- no hay redirección a `/login`;
- introducción, siete bloques, checklist, CTA y fuentes son visibles;
- no se solicita contenido de interacción ni se crea historial;
- una indisponibilidad del backend, Gemini o una fuente externa no sustituye ni
  oculta el contenido.

## Escenario 2 — Integridad editorial

Comparar la página con [content-guide.md](content-guide.md):

- actualización editorial: 25 de septiembre de 2026;
- bloques 1–7 presentes y en orden;
- cada bloque contiene qué mirar, por qué importa, cómo comprobarlo, ejemplo, qué
  no asumir y fuentes;
- checklist con las cinco preguntas aprobadas;
- cierre que aclara que la guía no evalúa ni certifica casos.

Resultado esperado: no faltan cautelas, no se agregaron estadísticas ni
afirmaciones y cada bloque ofrece al menos una acción concreta.

## Escenario 3 — Límites contra falsa certeza

Localizar explícitamente estas ideas:

- una señal aislada no prueba engaño;
- apariencia legítima no confirma autenticidad;
- HTTPS protege la conexión, no legitima el sitio;
- ausencia de señales no garantiza seguridad;
- voz, foto o video convincente no confirman identidad;
- anuncio patrocinado no confirma legitimidad;
- la decisión final sigue siendo humana.

Resultado esperado: ningún texto, estilo, etiqueta o icono contradice esos
límites ni presenta puntajes o veredictos.

## Escenario 4 — Patrones en Argentina y fuentes

1. Abrir “Poné los patrones recientes en contexto”.
2. Revisar cada patrón y luego su fuente en la sección final.

Resultado esperado:

- cada patrón muestra modalidad, organismo, Argentina, fecha/período y contexto;
- UFECI se limita a reportes recibidos durante 2024;
- CNV y MPBA conservan fechas y contexto de caso;
- el texto aclara que no es ranking, estimación nacional, feed, monitoreo ni
  alerta y que la selección no es exhaustiva;
- todos los IDs por bloque se resuelven a fuentes con las URLs ya aprobadas.

## Escenario 5 — Navegación y lectura

1. Recorrer el sidebar y el selector de siete temas solo con teclado.
2. Activar cada tema y comprobar que el panel anuncia y muestra su contenido.
3. Buscar términos presentes y ausentes; limpiar la consulta y confirmar que los
   siete temas vuelven a estar disponibles.
4. Recorrer checklist, fuentes y CTA sin mouse.
5. Probar a 375 px, en una pantalla amplia y con zoom del navegador al 200 %.
6. Con cada integrante del equipo, cronometrar la localización de una señal que
   justifica cautela, una comprobación independiente y una circunstancia para
   pausar o iniciar una evaluación.

Resultado esperado:

- foco visible y orden lógico;
- todos los bloques se localizan desde el selector o la búsqueda local;
- cada integrante localiza los tres elementos cronometrados en menos de dos
  minutos;
- no hay contenido cortado ni scroll horizontal de página;
- encabezados, listas y enlaces conservan jerarquía y legibilidad;
- ninguna información depende de una animación, color o icono.

## Escenario 6 — CTA y regresión de 001

### Sin sesión

1. Desde la guía, activar “Evaluar una interacción”.
2. Confirmar la redirección a `/login`.
3. Iniciar sesión con una cuenta de prueba válida.

Resultado esperado: después del login se abre `/evaluar`, no la guía ni una ruta
nueva.

### Con sesión

1. Abrir `/aprendizaje` autenticado.
2. Activar el mismo CTA.

Resultado esperado: se abre directamente el formulario existente de `/evaluar`.
La guía no precarga contenido ni dispara un request de evaluación. Un smoke test
del recorrido 001 confirma que evaluación inicial y reevaluación mantienen su
contrato y comportamiento.

## Criterio de cierre

La feature está lista para validación humana cuando lint y build pasan, los seis
escenarios anteriores cumplen sus resultados y no se observan requests de
contenido, cambios backend, persistencia ni nuevas dependencias.
