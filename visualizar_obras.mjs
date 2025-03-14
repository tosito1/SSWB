// visualizar_obras.mjs
import fs from 'fs/promises'

async function visualizarObras() {
  try {
    // Leer el archivo JSON
    const data = await fs.readFile('info_obras.json', 'utf8')
    const obras = JSON.parse(data)
    
    console.log(`Se han encontrado ${obras.length} obras singulares:`)
    console.log('='.repeat(50))
    
    // Mostrar información resumida de cada obra
    obras.forEach((obra, index) => {
      console.log(`Obra #${index + 1}: ${obra.titulo}`)
      console.log(`URL: ${obra.url}`)
      console.log(`Imagen: ${obra.imagen ? obra.imagen : 'No disponible'}`)
      console.log(`Descripción: ${obra.descripcion ? obra.descripcion.substring(0, 100) + '...' : 'No disponible'}`)
      console.log('='.repeat(50))
    })
    
    // Estadísticas
    const conImagen = obras.filter(obra => obra.imagen).length
    const conDescripcion = obras.filter(obra => obra.descripcion).length
    const conProcedencia = obras.filter(obra => obra.procedencia).length
    const conComentario = obras.filter(obra => obra.comentario).length
    
    console.log('\nEstadísticas:')
    console.log(`- Obras con imagen: ${conImagen}/${obras.length} (${Math.round(conImagen/obras.length*100)}%)`)
    console.log(`- Obras con descripción: ${conDescripcion}/${obras.length} (${Math.round(conDescripcion/obras.length*100)}%)`)
    console.log(`- Obras con procedencia: ${conProcedencia}/${obras.length} (${Math.round(conProcedencia/obras.length*100)}%)`)
    console.log(`- Obras con comentario: ${conComentario}/${obras.length} (${Math.round(conComentario/obras.length*100)}%)`)
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('El archivo info_obras.json no existe. Ejecuta primero scrap.mjs para generar los datos.')
    } else {
      console.error(`Error al leer o procesar el archivo: ${error.message}`)
    }
  }
}

visualizarObras().catch(console.error) 