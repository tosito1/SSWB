// routes/api.mjs
import express from 'express'
import { PrismaClient } from '@prisma/client'
import logger from '../logger.mjs'

const router = express.Router()
const prisma = new PrismaClient()

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - correo
 *         - nombre
 *         - password
 *         - rol
 *       properties:
 *         correo:
 *           type: string
 *           description: Correo electrónico del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         rol:
 *           type: string
 *           description: Rol del usuario (ADMIN o USER)
 *     Obra:
 *       type: object
 *       required:
 *         - id
 *         - título
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la obra
 *         título:
 *           type: string
 *           description: Título de la obra
 *         descripción:
 *           type: string
 *           description: Descripción de la obra
 *         procedencia:
 *           type: string
 *           description: Procedencia de la obra
 *         comentario:
 *           type: string
 *           description: Comentarios adicionales sobre la obra
 *         imagen:
 *           type: string
 *           description: URL de la imagen de la obra
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la obra
 */

/**
 * @swagger
 * /api/usuario/{correo}:
 *   get:
 *     summary: Comprobar si existe un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: correo
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo electrónico del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: usuario@ejemplo.com
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
// GET /api/usuario/:correo - Comprobar si existe un usuario
router.get('/usuario/:correo', async (req, res) => {
  try {
    const correo = req.params.correo // Capturamos el correo desde los parámetros
    logger.debug(`------------------------- GET USER ${correo}`)

    const usuario = await prisma.usuario.findUnique({
      where: {correo}
    })

    if (usuario) {
      res.status(200).json({ok: true, data: correo})
    } else {
      res.status(404).json({ok: false, msg: `${correo} not found`})
    }

  } catch (error) {
    logger.error(`Error al buscar usuario ${req.params.correo}: ${error.message}`)
    res.status(500).json({ok: false, msg: error.message})
  }
})

/**
 * @swagger
 * /api/obra/cuantas:
 *   get:
 *     summary: Obtener el número total de obras
 *     tags: [Obras]
 *     responses:
 *       200:
 *         description: Número total de obras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 42
 *       500:
 *         description: Error del servidor
 */
// GET /api/obra/cuantas - Obtener el número total de obras
router.get('/obra/cuantas', async (req, res) => {
  try {
    logger.debug('------------------------- GET TOTAL OBRAS')
    
    const count = await prisma.obra.count()
    
    res.status(200).json({ok: true, total: count})
    
  } catch (error) {
    logger.error(`Error al contar obras: ${error.message}`)
    res.status(500).json({ok: false, msg: error.message})
  }
})

/**
 * @swagger
 * /api/obra:
 *   get:
 *     summary: Obtener obras paginadas
 *     tags: [Obras]
 *     parameters:
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice inicial para la paginación
 *       - in: query
 *         name: hasta
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Índice final para la paginación
 *     responses:
 *       200:
 *         description: Lista de obras paginadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Obra'
 *                 paginacion:
 *                   type: object
 *                   properties:
 *                     desde:
 *                       type: integer
 *                       example: 0
 *                     hasta:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Parámetros de paginación inválidos
 *       500:
 *         description: Error del servidor
 */
// GET /api/obra/?desde=0&hasta=10 - Paginador de obras
router.get('/obra', async (req, res) => {
  try {
    const desde = parseInt(req.query.desde) || 0
    const hasta = parseInt(req.query.hasta) || 10
    const limit = hasta - desde
    
    logger.debug(`------------------------- GET OBRAS PAGINADAS [${desde}-${hasta}]`)
    
    if (desde < 0 || hasta <= 0 || desde >= hasta) {
      return res.status(400).json({
        ok: false, 
        msg: 'Parámetros de paginación inválidos. Asegúrate que desde >= 0, hasta > 0, y desde < hasta'
      })
    }
    
    const obras = await prisma.obra.findMany({
      skip: desde,
      take: limit,
      orderBy: {
        id: 'asc'
      }
    })
    
    res.status(200).json({
      ok: true, 
      data: obras,
      paginacion: {
        desde,
        hasta,
        total: obras.length
      }
    })
    
  } catch (error) {
    logger.error(`Error al paginar obras: ${error.message}`)
    res.status(500).json({ok: false, msg: error.message})
  }
})

/**
 * @swagger
 * /api/obra/{id}:
 *   get:
 *     summary: Obtener datos de una obra específica
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la obra
 *     responses:
 *       200:
 *         description: Datos de la obra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Obra'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Obra no encontrada
 *       500:
 *         description: Error del servidor
 */
// GET /api/obra/:id - Obtener datos de una obra específica
router.get('/obra/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
      return res.status(400).json({ok: false, msg: 'El ID debe ser un número'})
    }
    
    logger.debug(`------------------------- GET OBRA ${id}`)
    
    const obra = await prisma.obra.findUnique({
      where: {id}
    })
    
    if (obra) {
      res.status(200).json({ok: true, data: obra})
    } else {
      res.status(404).json({ok: false, msg: `Obra con ID ${id} no encontrada`})
    }
    
  } catch (error) {
    logger.error(`Error al buscar obra ${req.params.id}: ${error.message}`)
    res.status(500).json({ok: false, msg: error.message})
  }
})

/**
 * @swagger
 * /api/obra/{id}:
 *   delete:
 *     summary: Borrar una obra específica
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la obra a eliminar
 *     responses:
 *       200:
 *         description: Obra eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Obra con ID 1 eliminada correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Obra no encontrada
 *       500:
 *         description: Error del servidor
 */
// DELETE /api/obra/:id - Borrar una obra específica
router.delete('/obra/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
      return res.status(400).json({ok: false, msg: 'El ID debe ser un número'})
    }
    
    logger.debug(`------------------------- DELETE OBRA ${id}`)
    
    // Primero verificamos si la obra existe
    const obra = await prisma.obra.findUnique({
      where: {id}
    })
    
    if (!obra) {
      return res.status(404).json({ok: false, msg: `Obra con ID ${id} no encontrada`})
    }
    
    // Si existe, la eliminamos
    await prisma.obra.delete({
      where: {id}
    })
    
    res.status(200).json({ok: true, msg: `Obra con ID ${id} eliminada correctamente`})
    
  } catch (error) {
    logger.error(`Error al eliminar obra ${req.params.id}: ${error.message}`)
    res.status(500).json({ok: false, msg: error.message})
  }
})

export default router
