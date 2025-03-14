# Tarea 2: Configuración de la base de datos y ORM

## Descripción

En esta tarea, se ha implementado la configuración de la base de datos y se ha integrado Prisma ORM para gestionar la persistencia de datos en la aplicación.

## Implementación

### 1. Configuración de Prisma ORM

- Instalación de Prisma CLI y Prisma Client:
  ```bash
  npm install prisma --save-dev
  npm install @prisma/client
  ```

- Inicialización de Prisma con SQLite como base de datos:
  ```bash
  npx prisma init --datasource-provider sqlite
  ```

### 2. Definición del Modelo de Datos

Se ha definido el modelo `Obra` en el archivo `schema.prisma` para representar las obras singulares del museo:

```prisma
model Obra {
  id            Int @id @default(autoincrement())
  título        String
  imágen        String
  descripción   String
  procedencia   String
  comentario    String
  url           String
}
```

### 3. Migración de la Base de Datos

Se ha creado la migración inicial para crear la tabla en la base de datos:

```bash
npx prisma migrate dev --name init
```

### 4. Script de Inserción de Datos

Se ha desarrollado un script (`insertData.js`) para insertar los datos extraídos en la tarea anterior en la base de datos. El script realiza las siguientes acciones:

- Lee los datos del archivo JSON
- Limpia la base de datos para evitar duplicados
- Inserta cada obra en la base de datos
- Verifica que los datos se hayan insertado correctamente

### 5. Integración con la Aplicación

Se ha integrado Prisma Client en la aplicación principal (`index.mjs`) para permitir la consulta de datos desde las rutas de la aplicación.

## Archivos Principales

- `prisma/schema.prisma`: Definición del modelo de datos
- `prisma/migrations/`: Directorio con las migraciones de la base de datos
- `insertData.js`: Script para insertar datos en la base de datos

## Ejecución

Para crear la base de datos:

```bash
npx prisma migrate dev --name init
```

Para insertar los datos en la base de datos:

```bash
node insertData.js
```

Para explorar la base de datos con Prisma Studio:

```bash
npx prisma studio
```

## Resultados

La configuración de la base de datos con Prisma ORM ha permitido:

- Crear una estructura de datos adecuada para almacenar la información de las obras singulares
- Facilitar la consulta y manipulación de datos desde la aplicación
- Proporcionar una interfaz visual (Prisma Studio) para explorar y editar los datos

La base de datos ahora contiene todas las obras singulares extraídas en la tarea anterior, listas para ser utilizadas en la aplicación web. 