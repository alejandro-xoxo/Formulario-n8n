# Proyecto: Sistema de Inscripción - Fundación CodeFuturo 🚀

**🔗 Link al proyecto funcional:** [https://alejandro-xoxo.github.io/Formulario-n8n/](https://alejandro-xoxo.github.io/Formulario-n8n/)
**📊 Hoja de Control (Google Sheets):** [Ver base de datos generada](https://docs.google.com/spreadsheets/d/1Smkp6ehhyqS3T5Wg0V9Cvynt46YILuRbUSLVKA-BPi8/edit?usp=sharing)
> 💡 **¡El flujo de n8n está activo!** Puedes entrar a la página, llenar el formulario y probar el envío de datos sin necesidad de descargar ni instalar nada localmente. Los datos enviados se pueden ver en la hoja de control enlazada arriba.

Este documento detalla el paso a paso seguido para la construcción de la landing page de inscripción y su respectiva conexión a un webhook. Para cada etapa del desarrollo, se incluye el **prompt** que puedes copiar y pegar para replicar o generar cada parte del proyecto utilizando Inteligencia Artificial.

---

## 🛠️ Paso 1: Estructura Base y Semántica (HTML)

**Objetivo:** Crear el esqueleto semántico de la landing page, asegurando la accesibilidad y una estructura limpia para el formulario, las tarjetas de presentación y los contadores estadísticos.

**Prompt utilizado / sugerido:**
```text
Crea la estructura HTML5 para una landing page de inscripción a talleres de programación gratuitos de la 'Fundación CodeFuturo'. Incluye un header con el logo, una sección 'hero' con un título llamativo, una sección para mostrar tarjetas de talleres disponibles, un formulario de registro completo (nombre, documento, correo, teléfono y selector de taller) con mensajes de error ocultos, y una sección final con contadores de estadísticas. Usa etiquetas semánticas de HTML5, atributos de accesibilidad (aria-labels, roles) y asegúrate de dejar contenedores preparados para modales interactivos y alertas toast.
```

---

## 🎨 Paso 2: Diseño y Estilos Modernos (CSS)

**Objetivo:** Darle vida a la interfaz usando diseño moderno (UI/UX), colores vibrantes, tipografía atractiva (Google Fonts), diseño responsive y variables CSS.

**Prompt utilizado / sugerido:**
```text
Escribe la hoja de estilos (CSS puro) para la landing page creada. Quiero un diseño que transmita modernidad y tecnología (estética premium). Utiliza variables de CSS para manejar una paleta de colores vibrantes (tonos muy oscuros de fondo con acentos en violeta brillante y degradados neón). Aplica principios de diseño adaptativo (responsive design) usando Flexbox y CSS Grid. Añade estados hover para botones e inputs, usa efecto 'glassmorphism' para las tarjetas, y asegúrate de que el formulario tenga un estilo limpio y profesional.
```

---

## ✨ Paso 3: Animaciones e Interactividad Visual (Vanilla JS)

**Objetivo:** Implementar interactividad avanzada en la interfaz para deslumbrar al usuario (partículas, tilt effect, scroll reveal, contadores numéricos).

**Prompt utilizado / sugerido:**
```text
Escribe la lógica en Vanilla JavaScript para añadir efectos visuales a la página. Necesito lo siguiente: 
1. Un sistema de partículas flotantes animadas renderizadas en un elemento <canvas> para el fondo.
2. Una función que utilice IntersectionObserver para revelar elementos suavemente a medida que se hace scroll hacia abajo.
3. Animación de los contadores estadísticos (que suban numéricamente desde 0 hasta su valor objetivo al ser visibles).
4. Un efecto de inclinación 3D (tilt effect) al pasar el cursor sobre las tarjetas de los talleres.
```

---

## 🧠 Paso 4: Lógica del Formulario y Validación (Vanilla JS)

**Objetivo:** Validar los campos del formulario en tiempo real en el frontend para asegurar que los datos estén correctos antes de enviarlos.

**Prompt utilizado / sugerido:**
```text
Añade la lógica funcional en Vanilla JavaScript para el formulario de inscripción. 
1. Implementa validaciones en tiempo real para todos los campos (nombre, documento, correo, teléfono) usando expresiones regulares.
2. Crea un catálogo de los 3 lenguajes principales con sus respectivas capacidades (Python: 2 cupos, JavaScript: 8 cupos, HTML & CSS: 10 cupos) y fechas para poblar el selector de talleres.
3. Añade animaciones de error (como un botón temblando si hay campos vacíos o inválidos al intentar enviar).
4. Implementa una función para mostrar un modal con un mensaje en pantalla, y añade un efecto de explosión de confeti en la pantalla en caso de una respuesta exitosa.
```

---

## 🔗 Paso 5: Conexión con el Webhook (N8N) vía Fetch

**Objetivo:** Integrar el formulario frontend con el endpoint (Webhook) para que los datos del usuario viajen al flujo de automatización en n8n.

**Prompt utilizado / sugerido:**
```text
Conecta el formulario principal de esta vista al siguiente endpoint (Webhook de n8n): https://miguel0328.app.n8n.cloud/webhook/1112091381092h12u13ui2bjk3b1km23k1ñ3k1pom3ñl1m23ñm1ñ3m. Requisitos de implementación en Vanilla JS: 
Identifica el ID del formulario y agrega un 'Event Listener' para interceptar el 'submit' usando e.preventDefault(). Extrae los valores de los inputs existentes y construye un objeto de datos (payload). Ejecuta una petición HTTP POST hacia la URL indicada utilizando la API fetch nativa. Define el header 'Content-Type': 'application/json' y serializa el payload en el body. Implementa un bloque try/catch para el control de la promesa. Gestiona el estado de la interfaz: deshabilita el botón de envío mientras se resuelve la petición e inserta el modal de éxito (con confeti) o error en el DOM al finalizar.
```

---

> **Nota:** Puedes copiar estos prompts y utilizarlos en un modelo de Inteligencia Artificial (como Gemini, Claude o ChatGPT) para reconstruir o adaptar un proyecto idéntico a este de principio a fin.
