# Reglas de maquetado — Home

## Propósito

El Home es una landing de presentación para una aplicación de prevención digital. Explica por qué conviene detenerse y verificar antes de actuar ante una interacción sospechosa. No ejecuta evaluaciones ni promete detección automática o protección total.

## Estructura

1. Navegación transparente: wordmark temporal **A tiempo**, enlaces a `#evaluar` y `#aprender`, ingreso secundario y un único CTA lleno: **Crear cuenta**.
2. Hero en dos columnas: titular preventivo, explicación breve, CTA y visualización decorativa de señales interconectadas.
3. Declaración de problema: la apariencia no siempre alcanza.
4. Tres situaciones narrativas: cuenta conocida, urgencia inesperada y oferta convincente.
5. Método de aprendizaje: detenerse, observar contexto y contrastar por un canal independiente.
6. Cierre con un único CTA de registro.

## Sistema visual

- Fondo único: `#000000`. No usar tarjetas, sombras, paneles gris oscuro ni gradientes de interfaz.
- Texto primario blanco; secundarios `#a8a8aa` / `#d6d6d8`; ámbar `#ffb829` solo para énfasis preventivo; violeta `#8052ff` solo para CTA principal y foco de marca; teal `#15846e` como señal decorativa secundaria.
- Mantener Geist Variable hasta contar con la fuente de marca. Titulares en peso 400, tracking entre `-0.025em` y `-0.04em`; cuerpos ligeros, mínimo 16px en móvil y 18px en escritorio.
- Espacio generoso, máximo de contenido de 1280px. La jerarquía se consigue con escala, contraste y vacío, nunca mediante recuadros.
- El visual principal debe ser geometría abstracta liviana (partículas, órbitas, conexiones), no fotografía, candados gigantes, código decorativo ni estética hacker.

## Responsive, interacción y accesibilidad

- Desktop usa hero de dos columnas; debajo de 800px se apila texto y visual. Nunca provocar scroll horizontal.
- En móvil, conservar primero el mensaje y CTA; ocultar enlaces secundarios de navegación si falta espacio, no acciones de registro.
- Cada control tiene área mínima de 44px, estados hover/active y foco visible ámbar. Añadir un enlace “Ir al contenido principal”.
- Mantener orden semántico de títulos `h1 → h2 → h3`; el visual decorativo lleva `aria-hidden="true"`.
- Respetar `prefers-reduced-motion`: las partículas y transiciones deben quedarse estáticas o prácticamente instantáneas.
- Verificar en 375px, 768px, 1024px y 1440px; el contraste de texto normal debe ser al menos 4.5:1.

## Límites de contenido

- Hablar de mensajes, enlaces, ofertas y perfiles sin afirmar que toda interacción sospechosa sea fraude.
- Invitar a contrastar mediante fuentes y canales conocidos e independientes.
- Evitar miedo, promesas absolutas, estadísticas no fundamentadas y lenguaje técnico innecesario.
