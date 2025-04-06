const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Crear usuario administrador
  const adminEmail = 'admin@ejemplo.com'
  const adminPassword = 'admin123'
  
  console.log('Creando usuario administrador...')
  
  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(adminPassword, 10)
  
  // Crear o actualizar el administrador
  const admin = await prisma.usuario.upsert({
    where: { correo: adminEmail },
    update: {},
    create: {
      correo: adminEmail,
      nombre: 'Administrador',
      password: hashedPassword,
      rol: 'ADMINISTRADOR'
    }
  })
  
  console.log(`Administrador creado/actualizado: ${admin.correo} (${admin.rol})`)
  
  // También podemos crear un usuario normal para pruebas
  const userEmail = 'usuario@ejemplo.com'
  const userPassword = 'usuario123'
  
  // Hash de la contraseña
  const userHashedPassword = await bcrypt.hash(userPassword, 10)
  
  // Crear o actualizar el usuario
  const user = await prisma.usuario.upsert({
    where: { correo: userEmail },
    update: {},
    create: {
      correo: userEmail,
      nombre: 'Usuario Normal',
      password: userHashedPassword,
      rol: 'USUARIO'
    }
  })
  
  console.log(`Usuario creado/actualizado: ${user.correo} (${user.rol})`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 