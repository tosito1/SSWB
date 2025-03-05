// index.mjs
import express from 'express'
import nunjucks from 'nunjucks'

const IN = process.env.IN || 'development'  // "development" o "production"
const app = express()

// Configurar Nunjucks
nunjucks.configure('views', {  
	autoescape: true,
	noCache: IN === 'development',
	watch: IN === 'development',
	express: app
})
app.set('view engine', 'html')

// Ruta de prueba
app.get('/hola', (req, res) => {
	res.send('Hola desde el servidor')
})

// Renderizar una plantilla
app.get('/', (req, res) => {
	res.render("index.html", { saludado: 'Pepito' })  // Carga views/index.html
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT} en modo ${IN}`)
})
