# Tarea 11: Portada del Museo con Astro, React, Tailwind y shadcn/ui

## Descripción
En esta tarea se ha desarrollado una portada moderna y responsiva para el Museo Arqueológico usando el metaframework **Astro** junto con **React**, **Tailwind CSS** y la librería de componentes **shadcn/ui**. Los datos de las obras se obtienen dinámicamente desde el API Node.js desarrollado en la Tarea 7.

## Pasos realizados

### 1. Configuración del backend (Node.js)
- Se habilitó CORS para permitir peticiones desde el frontend Astro.
- El endpoint `/api/obra` expone las obras de la base de datos en formato paginado.

### 2. Instalación y configuración del frontend (Astro)
- Se instalaron las dependencias necesarias: `@astrojs/react`, `swr`, `@shadcn/ui`, `react`, `react-dom` y `tailwindcss`.
- Se configuró el alias `@` en `tsconfig.json` para facilitar las importaciones.
- Se inicializó shadcn/ui y se añadieron los componentes `Card` y `Button`.

### 3. Estructura de la portada
- Se creó un layout principal y dos componentes React:
  - `Menu`: barra de navegación superior.
  - `Contenido`: muestra las obras usando SWR para el fetch y tarjetas visuales con shadcn/ui.
- El componente `Contenido` incluye:
  - Cabecera visual destacada.
  - Botón para recargar las obras.
  - Tarjetas de obra con imagen, título, procedencia, descripción y botón de detalle.
  - Diseño responsivo y moderno usando flexbox y utilidades de Tailwind.

### 4. Mejoras visuales
- Las imágenes de las obras están centradas y no ocupan todo el alto de la tarjeta.
- Las tarjetas tienen bordes, fondo degradado, sombra y animación al pasar el ratón.
- El diseño es limpio, accesible y adaptable a cualquier dispositivo.

## Cómo probarlo
1. Arranca el backend Node.js (`npm start` o el comando correspondiente).
2. Arranca el frontend Astro (`npm run dev` en la carpeta `frontend`).
3. Accede a la portada en `http://localhost:4321`.

## Notas
- El frontend consume el endpoint `/api/obra?desde=0&hasta=30` para mostrar las obras.
- Si se añaden más obras, el botón "Recargar" permite actualizar la vista sin recargar la página.
- El diseño puede personalizarse fácilmente modificando los componentes React y las clases de Tailwind.

---
**Autor:** [Tu Nombre]
**Fecha:** Junio 2025
