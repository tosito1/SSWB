import express from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import logger from "../logger.mjs"

const router = express.Router()
const prisma = new PrismaClient()

// Renderizar página de login
router.get('/login', (req, res) => {
  logger.debug('Acceso a la página de login');
  res.render('login.njk')
})

// Procesar formulario de login
router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body
    logger.debug(`Intento de login: ${correo}`);
    
    // Buscar usuario en la BD
    const usuario = await prisma.usuario.findUnique({
      where: { correo }
    })
    
    // Si no existe el usuario o la contraseña no coincide
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      logger.warn(`Login fallido para ${correo}: credenciales incorrectas`);
      return res.status(401).render('login.njk', {
        error: 'Credenciales incorrectas'
      })
    }
    
    // Generar token JWT
    const token = jwt.sign(
      { 
        usuario: usuario.nombre, 
        rol: usuario.rol,
        correo: usuario.correo
      }, 
      process.env.SECRET_KEY,
      { expiresIn: '2h' }
    )
    
    // Información para las plantillas
    res.locals.usuario = usuario.nombre
    res.locals.rol = usuario.rol
    
    logger.info(`Login correcto: ${correo} (${usuario.rol})`);
    
    // Establecer cookie con el token
    res.cookie('access_token', token, {
      httpOnly: true,                          // Evita acceso desde JavaScript del cliente
      secure: process.env.IN === 'production', // En producción aseguramos HTTPS
      maxAge: 7200000                          // 2 horas en milisegundos
    })
    
    // Redirigir a la página principal
    res.redirect('/')
    
  } catch (error) {
    logger.error(`Error en login: ${error.message}`);
    res.status(500).render('login.njk', {
      error: 'Error en el servidor. Inténtelo más tarde.'
    })
  }
})

// Cerrar sesión
router.get('/logout', (req, res) => {
  // Registrar cierre de sesión si hay un usuario autenticado
  if (req.user) {
    logger.info(`Logout: ${req.user.nombre || req.user.correo}`);
  }
  
  // Eliminar la cookie
  res.clearCookie('access_token')
  
  // Redirigir a la página principal
  res.redirect('/')
})

// Renderizar página de registro
router.get('/registro', (req, res) => {
  logger.debug('Acceso a la página de registro');
  res.render('registro.njk')
})

// Procesar formulario de registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, password, confirmarPassword } = req.body
    logger.debug(`Intento de registro: ${correo}`);
    
    // Validar que las contraseñas coincidan
    if (password !== confirmarPassword) {
      logger.warn(`Registro fallido para ${correo}: las contraseñas no coinciden`);
      return res.status(400).render('registro.njk', {
        error: 'Las contraseñas no coinciden',
        nombre,
        correo
      })
    }
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { correo }
    })
    
    if (usuarioExistente) {
      logger.warn(`Registro fallido para ${correo}: el correo ya está registrado`);
      return res.status(400).render('registro.njk', {
        error: 'El correo ya está registrado',
        nombre
      })
    }
    
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Crear el nuevo usuario
    await prisma.usuario.create({
      data: {
        correo,
        nombre,
        password: hashedPassword,
        rol: 'USUARIO' // Por defecto es USUARIO, pero lo ponemos explícitamente
      }
    })
    
    logger.info(`Usuario registrado correctamente: ${correo}`);
    
    // Redireccionar a login
    res.render('login.njk', {
      mensaje: 'Cuenta creada correctamente. Inicie sesión.'
    })
    
  } catch (error) {
    logger.error(`Error en registro: ${error.message}`);
    res.status(500).render('registro.njk', {
      error: 'Error en el servidor. Inténtelo más tarde.',
      nombre: req.body.nombre,
      correo: req.body.correo
    })
  }
})

export default router 