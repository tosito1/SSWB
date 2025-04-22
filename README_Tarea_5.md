# Tarea 5: Autenticación con JWT y Cookies

Esta tarea implementa un sistema de autenticación de usuarios utilizando tokens JWT (JSON Web Tokens) almacenados en cookies.

## Características implementadas

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Gestión de roles (USUARIO y ADMINISTRADOR)
- Protección de rutas mediante middleware

## Instalación y configuración

1. Actualizar la base de datos con el nuevo modelo de Usuario:

```bash
npx prisma migrate dev --name anadido_usuario
```

2. Instalar las dependencias necesarias:

```bash
npm install bcryptjs jsonwebtoken cookie-parser
```

3. Asegúrate de que el archivo `.env` contiene la clave secreta para JWT:

```
SECRET_KEY="tu_clave_secreta_muy_segura_para_jwt_tokens"
```

## Crear usuarios de prueba

Hay varias formas de crear usuarios para probar la aplicación:

### 1. Usando el script de seed (recomendado)

Este método utiliza `prisma/seed.mjs` para crear un usuario administrador y un usuario normal:

```bash
node prisma/seed.mjs
```

Credenciales:
- Administrador: admin@ejemplo.com / admin123
- Usuario normal: usuario@ejemplo.com / usuario123

### 2. Usando scripts de utilidad (alternativa)

También puedes usar los scripts `crearAdmin.js` o `createAdmin.js` (según la versión):

```bash
node createAdmin.js
```

### 3. Registrando usuarios desde la interfaz

También puedes registrar usuarios directamente a través de la interfaz web en:
- `/usuarios/registro`

## Estructura de archivos

- `routes/usuarios.mjs`: Controlador para las rutas de autenticación
- `views/login.njk`: Plantilla para la página de inicio de sesión
- `views/registro.njk`: Plantilla para la página de registro
- `prisma/seed.mjs`: Script para crear usuarios de prueba

## Flujo de autenticación

1. El usuario se registra o inicia sesión
2. Al autenticarse correctamente, se genera un token JWT y se almacena en una cookie
3. El middleware de autenticación verifica la cookie en cada solicitud
4. Si la cookie es válida, añade información del usuario al objeto `req` y a `res.locals`
5. La información del usuario en `res.locals` se utiliza en las plantillas

## Uso en las plantillas

Las plantillas tienen acceso a:

- `usuario`: Nombre del usuario autenticado
- `rol`: Rol del usuario (USUARIO o ADMINISTRADOR)

## Proteger rutas

Para proteger rutas y permitir acceso solo a usuarios autenticados o con roles específicos, puedes crear middlewares adicionales.