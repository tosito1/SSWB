# Tarea 4: Implementación de rutas y controladores

## Descripción

En esta tarea, se han implementado las rutas y controladores de la aplicación, conectando el frontend con la base de datos y proporcionando la funcionalidad necesaria para mostrar la información del museo.

## Implementación

### 1. Estructura de Rutas

Se ha implementado una estructura de rutas que sigue la organización del sitio web original:

- **Página de inicio**: `/`
- **Información general**:
  - Contacto: `/contacto`
  - Acceso: `/acceso`
  - Servicios: `/servicios`
- **Colecciones**:
  - Obras singulares: `/obras-singulares`
  - Detalle de obra: `/obras-singulares/:id`
- **Otras secciones**:
  - Historia: `/historia`
  - Actualidad: `/actualidad`
  - Difusión: `/difusión`
  - Enlaces: `/enlaces`
  - Mapa web: `/mapa-web`

### 2. Controladores

Se han implementado controladores para cada ruta, que se encargan de:

- Obtener los datos necesarios de la base de datos
- Preparar los datos para la vista
- Renderizar la plantilla correspondiente con los datos

### 3. Integración con Prisma

Se ha integrado Prisma Client en los controladores para consultar la base de datos:

```javascript
// Ejemplo de consulta a la base de datos
const obras = await prisma.obra.findMany();
```

### 4. Manejo de Errores

Se ha implementado un sistema de manejo de errores que:

- Captura excepciones en las consultas a la base de datos
- Muestra páginas de error apropiadas (404, 500)
- Registra errores en la consola para facilitar la depuración

```javascript
try {
  // Código que puede generar errores
} catch (error) {
  console.error('Error:', error);
  res.status(500).render('error.njk', {
    titulo: 'Error',
    mensaje: 'Ha ocurrido un error al procesar la solicitud'
  });
}
```

### 5. Middleware

Se han implementado middleware para:

- Servir archivos estáticos
- Procesar parámetros de URL
- Manejar rutas no encontradas (404)

## Archivos Principales

- `index.mjs`: Archivo principal que define las rutas y controladores
- `prisma/client`: Cliente de Prisma para consultar la base de datos

## Resultados

La implementación de rutas y controladores ha permitido:

- Conectar el frontend con la base de datos
- Proporcionar una navegación fluida entre las diferentes secciones del sitio
- Mostrar la información de las obras singulares y otras secciones del museo
- Manejar errores de manera adecuada

La aplicación ahora funciona como una réplica del sitio web original del Museo Arqueológico de Granada, con la capacidad de mostrar todas las obras singulares y la información relacionada. 