# Proyecto: Sistema de Inscripción - Fundación CodeFuturo 🚀

Este documento detalla el paso a paso seguido para la construcción de la landing page de inscripción y su respectiva conexión a un webhook. Para cada etapa del desarrollo, se incluye el **prompt** que puedes utilizar para replicar o generar cada parte del proyecto utilizando Inteligencia Artificial.

---

## 🛠️ Paso 1: Estructura Base y Semántica (HTML)

**Objetivo:** Crear el esqueleto semántico de la landing page, asegurando la accesibilidad y una estructura limpia para el formulario, las tarjetas de presentación y los contadores estadísticos.

**Prompt utilizado / sugerido:**
> "Crea la estructura HTML5 para una landing page de inscripción a talleres de programación gratuitos de la 'Fundación CodeFuturo'. Incluye un header con el logo, una sección 'hero' con un título llamativo, una sección para mostrar tarjetas de talleres disponibles, un formulario de registro completo (nombre, documento, correo, teléfono y selector de taller) con mensajes de error ocultos, y una sección final con contadores de estadísticas. Usa etiquetas semánticas de HTML5, atributos de accesibilidad (aria-labels, roles) y asegúrate de dejar contenedores preparados para modales interactivos y alertas toast."

---

## 🎨 Paso 2: Diseño y Estilos Modernos (CSS)

**Objetivo:** Darle vida a la interfaz usando diseño moderno (UI/UX), colores vibrantes, tipografía atractiva (Google Fonts), diseño responsive y variables CSS.

**Prompt utilizado / sugerido:**
> "Escribe la hoja de estilos (CSS puro) para la landing page creada. Quiero un diseño que transmita modernidad y tecnología (estética premium). Utiliza variables de CSS para manejar una paleta de colores vibrantes (por ejemplo, tonos oscuros con acentos en violeta y degradados). Aplica principios de diseño adaptativo (responsive design) usando Flexbox y CSS Grid. Añade estados hover para botones e inputs, y asegúrate de que el formulario tenga un estilo limpio y profesional."

---

## ✨ Paso 3: Animaciones e Interactividad Visual (Vanilla JS)

**Objetivo:** Implementar interactividad avanzada en la interfaz para deslumbrar al usuario (partículas, tilt effect, scroll reveal, contadores numéricos).

**Prompt utilizado / sugerido:**
> "Escribe la lógica en Vanilla JavaScript para añadir efectos visuales a la página. Necesito lo siguiente: 
> 1. Un sistema de partículas flotantes animadas renderizadas en un elemento `<canvas>` para el fondo.
> 2. Una función que utilice `IntersectionObserver` para revelar elementos suavemente a medida que se hace scroll hacia abajo.
> 3. Animación de los contadores estadísticos (que suban numéricamente desde 0 hasta su valor objetivo al ser visibles).
> 4. Un efecto de inclinación 3D (tilt effect) al pasar el cursor sobre las tarjetas de los talleres."

---

## 🧠 Paso 4: Lógica de Negocio y Validación del Formulario (Vanilla JS)

**Objetivo:** Validar los campos del formulario en tiempo real, manejar cupos limitados y almacenar temporalmente los registros de forma local para simular una base de datos.

**Prompt utilizado / sugerido:**
> "Añade la lógica funcional en Vanilla JavaScript para el formulario de inscripción. 
> 1. Implementa validaciones en tiempo real para todos los campos (nombre, documento, correo, teléfono) usando expresiones regulares.
> 2. Crea un catálogo de talleres con fechas y un límite de cupos. 
> 3. Al enviar el formulario con éxito, guarda los datos en el `localStorage`, reduce los cupos disponibles y muestra un modal interactivo de éxito en el DOM.
> 4. Añade un efecto de explosión de confeti en la pantalla al confirmar la inscripción exitosamente."

---

## 🔗 Paso 5: Conexión con el Webhook (N8N) vía Fetch

**Objetivo:** Integrar el formulario frontend con el endpoint (Webhook) para que los datos del usuario viajen al servidor/flujo de automatización.

**Prompt utilizado / sugerido:**
> "Conecta el formulario principal de esta vista al siguiente endpoint (Webhook de n8n): `https://miguel0328.app.n8n.cloud/webhook-test/1112091381092h12u13ui2bjk3b1km23k1ñ3k1pom3ñl1m23ñm1ñ3m`. Requisitos de implementación en Vanilla JS: Identifica el ID del formulario y agrega un 'Event Listener' para interceptar el 'submit' usando `e.preventDefault()`. Extrae los valores de los inputs existentes y construye un objeto de datos (payload). Ejecuta una petición HTTP POST hacia la URL indicada utilizando la API fetch nativa. Define el header 'Content-Type': 'application/json' y serializa el payload en el body. Implementa un bloque try/catch para el control de la promesa. Gestiona el estado de la interfaz: deshabilita el botón de envío mientras se resuelve la petición e inserta un mensaje de éxito o error en el DOM al finalizar."

---

> **Nota:** Puedes usar estos prompts exactamente como están escritos en un modelo de Inteligencia Artificial de código (como Claude, GPT-4, o Gemini) de manera secuencial para obtener un proyecto idéntico a este de principio a fin.
# Formulario-n8n
# Formulario-n8n
