// scrap.mjs
import { chromium } from 'playwright'
import fs from 'fs/promises'

// Función para recuperar URLs de obras singulares de una página
async function recuperaUrlsDe(page, url) {
  const pags = []
  console.log(`Visitando página: ${url}`)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  
  // Esperamos a que los elementos se carguen
  await page.waitForSelector('.portlet-body a', { timeout: 10000 }).catch(() => {
    console.log(`No se encontraron enlaces en ${url}`)
  })
  
  // Imprimir el HTML para depuración
  console.log('Estructura de la página:')
  const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 500) + '...')
  console.log(bodyHTML)
  
  // Intentar diferentes selectores
  const selectores = [
    '.descripcion a',
    '.portlet-body a[href*="obras-singulares"][href*="asset_publisher"]',
    'a[href*="obras-singulares"][href*="content"]'
  ]
  
  for (const selector of selectores) {
    console.log(`Probando selector: ${selector}`)
    const locators = page.locator(selector)
    const count = await locators.count()
    console.log(`Encontrados ${count} elementos con selector ${selector}`)
    
    if (count > 0) {
      for (const locator of await locators.all()) {
        const href = await locator.getAttribute('href')
        const texto = await locator.textContent()
        
        if (href && href.includes('obras-singulares') && href.includes('asset_publisher')) {
          // Convertir URLs relativas a absolutas
          const fullUrl = new URL(href, url).toString()
          if (!pags.includes(fullUrl)) {
            pags.push(fullUrl)
            console.log(`Añadido enlace: ${texto.trim()} -> ${fullUrl}`)
          }
        }
      }
    }
  }
  
  // Buscar enlaces a páginas adicionales
  const paginationLinks = page.locator('a[href*="obras-singulares"][href*="_cur="]')
  const paginationCount = await paginationLinks.count()
  
  if (paginationCount > 0) {
    console.log(`Encontrados ${paginationCount} enlaces de paginación`)
    const nextPageLinks = []
    
    for (const paginationLink of await paginationLinks.all()) {
      const href = await paginationLink.getAttribute('href')
      const texto = await paginationLink.textContent()
      
      if (href && !href.includes('javascript') && !nextPageLinks.includes(href)) {
        nextPageLinks.push(href)
        console.log(`Enlace a página adicional: ${texto.trim()} -> ${href}`)
      }
    }
    
    return {
      obras: pags,
      paginacion: nextPageLinks
    }
  }
  
  return {
    obras: pags,
    paginacion: []
  }
}

// Función para recuperar información detallada de una obra
async function recuperaInfoDe(page, url) {
  console.log(`\nExtrayendo información de: ${url}`)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  
  // Imprimir el HTML para depuración
  console.log('Estructura de la página de detalle:')
  const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 500) + '...')
  console.log(bodyHTML)
  
  // Extraer título - probar diferentes selectores
  let titulo = 'Sin título'
  const tituloSelectores = ['h1', '.asset-title', '.portlet-title-text', '.journal-content-article h2']
  for (const selector of tituloSelectores) {
    console.log(`Probando selector para título: ${selector}`)
    const tituloLocator = page.locator(selector)
    if (await tituloLocator.count() > 0) {
      titulo = await tituloLocator.first().textContent().catch(() => 'Sin título')
      titulo = titulo.trim()
      console.log(`Título encontrado con selector ${selector}: ${titulo}`)
      break
    }
  }
  
  // Extraer imagen - probar diferentes selectores
  let imagen = ''
  const imgSelectores = ['.imagen-principal img', '.journal-content-article img', '.asset-content img']
  for (const selector of imgSelectores) {
    console.log(`Probando selector para imagen: ${selector}`)
    const imgLocator = page.locator(selector)
    if (await imgLocator.count() > 0) {
      imagen = await imgLocator.first().getAttribute('src').catch(() => '')
      if (imagen) {
        // Convertir URL relativa a absoluta
        imagen = new URL(imagen, url).toString()
        console.log(`Imagen encontrada con selector ${selector}: ${imagen}`)
        break
      }
    }
  }
  
  // Extraer descripción - probar diferentes selectores
  let descripcion = ''
  const descSelectores = ['.descripcion-principal', '.journal-content-article p', '.asset-content p']
  for (const selector of descSelectores) {
    console.log(`Probando selector para descripción: ${selector}`)
    const descLocator = page.locator(selector)
    if (await descLocator.count() > 0) {
      descripcion = await descLocator.first().textContent().catch(() => '')
      descripcion = descripcion.trim()
      if (descripcion) {
        console.log(`Descripción encontrada con selector ${selector}: ${descripcion.substring(0, 50)}...`)
        break
      }
    }
  }
  
  // Extraer procedencia - probar diferentes selectores
  let procedencia = ''
  const procSelectores = ['.procedencia', '.journal-content-article .procedencia', '.asset-content .procedencia']
  for (const selector of procSelectores) {
    console.log(`Probando selector para procedencia: ${selector}`)
    const procLocator = page.locator(selector)
    if (await procLocator.count() > 0) {
      procedencia = await procLocator.first().textContent().catch(() => '')
      procedencia = procedencia.trim()
      if (procedencia) {
        console.log(`Procedencia encontrada con selector ${selector}: ${procedencia}`)
        break
      }
    }
  }
  
  // Extraer comentario - probar diferentes selectores
  let comentario = ''
  const comSelectores = ['.comentario', '.journal-content-article .comentario', '.asset-content .comentario']
  for (const selector of comSelectores) {
    console.log(`Probando selector para comentario: ${selector}`)
    const comLocator = page.locator(selector)
    if (await comLocator.count() > 0) {
      comentario = await comLocator.first().textContent().catch(() => '')
      comentario = comentario.trim()
      if (comentario) {
        console.log(`Comentario encontrado con selector ${selector}: ${comentario.substring(0, 50)}...`)
        break
      }
    }
  }
  
  // Si no se encontró título, intentar extraerlo de la URL
  if (titulo === 'Sin título') {
    const urlParts = url.split('/')
    const lastPart = urlParts[urlParts.length - 1].split('?')[0]
    if (lastPart) {
      titulo = lastPart.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())
      console.log(`Título extraído de URL: ${titulo}`)
    }
  }
  
  return {
    titulo,
    imagen,
    descripcion,
    procedencia,
    comentario,
    url
  }
}

// Función para guardar datos en disco
async function guardaEnDisco(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8')
    console.log(`Datos guardados en ${filename}`)
  } catch (error) {
    console.error(`Error al guardar en disco: ${error.message}`)
  }
}

// Función principal
async function main() {
  // Iniciar navegador
  const browser = await chromium.launch({
    headless: true, // true para modo sin interfaz, false para ver el navegador
    slowMo: 50 // ralentizar las acciones para ver mejor lo que ocurre
  })
  const page = await browser.newPage()
  
  // Configurar viewport para simular un navegador de escritorio
  await page.setViewportSize({ width: 1280, height: 800 })
  
  try {
    // URL inicial
    const urlInicial = "https://www.museosdeandalucia.es/web/museoarqueologicodegranada/obras-singulares"
    
    // Conjunto para almacenar todas las URLs de obras singulares
    const enlacesDeObrasSingulares = new Set()
    
    // Conjunto para almacenar las URLs de páginas ya visitadas
    const paginasVisitadas = new Set()
    
    // Cola de URLs de páginas a visitar
    const paginasPorVisitar = [urlInicial]
    
    // Procesar todas las páginas
    while (paginasPorVisitar.length > 0) {
      const paginaActual = paginasPorVisitar.shift()
      
      // Evitar visitar la misma página más de una vez
      if (paginasVisitadas.has(paginaActual)) {
        continue
      }
      
      // Marcar la página como visitada
      paginasVisitadas.add(paginaActual)
      
      // Recuperar enlaces de la página actual
      const resultado = await recuperaUrlsDe(page, paginaActual)
      
      // Añadir enlaces de obras singulares al conjunto
      for (const enlace of resultado.obras) {
        enlacesDeObrasSingulares.add(enlace)
      }
      
      // Añadir enlaces de paginación a la cola
      for (const enlacePaginacion of resultado.paginacion) {
        if (!paginasVisitadas.has(enlacePaginacion)) {
          paginasPorVisitar.push(enlacePaginacion)
        }
      }
    }
    
    // Convertir el conjunto a array
    const enlacesArray = Array.from(enlacesDeObrasSingulares)
    
    console.log(`\n🚀 Se han encontrado ${enlacesArray.length} obras singulares en total`)
    
    // Array para almacenar la información de todas las obras
    const listaInfoParaBD = []
    
    // Recuperar información detallada de cada obra
    for (const url of enlacesArray) {
      const infoObra = await recuperaInfoDe(page, url)
      listaInfoParaBD.push(infoObra)
    }
    
    // Guardar información en disco
    await guardaEnDisco('info_obras.json', listaInfoParaBD)
    
    console.log(`\n✅ Proceso completado. Se han extraído datos de ${listaInfoParaBD.length} obras singulares.`)
    
  } catch (error) {
    console.error(`Error durante el scraping: ${error.message}`)
    console.error(error.stack)
  } finally {
    // Cerrar navegador
    await browser.close()
  }
}

// Ejecutar función principal
main().catch(console.error) 