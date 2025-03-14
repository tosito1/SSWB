# Tarea 1: Configuración inicial y scraping de datos

## Descripción

En esta primera tarea, se ha realizado la configuración inicial del proyecto y se ha implementado un sistema de scraping para obtener datos del sitio web original del Museo Arqueológico de Granada.

## Implementación

### 1. Configuración del Proyecto

- Inicialización del proyecto Node.js
- Instalación de dependencias básicas:
  - Express: Framework web para Node.js
  - Nunjucks: Motor de plantillas
  - Playwright: Biblioteca para automatización de navegadores (scraping)

### 2. Scraping de Datos

Se ha desarrollado un script (`scrap.mjs`) que utiliza Playwright para extraer información de las obras singulares del Museo Arqueológico de Granada. El script realiza las siguientes acciones:

- Navega por las páginas del sitio web original
- Extrae información de cada obra singular:
  - Título
  - Imagen
  - Descripción
  - Procedencia
  - Comentario
  - URL original
- Guarda los datos extraídos en un archivo JSON (`info_obras.json`)

### 3. Visualización de Datos

Se ha creado un script adicional (`visualizar_obras.mjs`) que permite visualizar un resumen de los datos extraídos, mostrando estadísticas sobre la cantidad de obras y la completitud de la información.

## Archivos Principales

- `scrap.mjs`: Script de scraping para extraer datos del sitio web original
- `visualizar_obras.mjs`: Script para visualizar un resumen de los datos extraídos
- `info_obras.json`: Archivo JSON con los datos extraídos

## Ejecución

Para ejecutar el scraping de datos:

```bash
npm run scrap
```

Para visualizar un resumen de los datos extraídos:

```bash
npm run visualizar
```

## Resultados

El scraping ha permitido extraer información de más de 30 obras singulares del Museo Arqueológico de Granada, incluyendo imágenes, descripciones y enlaces a las páginas originales. Estos datos serán utilizados en las siguientes tareas para poblar la base de datos y mostrar la información en la aplicación web. 