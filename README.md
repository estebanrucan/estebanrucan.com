# Neural Interface Portfolio v2.0

> **Estado del Sistema:** ONLINE
> **Operador:** Esteban Rucán (Data Scientist & AI Engineer)

## 🌌 Descripción General

Este proyecto es un portafolio web interactivo y altamente inmersivo diseñado con una estética **Cyberpunk / Sci-Fi**. Simula una "Interfaz Neural" que permite a los usuarios explorar la trayectoria profesional, habilidades y proyectos del autor a través de una experiencia visual y auditiva única.

El núcleo de la aplicación es una visualización de nodos interactivos renderizados en un Canvas HTML5, acompañados de efectos de sonido (SFX), música de fondo y animaciones CSS avanzadas (efectos CRT, glitches, scanlines).

## 🚀 Características Principales

-   **Secuencia de Arranque (Boot Sequence):** Simulación de carga de sistema operativo con logs de terminal y verificaciones de integridad.
-   **Navegación Nodal 3D (Simulada):** Interfaz basada en nodos conectados que reaccionan al cursor y permiten "desencriptar" (ver) información detallada.
-   **Motor de Audio (SFX):** Sistema de sonido personalizado para interacciones (hover, click, alarmas) utilizando la Web Audio API.
-   **Efectos Visuales Avanzados:**
    -   Estética de terminal retro-futurista.
    -   Animaciones de texto "desencriptado".
    -   Efectos de post-procesado CSS (Scanlines, RGB Shift).
-   **Modo Autodestrucción:** Una secuencia oculta que se activa al explorar todos los nodos, cambiando la atmósfera visual y auditiva del sitio.
-   **Diseño Responsivo:** Adaptación de la disposición de los nodos y la interfaz para dispositivos móviles y escritorio.

## 🛠️ Tecnologías Utilizadas

-   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
-   **Librería UI:** [React 18](https://react.dev/)
-   **Gráficos:** HTML5 Canvas API (renderizado 2d nativo sin librerías externas pesadas).
-   **Estilos:** CSS3 Puro (CSS Modules / Global CSS) con variables para theming.
-   **Audio:** Web Audio API nativa.

## 📂 Estructura del Proyecto

```bash
├── app/
│   ├── layout.js      # Layout raíz y metadatos
│   ├── page.js        # Punto de entrada principal
│   └── globals.css    # Estilos globales, variables CSS y efectos CRT
├── components/
│   └── NeuralInterface.js  # Componente principal (Lógica, Canvas, Audio, Estado)
├── public/            # Assets estáticos (imágenes, audio)
└── package.json       # Dependencias y scripts
```

## 💿 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd neural-interface
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000` en tu navegador.

4.  **Construir para producción:**
    ```bash
    npm run build
    npm start
    ```

## 🎮 Controles de la Interfaz

-   **Click:** Interactuar con nodos y botones.
-   **Hover:** Revelar etiquetas de nodos.
-   **Audio:** Controles en pantalla para Play/Pause, Volumen y Velocidad de reproducción.
-   **Mute:** Opción para silenciar la alarma en la secuencia final.

## 👤 Autor

**Esteban Rucán**
*Data Scientist | AI Engineer*

---
*System Integrity: 100%* | *End of Line.*
