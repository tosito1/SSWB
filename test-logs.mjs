// Script para probar la funcionalidad de logs
import fetch from 'node-fetch';

async function main() {
    console.log('Iniciando pruebas de logs...');
    
    // URL base
    const baseUrl = 'http://localhost:8000';
    
    try {
        // 1. Visitar la página de inicio
        console.log('1. Visitando la página de inicio...');
        await fetch(baseUrl);
        
        // 2. Realizar una búsqueda exitosa
        console.log('2. Realizando búsqueda: "piedra"...');
        await fetch(`${baseUrl}/buscar?búsqueda=piedra`);
        
        // 3. Realizar una búsqueda que no dé resultados
        console.log('3. Realizando búsqueda sin resultados: "xyz123"...');
        await fetch(`${baseUrl}/buscar?búsqueda=xyz123`);
        
        // 4. Visitar una obra singular existente
        console.log('4. Visitando obra singular ID: 1...');
        await fetch(`${baseUrl}/obras-singulares/1`);
        
        // 5. Visitar una obra que no existe (generará un error)
        console.log('5. Visitando obra no existente ID: 999...');
        await fetch(`${baseUrl}/obras-singulares/999`);
        
        // 6. Visitar una ruta que no existe (generará un error 404)
        console.log('6. Visitando ruta no existente...');
        await fetch(`${baseUrl}/ruta-no-existente`);
        
        // 7. Visitar la página de login
        console.log('7. Visitando página de login...');
        await fetch(`${baseUrl}/usuarios/login`);
        
        console.log('Pruebas completadas. Verifica los archivos de log para ver los resultados.');
    } catch (error) {
        console.error('Error durante las pruebas:', error);
    }
}

main(); 