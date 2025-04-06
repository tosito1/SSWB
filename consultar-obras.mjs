import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function consultarObras() {
  console.log('=== TODAS LAS OBRAS ===')
  try {
    const obras = await prisma.obra.findMany()
    console.log(`Total de obras: ${obras.length}`)
    
    obras.forEach((obra, index) => {
      console.log(`\n[Obra ${index + 1}]`)
      console.log(`ID: ${obra.id}`)
      console.log(`Título: ${obra.título}`)
      console.log(`Imagen: ${obra.imágen ? 'Disponible' : 'No disponible'}`)
      console.log(`Descripción: ${obra.descripción ? obra.descripción.substring(0, 50) + '...' : 'No disponible'}`)
    })
  } catch (error) {
    console.error('Error al consultar obras:', error)
  }
}

async function consultarUsuarios() {
  console.log('\n=== TODOS LOS USUARIOS ===')
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        correo: true,
        nombre: true,
        rol: true
      }
    })
    
    console.log(`Total de usuarios: ${usuarios.length}`)
    
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

async function main() {
  try {
    await consultarObras()
    await consultarUsuarios()
  } catch (error) {
    console.error('Error general:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 