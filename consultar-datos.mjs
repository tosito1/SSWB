import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  // Habilitar logs para diagnosticar posibles problemas
  log: ['query', 'info', 'warn', 'error']
})

async function consultarObras() {
  try {
    console.log('\n=== CONSULTA DE OBRAS ===')
    const obras = await prisma.obra.findMany()
    
    if (obras.length === 0) {
      console.log('No se encontraron obras en la base de datos.')
      return
    }
    
    console.log(`Total de obras encontradas: ${obras.length}`)
    
    obras.forEach((obra, index) => {
      console.log(`\n[Obra ${index + 1}]`)
      console.log(`ID: ${obra.id}`)
      console.log(`Título: ${obra.título || 'Sin título'}`)
      console.log(`Imagen: ${obra.imágen ? 'Disponible' : 'No disponible'}`)
      console.log(`Descripción: ${obra.descripción ? obra.descripción.substring(0, 50) + (obra.descripción.length > 50 ? '...' : '') : 'No disponible'}`)
      console.log(`Procedencia: ${obra.procedencia || 'No especificada'}`)
    })
    
  } catch (error) {
    console.error('Error al consultar obras:', error)
  }
}

async function consultarUsuarios() {
  try {
    console.log('\n=== CONSULTA DE USUARIOS ===')
    const usuarios = await prisma.usuario.findMany({
      select: {
        correo: true,
        nombre: true,
        rol: true
      }
    })
    
    if (usuarios.length === 0) {
      console.log('No se encontraron usuarios en la base de datos.')
      return
    }
    
    console.log(`Total de usuarios encontrados: ${usuarios.length}`)
    
    usuarios.forEach((usuario, index) => {
      console.log(`\n[Usuario ${index + 1}]`)
      console.log(`Correo: ${usuario.correo}`)
      console.log(`Nombre: ${usuario.nombre}`)
      console.log(`Rol: ${usuario.rol}`)
    })
    
  } catch (error) {
    console.error('Error al consultar usuarios:', error)
  }
}

// Función principal
async function main() {
  try {
    // Mostrar información de conexión
    console.log('Consultando base de datos PostgreSQL...')
    
    // Consultar modelos
    await consultarObras()
    await consultarUsuarios()
    
    console.log('\nConsulta finalizada.')
  } catch (error) {
    console.error('Error general en la consulta:', error)
  } finally {
    // Cerrar conexión con la base de datos
    await prisma.$disconnect()
  }
}

// Ejecutar script
main() 