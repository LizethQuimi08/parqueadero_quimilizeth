# Pruebas Rápidas de Endpoints - PowerShell

## 1. Obtener todos los vehículos
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/vehiculo" -Method Get
```

## 2. Crear un Auto
```powershell
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
```

## 3. Crear una Motocicleta
```powershell
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
```

## 4. Crear una Camioneta
```powershell
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
```

## 5. Obtener un vehículo por ID (reemplaza ID con uno real)
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/vehiculo/[REEMPLAZA_CON_ID_REAL]" -Method Get
```

## 6. Actualizar un vehículo
```powershell
$updateBody = @{
  color = "Verde"
  anio = 2024
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/vehiculo/[REEMPLAZA_CON_ID_REAL]" `
  -Method Patch `
  -ContentType "application/json" `
  -Body $updateBody
```

## 7. Eliminar un vehículo
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/vehiculo/[REEMPLAZA_CON_ID_REAL]" -Method Delete
```

## Pruebas de Validación (Errores Esperados)

### Placa inválida (formato incorrecto)
```powershell
$errorBody = @{
  tipo = "Auto"
  placa = "INVALID"  # ❌ Debe ser ABC-1234
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
  -Body $errorBody
```

### Marca corta (menos de 3 caracteres)
```powershell
$errorBody = @{
  tipo = "Auto"
  placa = "ABC-1234"
  marca = "Ab"  # ❌ Debe tener al menos 3 caracteres
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
  -Body $errorBody
```

### Año fuera de rango
```powershell
$errorBody = @{
  tipo = "Auto"
  placa = "ABC-1234"
  marca = "Toyota"
  modelo = "Corolla"
  color = "Azul"
  anio = 2050  # ❌ Mayor que el año actual
  clasificacion = "Gasolina"
  numeroPuertas = 4
  capacidadMaletero = 450
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/vehiculo" `
  -Method Post `
  -ContentType "application/json" `
  -Body $errorBody
```

### Clasificación inválida
```powershell
$errorBody = @{
  tipo = "Auto"
  placa = "ABC-1234"
  marca = "Toyota"
  modelo = "Corolla"
  color = "Azul"
  anio = 2023
  clasificacion = "Carbón"  # ❌ Debe ser Eléctrico, Híbrido, Gasolina o Diésel
  numeroPuertas = 4
  capacidadMaletero = 450
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/vehiculo" `
  -Method Post `
  -ContentType "application/json" `
  -Body $errorBody
```

## Notas Importantes
- La placa debe ser **única** en la base de datos
- El ID es de tipo UUID (generado automáticamente)
- Todos los campos son **requeridos**
- Las validaciones ocurren **antes** de guardar en la BD
