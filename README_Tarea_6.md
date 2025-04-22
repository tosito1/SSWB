# Tarea 6: Logging y Testing End-to-End

Esta tarea implementa un sistema de logging con Winston y pruebas end-to-end con Playwright.

## Logging con Winston

### Características implementadas

- Configuración de Winston para diferentes niveles de logging (debug, info, error)
- Salida de logs a consola y archivos
- Formateo personalizado de mensajes de log
- Logs separados para errores

### Archivos de log

- `app.log`: Contiene todos los logs a partir del nivel "info"
- `error.log`: Contiene solo los logs de nivel "error"
- Consola: Muestra todos los logs desde el nivel configurado (por defecto, "debug")

### Niveles de log

Winston ofrece varios niveles de log, en orden de prioridad:
1. `error`: Para errores críticos
2. `warn`: Para advertencias
3. `info`: Para información general
4. `debug`: Para información detallada de depuración

## Testing End-to-End con Playwright

### Pruebas implementadas

- Verificación del título de la página
- Búsqueda de obras
- Login correcto e incorrecto
- Registro de usuarios

### Ejecutar las pruebas

#### En Linux/Mac:

1. Instalar Playwright:
```bash
npm install -D @playwright/test
npx playwright install
```

2. Ejecutar las pruebas:
```bash
npx playwright test
```

3. Ver los resultados en modo UI:
```bash
npx playwright test --ui
```

4. Ver el informe de las pruebas:
```bash
npx playwright show-report
```

## Estructura de archivos

- `logger.mjs`: Configuración del sistema de logging
- `tests/museo-spec.js`: Pruebas end-to-end con Playwright
- `playwright.config.js`: Configuración de Playwright

## Configuración personalizada

### Configurar el nivel de logging

Puedes cambiar el nivel de logging a través de la variable de entorno `LOG_LEVEL`. 

### Personalizar las pruebas

Modifica los archivos en la carpeta `tests/` para ajustar las pruebas a tus necesidades o añadir nuevas pruebas.