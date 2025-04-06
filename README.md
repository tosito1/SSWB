# Museo Arqueológico de Granada - Proyecto Web

Este proyecto es una recreación del sitio web del Museo Arqueológico y Etnológico de Granada, desarrollado como parte de las prácticas de la asignatura de Sistemas Software Basados en Web (SSBW).

## Descripción

El proyecto consiste en una aplicación web que muestra información sobre el Museo Arqueológico de Granada, incluyendo sus obras singulares, historia, servicios, y más. La aplicación está desarrollada utilizando Node.js, Express, Nunjucks como motor de plantillas, y Prisma ORM para la gestión de la base de datos.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript, Nunjucks
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT, Cookies
- **Logging**: Winston
- **Testing**: Playwright para pruebas end-to-end
- **Contenedores**: Docker para PostgreSQL
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

3. Configura las variables de entorno en `.env`:
   ```
   PORT=8000
   IN=development
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=sswb_obras
   DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"
   SECRET_KEY="tu_clave_secreta_muy_segura_para_jwt_tokens"
   ```

4. Inicia el contenedor Docker para PostgreSQL:
   ```bash
   docker-compose up -d
   ```

5. Configura la base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```

6. Crea usuarios de prueba:
   ```bash
   node prisma/seed.mjs
   ```

7. Inserta los datos de obras en la base de datos:
   ```bash
   node insertData.js
   ```

8. Inicia el servidor:
   ```bash
   npm run dev
   ```

9. Abre tu navegador y visita `http://localhost:8000`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática
- `npm run scrap`: Ejecuta el script de scraping para obtener datos del sitio web original
- `npm run visualizar`: Muestra un resumen de los datos obtenidos por el scraping
- `npm run seed`: Crea usuarios de prueba (admin y usuario normal)
- `npm run test`: Ejecuta las pruebas end-to-end con Playwright
- `npx prisma studio`: Abre una interfaz web para explorar y editar la base de datos
- `npx playwright show-report`: Muestra el informe de las pruebas de Playwright

## Estructura del Proyecto

- `/prisma`: Configuración de Prisma ORM y definición del modelo de datos
- `/public`: Archivos estáticos (CSS, JavaScript, imágenes)
- `/routes`: Controladores de rutas organizados por funcionalidad
- `/tests`: Pruebas end-to-end con Playwright
- `/views`: Plantillas Nunjucks para las vistas
- `index.mjs`: Punto de entrada de la aplicación
- `logger.mjs`: Configuración del sistema de logging
- `docker-compose.yml`: Configuración de Docker para PostgreSQL

## Credenciales de Prueba

### Administrador
- Correo: admin@ejemplo.com
- Contraseña: admin123

### Usuario Normal
- Correo: usuario@ejemplo.com
- Contraseña: usuario123

## Tareas Implementadas

1. **Tarea 1-3**: Implementación inicial del sitio web con Express y Nunjucks
2. **Tarea 4**: Búsqueda de piezas arqueológicas con PostgreSQL
3. **Tarea 5**: Autenticación con JWT y Cookies
4. **Tarea 6**: Logging con Winston y Testing con Playwright

Para más detalles sobre cada tarea, consulta los archivos README_Tarea_X.md correspondientes.

## Autor

[Tu nombre]

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT. 