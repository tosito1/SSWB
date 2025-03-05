// index.mjs
import express from 'express'
import nunjucks from 'nunjucks'

const IN = process.env.IN || 'development'  // "development" o "production"
const isDevMode = IN === 'development'
const app = express()

// Configurar Nunjucks
nunjucks.configure('views', {  
	autoescape: true,
	noCache: isDevMode,
	watch: isDevMode,
	express: app
})
app.set('view engine', 'html')

// Servir archivos estáticos
app.use(express.static('public'))

// Ruta de prueba
app.get('/hola', (req, res) => {
	res.send('Hola desde el servidor')
})

// Renderizar una plantilla
app.get('/bootstrap', (req, res) => {
	res.render("index-bootstrap.njk", { title: "Inicio Bootstrap" })  
})

app.get('/tailwind', (req, res) => {
	res.render("index-tailwind.njk", { title: "Inicio TailwindCSS" })  
})

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
	res.status(404).send("Página no encontrada 🎬")
})

// Iniciar el servidor
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
	console.log(`✅ Servidor corriendo en http://localhost:${PORT} en modo ${IN}`)
})
