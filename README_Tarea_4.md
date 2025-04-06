# Tarea 4: Aplicación de búsqueda de piezas arqueológicas

Esta tarea implementa una aplicación MPA (Multi-Page Application) con un sistema de búsqueda de piezas arqueológicas utilizando PostgreSQL con capacidades de búsqueda de texto completo.

## Configuración

### 1. Configurar PostgreSQL con Docker

Se utiliza Docker para ejecutar PostgreSQL. Asegúrate de tener Docker y Docker Compose instalados.

1. Configura las variables de entorno en el archivo `.env`:
   ```
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=sswb_obras
   DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"
   ```

2. Inicia el contenedor de PostgreSQL:
   ```bash
   docker-compose up -d
   ```

   En Windows con PowerShell (si hay problemas de permisos):
   ```
   cmd.exe /c "docker-compose up -d"
   ```

### 2. Migrar la base de datos

1. Elimina las migraciones anteriores de SQLite (si existían):
   ```bash
   rm -rf ./prisma/migrations
   ```

   En Windows:
   ```
   rd /s /q prisma\migrations
   ```

2. Crea nuevas migraciones para PostgreSQL:
   ```bash
   npx prisma migrate dev --name a_postgress
   ```

   En Windows (si hay problemas de permisos):
   ```
   cmd.exe /c "npx prisma migrate dev --name a_postgress"
   ```

3. Ejecuta el script de población de datos:
   ```bash
   node insertData.js
   ```

4. Puedes verificar la base de datos con Prisma Studio:
   ```bash
   npx prisma studio
   ```

## Estructura del proyecto

- `/routes`: Contiene los routers organizados por funcionalidad
- `/views`: Plantillas Nunjucks para renderizar las páginas
- `/prisma`: Esquema de Prisma y migraciones
- `index.mjs`: Archivo principal del servidor

## Funcionalidades implementadas

1. **Búsqueda de texto completo**: Utilizando las capacidades de búsqueda de texto de PostgreSQL para encontrar piezas por palabra clave.
2. **Formulario de búsqueda**: En la página principal con validación mediante expresiones regulares.
3. **Página de resultados**: Muestra los resultados de la búsqueda, ordenados por relevancia.

## Ejecución

Para iniciar la aplicación:

```bash
npm run dev
```

En Windows con PowerShell (si hay problemas de permisos):
```
cmd.exe /c "npm run dev"
```

La aplicación estará disponible en http://localhost:8000

## Problemas comunes y soluciones

### Error "Can't reach database server at localhost:5432"

Si encuentras este error al migrar la base de datos, asegúrate de que:
1. El contenedor Docker de PostgreSQL está en funcionamiento (`docker ps`)
2. Las variables de entorno están configuradas correctamente en `.env`
3. No hay otro servicio usando el puerto 5432

### Error en el archivo docker-compose.yml

Si encuentras errores al iniciar el contenedor Docker, verifica que:
1. El archivo docker-compose.yml no tiene problemas de formato (espacios, tabulaciones)
2. Estás ejecutando el comando desde el directorio raíz del proyecto
3. Docker Desktop está instalado y funcionando correctamente

### Error al insertar datos en la base de datos

Si encuentras errores al ejecutar el script `insertData.js`, asegúrate de que:
1. El esquema de la tabla en Prisma coincide con los campos que estás intentando insertar
2. El archivo JSON con los datos existe y está bien formateado
3. La base de datos está accesible 