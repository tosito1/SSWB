import express from "express"
const router = express.Router();
				
import { PrismaClient } from '@prisma/client'
import logger from "../logger.mjs"

const prisma = new PrismaClient()
				
router.get('/buscar', async (req, res) => { // /obras/buscar
  const búsqueda = req.query.búsqueda 
  logger.info(`Búsqueda de obras: "${búsqueda}"`);
  
  try {
    // Utilizamos búsqueda simple por coincidencia en lugar de full-text search
    const obras = await prisma.obra.findMany({
      where: {
        OR: [
          { título: { contains: búsqueda, mode: 'insensitive' } },
          { descripción: { contains: búsqueda, mode: 'insensitive' } },
          { procedencia: { contains: búsqueda, mode: 'insensitive' } },
          { comentario: { contains: búsqueda, mode: 'insensitive' } }
        ]
      },
      // Ordenar por título
      orderBy: {
        título: 'asc'
      },
      // Limitar a los primeros 3 resultados
      take: 3
    });
    
    logger.debug(`Resultados encontrados para "${búsqueda}": ${obras.length}`);
    
    // Renderizamos la plantilla de resultados con los datos
    res.render('resultados.njk', { 
      obras: obras,
      búsqueda: búsqueda,
      totalResultados: obras.length
    });
  } catch (err) {
    logger.error(`Error en la búsqueda "${búsqueda}": ${err.message}`);
    res.status(500).send({err}); // o usar una página de error personalizada
  }
});

export default router; 