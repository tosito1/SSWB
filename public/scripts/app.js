const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

// Inicializar la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Configurar Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true // Esto permite recargar las plantillas al cambiar (útil para desarrollo)
});

// Establecer el motor de vistas como Nunjucks
app.set('view engine', 'njk');

// Configurar directorios estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.render('index', {
    title: 'MovieHub - Tu portal de películas y series',
    featuredMovies: [
      {
        id: 1,
        title: 'Interestelar',
        description: 'Un grupo de exploradores viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.',
        image: 'https://placehold.co/300x450/333/FFF?text=Movie+1',
        year: '2014',
        genre: 'Ciencia Ficción',
        rating: 8.5
      },
      {
        id: 2,
        title: 'El Padrino',
        description: 'El patriarca envejecido de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reacio hijo.',
        image: 'https://placehold.co/300x450/333/FFF?text=Movie+2',
        year: '1972',
        genre: 'Drama',
        rating: 9.2
      },
      {
        id: 3,
        title: 'Pulp Fiction',
        description: 'Las vidas de dos sicarios, un boxeador, la esposa de un gángster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.',
        image: 'https://placehold.co/300x450/333/FFF?text=Movie+3',
        year: '1994',
        genre: 'Crimen',
        rating: 8.7
      },
      {
        id: 4,
        title: 'El Caballero Oscuro',
        description: 'Batman se enfrenta al Joker, un criminal que causa estragos y caos en Gotham City.',
        image: 'https://placehold.co/300x450/333/FFF?text=Movie+4',
        year: '2008',
        genre: 'Acción',
        rating: 8.9
      }
    ],
    popularSeries: [
      {
        id: 1,
        title: 'Breaking Bad',
        description: 'Un profesor de química de secundaria diagnosticado con cáncer pulmonar inoperable, se convierte en fabricante y vendedor de metanfetaminas.',
        image: 'https://placehold.co/300x450/333/FFF?text=Serie+1',
        seasons: '5 temporadas',
        genre: 'Drama',
        rating: 9.5
      }
    ]
});
}
);