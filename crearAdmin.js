// crearAdmin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const prisma = new PrismaClient();

async function crearAdministrador() {
  try {
    // Datos del administrador
    const adminData = {
      correo: 'admin@ejemplo.com',
      nombre: 'Administrador',
      password: await bcrypt.hash('admin123', 10),
      rol: 'ADMINISTRADOR'
    };

    // Comprobar si ya existe
    const adminExistente = await prisma.usuario.findUnique({
      where: { correo: adminData.correo }
    });

    if (adminExistente) {
      console.log('El administrador ya existe en la base de datos.');
      return;
    }

    // Crear el usuario administrador
    const admin = await prisma.usuario.create({
      data: adminData
    });

    console.log('Administrador creado con éxito:');
    console.log('Correo:', admin.correo);
    console.log('Contraseña: admin123');
    console.log('Rol:', admin.rol);
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la función
crearAdministrador(); 