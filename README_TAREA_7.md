# Tarea 7: Implementación de API REST

## Descripción de la Tarea

En esta tarea se han implementado varios endpoints de una API REST para ser utilizados en tareas posteriores. Los endpoints implementados son:

- `GET /api/usuario/correo` - Para comprobar si existe o no un usuario
- `GET /api/obra/cuantas` - Devuelve el número total de obras
- `GET /api/obra/?desde=0&hasta=10` - Para implementar un paginador
- `GET /api/obra/12` - Devuelve los datos de la obra con id 12
- `DELETE /api/obra/12` - Borra la obra con id 12

## Archivos Creados/Modificados

### 1. Creación del Router API (`routes/api.mjs`)

Se ha creado un nuevo archivo de router para manejar todas las rutas de la API. Este archivo contiene la implementación de todos los endpoints solicitados, siguiendo la documentación de Prisma y manejando adecuadamente los posibles errores al acceder a la base de datos.

### 2. Modificación del Archivo Principal (`index.mjs`)

Se ha actualizado el archivo principal de la aplicación para importar y configurar el nuevo router de la API:

### 3. Creación de Archivo de Prueba (`test-api.http`)

Se ha creado un archivo de prueba para facilitar la verificación y depuración de la API utilizando la extensión REST Client de VSCode

## Detalles de Implementación

### Estructura de Respuestas

Todas las respuestas de la API siguen una estructura consistente:

- **Respuestas exitosas**: Código de estado 200 y un objeto JSON con `{ok: true, data: ...}`
- **Respuestas de error**: Código de estado apropiado (400, 404, 500) y un objeto JSON con `{ok: false, msg: "mensaje de error"}`

### Manejo de Errores

Se ha implementado un manejo adecuado de errores para todas las operaciones de base de datos, capturando excepciones y proporcionando mensajes de error descriptivos.

### Validación de Parámetros

Para los endpoints que requieren parámetros (como el paginador), se realiza una validación de los parámetros recibidos para evitar comportamientos inesperados.

## Pruebas

Para probar la API, se puede utilizar el archivo `test-api.http` con la extensión REST Client de VSCode. Este archivo contiene ejemplos de solicitudes para cada uno de los endpoints implementados.
