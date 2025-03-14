// verifyData.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Contar el número de obras en la base de datos
    const count = await prisma.obra.count();
    console.log(`Total de obras en la base de datos: ${count}`);
    
    if (count === 0) {
      console.error('¡La base de datos está vacía! Ejecuta el script insertData.js para insertar los datos.');
      return;
    }
    
    // Obtener algunas obras para verificar
    console.log('\nMostrando 5 obras de ejemplo:');
    const obras = await prisma.obra.findMany({
      take: 5
    });
    
    obras.forEach((obra, index) => {
      console.log(`\nObra #${index + 1}: ${obra.título}`);
      console.log(`ID: ${obra.id}`);
      console.log(`Imagen: ${obra.imágen ? obra.imágen.substring(0, 50) + '...' : 'No disponible'}`);
      console.log(`Descripción: ${obra.descripción ? obra.descripción.substring(0, 50) + '...' : 'No disponible'}`);
      console.log(`URL: ${obra.url ? obra.url.substring(0, 50) + '...' : 'No disponible'}`);
    });
    
    console.log('\n✅ La base de datos contiene datos. Todo parece estar correcto.');
    
  } catch (error) {
    console.error('Error al verificar los datos:');
    console.error(error);
    process.exit(1);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 