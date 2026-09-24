# Contexto base del proyecto para la Hackathon

## 1. Contexto general

Somos un equipo de estudiantes de programación que se está preparando para participar en una **hackathon de programación de 24 horas**.

La hackathon consiste en desarrollar una solución tecnológica para una problemática similar a las propuestas oficialmente por la organización. Las categorías de referencia incluyen:

1. **Seguridad Ciudadana**: plataformas colaborativas para reportes de incidentes, mapas de riesgo, estadísticas y alertas.
2. **Economía y Sociedad**: plataformas que conecten emprendedores con inversores.
3. **Producción y Ambiente**: sistemas integrales para la gestión agropecuaria y monitoreo de variables.
4. **Educación**: plataformas de tutoría inteligente y aprendizaje personalizado.
5. **Salud**: comunidades o redes de apoyo para personas con enfermedades crónicas.

Estas problemáticas sirven como referencia del tipo de desafío que podemos recibir durante la competencia. La problemática concreta de la hackathon puede requerir adaptar rápidamente nuestra solución.

---

## 2. Equipo

El equipo está formado actualmente por:

- **Gastón Encina**
- **Martino Lotto**

Somos estudiantes de programación y todavía estamos en proceso de aprendizaje. No debemos asumir que conocemos todas las mejores prácticas, arquitecturas o decisiones ideales para una hackathon.

Por eso, cuando una IA trabaje con este proyecto, debe ayudarnos también a evaluar si nuestras decisiones son apropiadas para una competencia de solo 24 horas.

---

## 3. Estrategia para la hackathon

Nuestra estrategia es **no comenzar completamente desde cero durante la hackathon**.

Estamos preparando de antemano un **módulo/proyecto base reutilizable** que podamos llevar a la competencia y adaptar rápidamente a la problemática que nos toque.

La idea es tener resuelta previamente la infraestructura más genérica y repetitiva de una aplicación web moderna, para dedicar durante la hackathon la mayor cantidad de tiempo posible a:

- entender la problemática;
- diseñar la solución;
- implementar las funcionalidades específicas;
- adaptar la interfaz;
- preparar la demo;
- mejorar la presentación final.

El módulo prehecho todavía está en desarrollo.

### Importante

Todavía **no sabemos exactamente qué funcionalidades conviene dejar preparadas de antemano**.

Necesitamos que la IA nos ayude a distinguir entre:

- funcionalidades genéricas que vale la pena llevar prehechas;
- funcionalidades que probablemente dependan demasiado de la problemática;
- cosas que podrían hacernos perder tiempo innecesariamente;
- elementos que pueden dar una ventaja real en una hackathon de 24 horas.

La prioridad debe ser siempre **velocidad de adaptación + estabilidad + facilidad para demostrar el producto**.

---

## 4. Arquitectura actual

El proyecto está separado principalmente en:

```text
Frontend
Backend
Base de datos
Chatbot / IA
```

La arquitectura todavía puede cambiar si existe una alternativa claramente mejor para el contexto de una hackathon.

---

## 5. Frontend

El frontend está desarrollado con:

- **React**
- **Vite**
- JavaScript
- Arquitectura basada en **componentes**

La aplicación busca reutilizar componentes para poder modificar rápidamente:

- páginas;
- formularios;
- dashboards;
- tarjetas;
- navegación;
- autenticación;
- vistas específicas de cada problemática.

Además, el frontend utiliza la librería oficial de **Supabase** para comunicarse con los servicios que necesitemos de Supabase.

---

## 6. Base de datos y servicios

La plataforma utiliza:

### Supabase

Supabase se está utilizando como parte principal de la infraestructura del proyecto.

Puede encargarse, dependiendo de lo que necesitemos, de:

- base de datos PostgreSQL;
- autenticación;
- gestión de usuarios;
- almacenamiento;
- consultas desde el frontend;
- otros servicios disponibles dentro de Supabase.

No hay que asumir que todas estas funciones ya están completamente implementadas.

---

## 7. Backend

El proyecto también contempla una capa de **backend**.

Su función exacta puede variar dependiendo de la problemática.

El backend debería utilizarse principalmente cuando exista lógica que:

- no convenga ejecutar directamente en el frontend;
- necesite ocultar claves o credenciales;
- necesite validar información;
- necesite integrar APIs externas;
- necesite procesar datos;
- necesite comunicarse con otros servicios;
- requiera reglas de negocio más complejas.

Como estamos trabajando para una hackathon de 24 horas, evitar complejidad innecesaria.

Si algo puede resolverse de forma simple y segura con Supabase sin agregar backend adicional, evaluar esa opción.

---

## 8. Chatbot / Inteligencia Artificial

Queremos llevar preparada una funcionalidad de chatbot.

La solución elegida actualmente es:

### AnythingLLM

AnythingLLM ya está prácticamente configurado e integrado con nuestro frontend.

La intención es poder reutilizarlo durante la hackathon para construir rápidamente funcionalidades como:

- asistente dentro de la plataforma;
- preguntas sobre documentación;
- orientación al usuario;
- consulta de información;
- chatbot especializado según la problemática;
- RAG sobre documentos;
- ayuda contextual.

Durante la hackathon, el comportamiento del chatbot deberá adaptarse a la problemática específica.

No debemos agregar IA simplemente porque sí.

La IA debe aportar una función clara dentro de la solución.

---

## 9. Estado actual

Actualmente ya estamos trabajando en el módulo base que llevaremos a la hackathon.

Tenemos adelantadas o en preparación las siguientes áreas:

- estructura del frontend;
- React + Vite;
- organización mediante componentes;
- conexión con Supabase;
- base de datos;
- autenticación y lógica relacionada;
- backend;
- integración de AnythingLLM;
- chatbot integrado en el frontend.

Algunas de estas partes pueden estar incompletas o sujetas a cambios.

---

## 10. Nuestra principal duda actual

No somos expertos todavía en desarrollo de software ni en hackathons.

Por lo tanto, nuestra principal incertidumbre es:

> **¿Qué debería tener exactamente nuestro módulo prehecho para darnos la mayor ventaja posible durante una hackathon de 24 horas sin construir funcionalidades inútiles o demasiado específicas?**

Cada recomendación debe considerar esta pregunta.

---

## 11. Criterios para tomar decisiones

Cuando propongas una tecnología, funcionalidad o cambio, evaluarla principalmente según estos criterios:

1. **Tiempo de implementación**
2. **Facilidad de reutilización**
3. **Facilidad de adaptación**
4. **Estabilidad**
5. **Complejidad**
6. **Valor para la demo**
7. **Valor real para resolver la problemática**
8. **Riesgo de errores durante la hackathon**
9. **Facilidad para que dos estudiantes puedan mantenerlo**
10. **Impacto en las 24 horas disponibles**

Evitar sobreingeniería.

Preferir una solución que funcione bien y pueda demostrarse claramente antes que una arquitectura demasiado compleja.

---

## 12. Cómo debe ayudarnos una IA

Cuando una IA reciba este archivo como contexto, debe actuar como:

- asesor técnico;
- arquitecto de software;
- mentor de hackathon;
- revisor de decisiones;
- apoyo para frontend;
- apoyo para backend;
- apoyo para Supabase;
- apoyo para integración de IA;
- apoyo para priorización de funcionalidades.

No debe limitarse a responder exactamente lo que preguntamos.

Si detecta que estamos implementando algo que:

- no aporta valor;
- es demasiado complejo;
- puede hacerse de forma más rápida;
- puede generar problemas durante la hackathon;
- debería prepararse antes;
- debería dejarse para cuando conozcamos la problemática;

debe indicarlo claramente y explicar por qué.

---

## 13. Forma esperada de las recomendaciones

Cuando recomendemos agregar algo al módulo base, preferimos que la IA indique:

### Funcionalidad
Qué se propone agregar.

### Por qué sería útil
Qué problema resuelve durante la hackathon.

### ¿Conviene llevarlo prehecho?
Responder:

- **Sí**
- **No**
- **Depende**

### Prioridad
Clasificar como:

- **Crítica**
- **Alta**
- **Media**
- **Baja**

### Tiempo aproximado
Una estimación general de cuánto trabajo puede requerir.

### Riesgos
Qué podría complicarse.

### Implementación mínima viable
Cuál sería la versión más simple que deberíamos preparar.

---

## 14. Filosofía del proyecto

La meta del módulo base no es construir un producto terminado antes de conocer el desafío.

La meta es construir una **base tecnológica flexible** que permita convertir una problemática en un prototipo funcional lo más rápido posible.

Pensar siempre en:

> **¿Esto nos ayuda a llegar más rápido desde “nos dieron la problemática” hasta “tenemos una demo funcional”?**

Si la respuesta es no, probablemente no sea prioritario.

---

## 15. Restricción principal

La hackathon dura aproximadamente:

# 24 horas

Todas las decisiones técnicas deben respetar esta restricción.

El tiempo disponible debe repartirse entre:

- análisis de la problemática;
- ideación;
- diseño;
- programación;
- integración;
- pruebas;
- corrección de errores;
- preparación de datos;
- demo;
- pitch/presentación.

Por lo tanto, cualquier recomendación debe priorizar el desarrollo rápido y demostrable.

---

## 16. Instrucción final para la IA

Utiliza este documento como **contexto permanente del proyecto**.

Cuando respondas preguntas relacionadas con nuestra hackathon:

1. Ten en cuenta que somos dos estudiantes.
2. Ten en cuenta que la competencia dura 24 horas.
3. Ten en cuenta que estamos construyendo un módulo reutilizable antes de conocer la problemática exacta.
4. Evalúa si lo que proponemos realmente conviene preparar previamente.
5. Evita sobreingeniería.
6. Prioriza soluciones simples, rápidas y demostrables.
7. Ayúdanos a identificar qué partes deberían ser genéricas y cuáles deberían implementarse después de conocer el desafío.
8. Si nuestra idea es técnicamente innecesaria o poco conveniente para una hackathon, indícalo.
9. Siempre que sea posible, propone primero una versión mínima viable.
10. Considera la arquitectura actual:

```text
Frontend: React + Vite
Base de datos / servicios: Supabase
Backend: capa propia cuando sea necesaria
Chatbot / IA: AnythingLLM
```

El objetivo final es conseguir una base suficientemente flexible como para adaptarla rápidamente a cualquiera de las problemáticas posibles de la hackathon.
