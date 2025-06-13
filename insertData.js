import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  try {
    // Leer el archivo JSON
    console.log('Leyendo archivo info_obras.json...');
    const data = await fs.readFile('info_obras.json', 'utf8');
    let obras = JSON.parse(data);

    // Filtrar títulos duplicados en el JSON
    const titulosUnicos = new Set();
    obras = obras.filter(obra => {
      if (titulosUnicos.has(obra.titulo)) {
        return false;
      }
      titulosUnicos.add(obra.titulo);
      return true;
    });

    console.log(`Se encontraron ${obras.length} obras únicas para insertar.`);
    
    // Limpiar la base de datos antes de insertar nuevos datos
    console.log('Limpiando la base de datos...');
    await prisma.obra.deleteMany({});
    
    // Insertar cada obra en la base de datos
    console.log('Insertando obras en la base de datos...');
    let insertados = 0;
    
    for (const obra of obras) {
      await prisma.obra.create({
        data: {
          titulo: obra.titulo || 'Sin título',
          imagen: obra.imagen || '',
          descripcion: obra.descripcion || '',
          procedencia: obra.procedencia || '',
          comentario: obra.comentario || ''
        }
      });
      
      insertados++;
      if (insertados % 10 === 0) {
        console.log(`Progreso: ${insertados}/${obras.length} obras insertadas.`);
      }
    }
    
    console.log(`¡Éxito! Se han insertado ${insertados} obras en la base de datos.`);
    
    // Verificar que los datos se hayan insertado correctamente
    const count = await prisma.obra.count();
    console.log(`Total de obras en la base de datos: ${count}`);
    
    if (count !== obras.length) {
      console.warn(`Advertencia: El número de obras insertadas (${count}) no coincide con el número de obras en el archivo JSON (${obras.length}).`);
    }
  } catch (error) {
    console.error('Error durante la inserción de datos:');
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