// routes/api.mjs
import express from 'express'
import { PrismaClient } from '@prisma/client'
import logger from '../logger.mjs'

const router = express.Router()
const prisma = new PrismaClient()

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
