# Museo Arqueológico de Granada - Proyecto Web

Este proyecto es una recreación del sitio web del Museo Arqueológico y Etnológico de Granada, desarrollado como parte de las prácticas de la asignatura de Sistemas Software Basados en Web (SSBW).

## Descripción

El proyecto consiste en una aplicación web que muestra información sobre el Museo Arqueológico de Granada, incluyendo sus obras singulares, historia, servicios, y más. La aplicación está desarrollada utilizando Node.js, Express, Nunjucks como motor de plantillas, y Prisma ORM para la gestión de la base de datos.

## Estructura del Proyecto

El proyecto está organizado en varias tareas, cada una con su propio README.md que explica lo que se ha implementado:

- [Tarea 1: Configuración inicial y scraping de datos](./tareas/tarea1/README.md)
- [Tarea 2: Configuración de la base de datos y ORM](./tareas/tarea2/README.md)
- [Tarea 3: Desarrollo del frontend con Nunjucks](./tareas/tarea3/README.md)
- [Tarea 4: Implementación de rutas y controladores](./tareas/tarea4/README.md)

## Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript, Nunjucks
- **Base de Datos**: SQLite con Prisma ORM
- **Herramientas**: Playwright (para scraping)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Inserta los datos en la base de datos:
   ```bash
   node insertData.js
   ```

5. Inicia el servidor:
   ```bash
   npm run dev
   ```

6. Abre tu navegador y visita `http://localhost:8000`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática
- `npm run scrap`: Ejecuta el script de scraping para obtener datos del sitio web original
- `npm run visualizar`: Muestra un resumen de los datos obtenidos por el scraping
- `npx prisma studio`: Abre una interfaz web para explorar y editar la base de datos

## Autor

[Tu Nombre]

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT. 