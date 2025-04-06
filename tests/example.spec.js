// @ts-check
import { test, expect } from '@playwright/test';

test('Título de la página', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page).toHaveTitle(/Museo Arqueológico/);
});
			
test('Busco oro', async ({ page }) => {
  await page.goto('http://localhost:8000/buscar?búsqueda=oro');
  // Verifica que hay resultados en la página
  await expect(page.locator('body')).toContainText('Resultados de búsqueda');
});
			
test('Login correcto', async ({ page }) => {
  await page.goto('http://localhost:8000/usuarios/login');
			
  // Llenar el formulario
  await page.fill('input[name="correo"]', "admin@ejemplo.com");
  await page.fill('input[name="password"]', "admin123");
  
  // Hacer clic en el botón de login
  await page.click('button[type="submit"]');
  
  // Verificar que se ha iniciado sesión correctamente
  await expect(page.locator('body')).toContainText('Hola, Administrador');
});

test('Login incorrecto', async ({ page }) => {
  await page.goto('http://localhost:8000/usuarios/login');
			
  // Llenar el formulario con credenciales incorrectas
  await page.fill('input[name="correo"]', "usuario@incorrecto.com");
  await page.fill('input[name="password"]', "passwordincorrecta");
  
  // Hacer clic en el botón de login
  await page.click('button[type="submit"]');
  
  // Verificar que aparece un mensaje de error
  await expect(page.locator('body')).toContainText('Credenciales incorrectas');
});

test('Registro de usuario', async ({ page }) => {
  // Generar correo único para evitar conflictos en pruebas repetidas
  const timestamp = new Date().getTime();
  const testEmail = `usuario.test.${timestamp}@ejemplo.com`;
  
  await page.goto('http://localhost:8000/usuarios/registro');
			
  // Llenar el formulario de registro
  await page.fill('input[name="nombre"]', "Usuario de Prueba");
  await page.fill('input[name="correo"]', testEmail);
  await page.fill('input[name="password"]', "password123");
  await page.fill('input[name="confirmarPassword"]', "password123");
  
  // Hacer clic en el botón de registro
  await page.click('button[type="submit"]');
  
  // Verificar que se ha registrado correctamente
  await expect(page.locator('body')).toContainText('Cuenta creada correctamente');
}); 