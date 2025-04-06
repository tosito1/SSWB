// createAdmin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const adminEmail = 'admin@ejemplo.com';
    const adminPassword = 'admin123';
    
    console.log('Verificando si el administrador ya existe...');
    const existingAdmin = await prisma.usuario.findUnique({
      where: { correo: adminEmail }
    });
    
    if (existingAdmin) {
      console.log('El administrador ya existe en la base de datos.');
      return;
    }
    
    console.log('Creando usuario administrador...');
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const admin = await prisma.usuario.create({
      data: {
        correo: adminEmail,
        nombre: 'Administrador',
        password: hashedPassword,
        rol: 'ADMINISTRADOR'
      }
    });
    
    console.log('-------------------------------------');
    console.log('Administrador creado exitosamente:');
    console.log('Email:', admin.correo);
    console.log('Contraseña:', adminPassword);
    console.log('Rol:', admin.rol);
    console.log('-------------------------------------');
  } catch (error) {
    console.error('Error al crear el administrador:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 