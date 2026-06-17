// Script de prueba para los endpoints
// Ejecuta estos comandos en PowerShell o en una herramienta como Postman

// 1. CREAR UN AUTO
const createAuto = {
  tipo: "Auto",
  placa: "ABC-1234",
  marca: "Toyota",
  modelo: "Corolla",
  color: "Azul",
  anio: 2023,
  clasificacion: "Gasolina",
  numeroPuertas: 4,
  capacidadMaletero: 450
};

// 2. CREAR UNA MOTOCICLETA
const createMoto = {
  tipo: "Moto",
  placa: "XYZ-5678",
  marca: "Yamaha",
  modelo: "YZF R1",
  color: "Rojo",
  anio: 2022,
  clasificacion: "Gasolina",
  tipoMotocicleta: "Deportiva"
};

// 3. CREAR UNA CAMIONETA
const createCamioneta = {
  tipo: "Camioneta",
  placa: "DEF-9012",
  marca: "Ford",
  modelo: "F150",
  color: "Blanco",
  anio: 2023,
  clasificacion: "Diesel",
  cabina: "Doble",
  capacidadCarga: 5000
};

// PowerShell Commands
/*
# 1. Obtener todos los vehículos
Invoke-RestMethod -Uri "http://localhost:3001/vehiculo" -Method Get

# 2. Crear un Auto
$autoBody = @{
  tipo = "Auto"
  placa = "ABC-1234"
  marca = "Toyota"
  modelo = "Corolla"
  color = "Azul"
  anio = 2023
  clasificacion = "Gasolina"
  numeroPuertas = 4
  capacidadMaletero = 450
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/vehiculo" `
  -Method Post `
  -ContentType "application/json" `
  -Body $autoBody

# 3. Crear una Motocicleta
$motoBody = @{
  tipo = "Moto"
  placa = "XYZ-5678"
  marca = "Yamaha"
  modelo = "YZF R1"
  color = "Rojo"
  anio = 2022
  clasificacion = "Gasolina"
  tipoMotocicleta = "Deportiva"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/vehiculo" `
  -Method Post `
  -ContentType "application/json" `
  -Body $motoBody

# 4. Crear una Camioneta
$camionetaBody = @{
  tipo = "Camioneta"
  placa = "DEF-9012"
  marca = "Ford"
  modelo = "F150"
  color = "Blanco"
  anio = 2023
  clasificacion = "Diesel"
  cabina = "Doble"
  capacidadCarga = 5000
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/vehiculo" `
  -Method Post `
  -ContentType "application/json" `
  -Body $camionetaBody

# 5. Obtener un vehículo por ID (reemplaza ID con uno real)
Invoke-RestMethod -Uri "http://localhost:3001/vehiculo/550e8400-e29b-41d4-a716-446655440000" -Method Get

# 6. Actualizar un vehículo
$updateBody = @{
  color = "Verde"
  anio = 2024
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/vehiculo/550e8400-e29b-41d4-a716-446655440000" `
  -Method Patch `
  -ContentType "application/json" `
  -Body $updateBody

# 7. Eliminar un vehículo
Invoke-RestMethod -Uri "http://localhost:3001/vehiculo/550e8400-e29b-41d4-a716-446655440000" -Method Delete
*/
