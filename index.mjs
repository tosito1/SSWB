// index.mjs
import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import { PrismaClient } from '@prisma/client'

// Inicializar Prisma Client
const prisma = new PrismaClient()

// Configuración de rutas para ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Crear la aplicación Express
const app = express()

// Configurar el puerto
const PORT = process.env.PORT || 8000

// Configurar Nunjucks como motor de plantillas
const isDev = process.env.NODE_ENV !== 'production'
const nunjucksEnv = nunjucks.configure('views', {
	autoescape: true,
	express: app,
	watch: isDev
})

// Añadir filtro para truncar texto
nunjucksEnv.addFilter('truncate', function(str, length) {
	if (!str) return ''
	if (str.length <= length) return str
	return str.substring(0, length) + '...'
})

// Añadir filtro para formatear fechas
nunjucksEnv.addFilter('date', function(date, format) {
	if (!date) return ''
	
	const d = new Date(date)
	
	// Si no es una fecha válida, devolver la cadena original
	if (isNaN(d.getTime())) return date
	
	// Formato simple por defecto: YYYY-MM-DD
	if (!format) {
		return d.getFullYear() + '-' + 
			('0' + (d.getMonth() + 1)).slice(-2) + '-' + 
			('0' + d.getDate()).slice(-2)
	}
	
	// Manejar formatos específicos
	if (format === 'Y' || format === 'YYYY') {
		return d.getFullYear().toString()
	} else if (format === 'M' || format === 'MM') {
		return ('0' + (d.getMonth() + 1)).slice(-2)
	} else if (format === 'D' || format === 'DD') {
		return ('0' + d.getDate()).slice(-2)
	} else if (format === 'MMMM') {
		const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
		return meses[d.getMonth()]
	} else if (format === 'MMM') {
		const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
		return meses[d.getMonth()]
	} else if (format === 'dddd') {
		const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
		return dias[d.getDay()]
	} else if (format === 'ddd') {
		const dias = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
		return dias[d.getDay()]
	}
	
	// Para otros formatos, devolver una fecha localizada
	try {
		return d.toLocaleDateString('es-ES', {
			year: format.includes('Y') ? 'numeric' : undefined,
			month: format.includes('M') ? 'long' : undefined,
			day: format.includes('D') ? 'numeric' : undefined
		})
	} catch (e) {
		return d.toLocaleDateString('es-ES')
	}
})

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Rutas
app.get('/hola', (req, res) => {
	res.send('¡Hola desde el Museo Arqueológico de Granada!')
})

// Página de inicio
app.get('/', async (req, res) => {
	try {
		// Obtener 3 obras aleatorias de la base de datos
		const obrasDestacadas = await prisma.obra.findMany({
			take: 3,
			orderBy: {
				id: 'asc' // Puedes cambiar esto a un orden aleatorio si lo prefieres
			}
		})
		
		// Obtener noticias recientes (simuladas)
		const noticias = [
			{
				titulo: 'Material Didáctico Interactivo',
				imagen: '/img/noticias/material-didactico.jpg',
				fecha: new Date(),
				resumen: 'Nuevos materiales didácticos para visitas escolares'
			},
			{
				titulo: 'Exposición itinerante del Museo Arqueológico y Etnológico de Granada',
				imagen: '/img/noticias/exposicion-itinerante.jpg',
				fecha: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 días atrás
				resumen: 'EL MUSEO SE VA DE VIAJE. Exposición itinerante del Museo Arqueológico y Etnológico de Granada'
			},
			{
				titulo: 'Taller filosófico-poético. Venus de Talará: ¿Quién soy yo?',
				imagen: '/img/noticias/taller-poetico.jpg',
				fecha: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 días atrás
				resumen: 'Taller filosófico-poético. Venus de Talará: ¿Quién soy yo? Día 14 de noviembre'
			}
		]
		
		res.render('index.njk', {
			titulo: 'Museo Arqueológico y Etnológico de Granada',
			active: 'inicio',
			obras: obrasDestacadas,
			noticias: noticias,
			destacados: [
				{
					titulo: 'Reapertura del Museo Arqueológico y Etnológico de Granada',
					imagen: '/img/destacados/reapertura.jpg'
				},
				{
					titulo: 'Detalle de la fachada',
					imagen: '/img/destacados/fachada.jpg'
				}
			]
		})
	} catch (error) {
		console.error('Error al cargar la página de inicio:', error)
		res.status(500).render('error.njk', {
			titulo: 'Error',
			mensaje: 'Ha ocurrido un error al cargar la página de inicio'
		})
	}
})

// Página de contacto
app.get('/contacto', (req, res) => {
	res.render('contacto.njk', {
		titulo: 'Contacto',
		active: 'informacion',
		contacto: {
			direccion: 'Carrera del Darro, 41-43, 18010 Granada',
			telefono: '958 575 408',
			email: 'museoarqueologicogranada.ccul@juntadeandalucia.es',
			horario: 'Martes a sábados: 09:00 - 21:00h. Domingos y festivos: 09:00 - 15:00h. Lunes cerrado.'
		}
	})
})

// Página de acceso
app.get('/acceso', (req, res) => {
	res.render('acceso.njk', {
		titulo: 'Cómo llegar',
		active: 'informacion',
		ubicacion: {
			direccion: 'Carrera del Darro, 41-43, 18010 Granada',
			coordenadas: {
				latitud: 37.177,
				longitud: -3.593
			},
			transporte: [
				'Autobús urbano: Líneas C1, C2, C3 (parada Paseo de los Tristes)',
				'A pie: 10 minutos desde Plaza Nueva'
			]
		}
	})
})

// Página de servicios
app.get('/servicios', (req, res) => {
	res.render('servicios.njk', {
		titulo: 'Servicios e instalaciones',
		active: 'informacion',
		servicios: [
			{
				nombre: 'Visitas guiadas',
				descripcion: 'Visitas guiadas para grupos previa reserva'
			},
			{
				nombre: 'Biblioteca',
				descripcion: 'Biblioteca especializada en arqueología y etnología'
			},
			{
				nombre: 'Tienda',
				descripcion: 'Tienda con publicaciones y reproducciones'
			},
			{
				nombre: 'Accesibilidad',
				descripcion: 'Accesibilidad para personas con movilidad reducida'
			}
		]
	})
})

// Página de actualidad
app.get('/actualidad', (req, res) => {
	res.render('actualidad.njk', {
		titulo: 'Actualidad',
		active: 'actualidad',
		noticias: [
			{
				titulo: 'Material Didáctico Interactivo',
				imagen: '/img/noticias/material-didactico.jpg',
				fecha: new Date(),
				contenido: 'Nuevos materiales didácticos para visitas escolares...'
			},
			{
				titulo: 'Exposición itinerante del Museo Arqueológico y Etnológico de Granada',
				imagen: '/img/noticias/exposicion-itinerante.jpg',
				fecha: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				contenido: 'EL MUSEO SE VA DE VIAJE. Exposición itinerante del Museo Arqueológico y Etnológico de Granada...'
			},
			{
				titulo: 'Taller filosófico-poético. Venus de Talará: ¿Quién soy yo?',
				imagen: '/img/noticias/taller-poetico.jpg',
				fecha: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
				contenido: 'Taller filosófico-poético. Venus de Talará: ¿Quién soy yo? Día 14 de noviembre...'
			}
		]
	})
})

// Página de historia
app.get('/historia', (req, res) => {
	res.render('historia.njk', {
		titulo: 'Historia',
		active: 'historia',
		historia: {
			fundacion: 'El Museo Arqueológico de Granada fue fundado en 1879...',
			sede: 'La sede actual del museo es la Casa de Castril, un edificio renacentista del siglo XVI...',
			colecciones: 'Las colecciones del museo abarcan desde la Prehistoria hasta la Edad Moderna...'
		}
	})
})

// Página de colecciones
app.get('/colecciones', (req, res) => {
	res.render('colecciones.njk', {
		titulo: 'Colecciones',
		active: 'colecciones',
		secciones: [
			{
				nombre: 'Prehistoria',
				descripcion: 'Colección de materiales prehistóricos de la provincia de Granada'
			},
			{
				nombre: 'Protohistoria',
				descripcion: 'Materiales de las culturas ibérica y fenicia'
			},
			{
				nombre: 'Época Romana',
				descripcion: 'Colección de materiales de época romana'
			},
			{
				nombre: 'Época Medieval',
				descripcion: 'Colección de materiales de época medieval, con especial atención al periodo andalusí'
			},
			{
				nombre: 'Etnología',
				descripcion: 'Colección etnológica de la provincia de Granada'
			}
		]
	})
})

// Página de difusión
app.get('/difusion', (req, res) => {
	res.render('difusion.njk', {
		titulo: 'Difusión',
		active: 'difusion',
		actividades: [
			{
				nombre: 'Publicaciones',
				descripcion: 'Catálogos, guías y otras publicaciones del museo'
			},
			{
				nombre: 'Programas educativos',
				descripcion: 'Programas educativos para escolares y otros colectivos'
			},
			{
				nombre: 'Exposiciones temporales',
				descripcion: 'Exposiciones temporales organizadas por el museo'
			}
		]
	})
})

// Página de enlaces
app.get('/enlaces', (req, res) => {
	res.render('enlaces.njk', {
		titulo: 'Enlaces de interés',
		active: 'enlaces',
		enlaces: [
			{
				nombre: 'Consejería de Turismo, Cultura y Deporte',
				url: 'https://www.juntadeandalucia.es/organismos/turismoculturaydeporte.html'
			},
			{
				nombre: 'Portal de Museos de Andalucía',
				url: 'https://www.museosdeandalucia.es'
			},
			{
				nombre: 'Ministerio de Cultura y Deporte',
				url: 'https://www.culturaydeporte.gob.es'
			}
		]
	})
})

// Página de obras singulares
app.get('/obras-singulares', async (req, res) => {
	try {
		// Obtener todas las obras de la base de datos
		const obras = await prisma.obra.findMany()
		
		res.render('obras-singulares.njk', {
			titulo: 'Obras Singulares',
			active: 'colecciones',
			obras: obras
		})
	} catch (error) {
		console.error('Error al cargar las obras singulares:', error)
		res.status(500).render('error.njk', {
			titulo: 'Error',
			mensaje: 'Ha ocurrido un error al cargar las obras singulares'
		})
	}
})

// Página de detalle de obra singular
app.get('/obras-singulares/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id)
		
		// Obtener la obra de la base de datos
		const obra = await prisma.obra.findUnique({
			where: { id }
		})
		
		if (!obra) {
			return res.status(404).render('404.njk', {
				titulo: 'Obra no encontrada',
				mensaje: 'La obra que buscas no existe o ha sido trasladada.'
			})
		}
		
		res.render('obra-detalle.njk', {
			titulo: obra.título,
			active: 'colecciones',
			obra: obra
		})
	} catch (error) {
		console.error('Error al cargar el detalle de la obra:', error)
		res.status(500).render('error.njk', {
			titulo: 'Error',
			mensaje: 'Ha ocurrido un error al cargar el detalle de la obra'
		})
	}
})

// Página de reservas
app.get('/reserva', (req, res) => {
	res.render('reserva.njk', {
		titulo: 'Reserva tu visita',
		active: 'informacion'
	})
})

// Página de mapa web
app.get('/mapa-web', (req, res) => {
	res.render('mapa-web.njk', {
		titulo: 'Mapa web',
		active: 'informacion',
		secciones: [
			{
				nombre: 'Inicio',
				url: '/'
			},
			{
				nombre: 'Información general',
				url: '#',
				subsecciones: [
					{ nombre: 'Contacto', url: '/contacto' },
					{ nombre: 'Acceso', url: '/acceso' },
					{ nombre: 'Servicios e instalaciones', url: '/servicios' },
					{ nombre: 'Actualidad', url: '/actualidad' }
				]
			},
			{
				nombre: 'Historia',
				url: '/historia'
			},
			{
				nombre: 'Las Colecciones',
				url: '/colecciones',
				subsecciones: [
					{ nombre: 'Obras Singulares', url: '/obras-singulares' },
					{ nombre: 'Propuestas de recorrido', url: '/colecciones' },
					{ nombre: 'Acceso a fondos', url: '/colecciones' }
				]
			},
			{
				nombre: 'Difusión',
				url: '/difusion',
				subsecciones: [
					{ nombre: 'Publicaciones', url: '/difusion' },
					{ nombre: 'Prensa', url: '/difusion' },
					{ nombre: 'Programas educativos', url: '/difusion' }
				]
			},
			{
				nombre: 'Enlaces de interés',
				url: '/enlaces'
			},
			{
				nombre: 'Reserva tu visita',
				url: '/reserva'
			}
		]
	})
})

// Manejo de errores 404
app.use((req, res) => {
	res.status(404).render('404.njk', {
		titulo: 'Página no encontrada',
		mensaje: 'La página que buscas no existe o ha sido trasladada.'
	})
})

// Iniciar el servidor
app.listen(PORT, () => {
	console.log(`Servidor iniciado en http://localhost:${PORT}`)
	console.log(`Modo: ${isDev ? 'desarrollo' : 'producción'}`)
}) 
