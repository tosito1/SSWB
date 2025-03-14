# Tarea 3: Desarrollo del frontend con Nunjucks

## Descripción

En esta tarea, se ha implementado el frontend de la aplicación utilizando Nunjucks como motor de plantillas, siguiendo el diseño y estructura del sitio web original del Museo Arqueológico de Granada.

## Implementación

### 1. Configuración de Nunjucks

Se ha configurado Nunjucks como motor de plantillas en la aplicación Express:

```javascript
const nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: isDev
});
```

### 2. Estructura de Plantillas

Se ha creado una estructura de plantillas que incluye:

- **Layout base**: Plantilla base que define la estructura común de todas las páginas
- **Partials**: Componentes reutilizables como cabecera, pie de página, navegación, etc.
- **Páginas específicas**: Plantillas para cada sección del sitio web

### 3. Filtros Personalizados

Se han implementado filtros personalizados para Nunjucks:

- **truncate**: Para acortar textos largos
- **date**: Para formatear fechas en diferentes formatos

```javascript
// Filtro para truncar texto
nunjucksEnv.addFilter('truncate', function(str, length) {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
});

// Filtro para formatear fechas
nunjucksEnv.addFilter('date', function(date, format) {
  // Implementación del filtro
});
```

### 4. Estilos y Diseño Responsivo

Se han creado hojas de estilo CSS para replicar el diseño del sitio web original, con las siguientes características:

- Diseño responsivo que se adapta a diferentes tamaños de pantalla
- Paleta de colores y tipografía similar al sitio original
- Componentes estilizados para mostrar obras, noticias, etc.

### 5. Plantillas Principales

Se han desarrollado las siguientes plantillas principales:

- `index.njk`: Página de inicio
- `obras-singulares.njk`: Listado de obras singulares
- `obra-detalle.njk`: Detalle de una obra singular
- `contacto.njk`, `acceso.njk`, `servicios.njk`: Páginas de información
- `historia.njk`, `colecciones.njk`: Páginas sobre el museo y sus colecciones
- `404.njk`: Página de error 404

## Archivos Principales

- `views/`: Directorio con todas las plantillas Nunjucks
- `public/css/`: Hojas de estilo CSS
- `public/js/`: Scripts JavaScript para el frontend
- `public/img/`: Imágenes y recursos gráficos

## Resultados

El desarrollo del frontend con Nunjucks ha permitido:

- Crear una interfaz de usuario similar al sitio web original
- Implementar un diseño responsivo que se adapta a diferentes dispositivos
- Mostrar la información de las obras singulares de manera atractiva
- Facilitar la navegación entre las diferentes secciones del sitio

Las plantillas Nunjucks permiten una separación clara entre la lógica de la aplicación y la presentación, lo que facilita el mantenimiento y la evolución del sitio web. 