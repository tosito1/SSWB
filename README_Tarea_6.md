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

#### En Windows (PowerShell o cmd):

Si encuentras problemas de permisos en PowerShell, puedes usar cmd.exe:

1. Instalar Playwright:
```cmd
cmd.exe /c "npm install -D @playwright/test"
cmd.exe /c "npx playwright install"
```

2. Ejecutar las pruebas:
```cmd
cmd.exe /c "npx playwright test"
```

3. Ver el informe de las pruebas:
```cmd
cmd.exe /c "npx playwright show-report"
```

## Estructura de archivos

- `logger.mjs`: Configuración del sistema de logging
- `tests/museo-spec.js`: Pruebas end-to-end con Playwright
- `playwright.config.js`: Configuración de Playwright

## Configuración personalizada

### Configurar el nivel de logging

Puedes cambiar el nivel de logging a través de la variable de entorno `LOG_LEVEL`. Por ejemplo:

```bash
# Para mostrar solo logs de nivel "info" o superior
LOG_LEVEL=info node index.mjs
```

En Windows:
```cmd
set LOG_LEVEL=info && node index.mjs
```

### Personalizar las pruebas

Modifica los archivos en la carpeta `tests/` para ajustar las pruebas a tus necesidades o añadir nuevas pruebas.

## Problemas comunes y soluciones

### Error de ejecución de scripts en PowerShell

Si recibes el error "la ejecución de scripts está deshabilitada en este sistema", puedes usar cmd.exe como alternativa:

```cmd
cmd.exe /c "npx playwright test"
```

O habilitar la ejecución de scripts en PowerShell (como administrador):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error con ESM modules

Si encuentras errores relacionados con "require is not defined in ES module scope", asegúrate de que:

1. Los archivos JavaScript que usan `import` tienen extensión `.mjs`
2. O que los archivos `.js` usan `require()` si el `package.json` no tiene `"type": "module"`

### Inicio de servidor en el fondo

Si necesitas iniciar el servidor en segundo plano mientras ejecutas pruebas, puedes usar:

```bash
node index.mjs & # Para Linux/Mac
```

En Windows:
```cmd
start node index.mjs
``` 