# Guía de Endpoints - API de Vehículos

## Base URL
```
http://localhost:3001
```

## Endpoints Disponibles

### 1. GET /vehiculo
Obtiene la lista de todos los vehículos registrados.

**Ejemplo:**
```bash
curl http://localhost:3001/vehiculo
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "tipo": "Auto",
    "placa": "ABC-1234",
    "marca": "Toyota",
    "modelo": "Corolla",
    "color": "Azul",
    "anio": 2023,
    "clasificacion": "Gasolina",
    "numeroPuertas": 4,
    "capacidadMaletero": 450
  }
]
```

---

### 2. POST /vehiculo
Crea un nuevo vehículo en la base de datos.

**Para crear un AUTO:**
```bash
curl -X POST http://localhost:3001/vehiculo \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "Auto",
    "placa": "ABC-1234",
    "marca": "Toyota",
    "modelo": "Corolla",
    "color": "Azul",
    "anio": 2023,
    "clasificacion": "Gasolina",
    "numeroPuertas": 4,
    "capacidadMaletero": 450
  }'
```

**Para crear una MOTOCICLETA:**
```bash
curl -X POST http://localhost:3001/vehiculo \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "Moto",
    "placa": "XYZ-5678",
    "marca": "Yamaha",
    "modelo": "YZF R1",
    "color": "Rojo",
    "anio": 2022,
    "clasificacion": "Gasolina",
    "tipoMotocicleta": "Deportiva"
  }'
```

**Para crear una CAMIONETA:**
```bash
curl -X POST http://localhost:3001/vehiculo \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "Camioneta",
    "placa": "DEF-9012",
    "marca": "Ford",
    "modelo": "F150",
    "color": "Blanco",
    "anio": 2023,
    "clasificacion": "Diesel",
    "cabina": "Doble",
    "capacidadCarga": 5000
  }'
```

**Respuesta exitosa (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "tipo": "Auto",
  "placa": "ABC-1234",
  "marca": "Toyota",
  "modelo": "Corolla",
  "color": "Azul",
  "anio": 2023,
  "clasificacion": "Gasolina",
  "numeroPuertas": 4,
  "capacidadMaletero": 450
}
```

---

### 3. GET /vehiculo/:id
Obtiene un vehículo específico por ID.

**Ejemplo:**
```bash
curl http://localhost:3001/vehiculo/550e8400-e29b-41d4-a716-446655440000
```

**Respuesta exitosa (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "tipo": "Auto",
  "placa": "ABC-1234",
  "marca": "Toyota",
  "modelo": "Corolla",
  "color": "Azul",
  "anio": 2023,
  "clasificacion": "Gasolina",
  "numeroPuertas": 4,
  "capacidadMaletero": 450
}
```

**Error (404):**
```json
{
  "statusCode": 404,
  "message": "Vehículo con ID 550e8400-e29b-41d4-a716-446655440999 no encontrado"
}
```

---

### 4. PATCH /vehiculo/:id
Actualiza parcialmente un vehículo.

**Ejemplo:**
```bash
curl -X PATCH http://localhost:3001/vehiculo/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "color": "Rojo",
    "anio": 2024
  }'
```

**Respuesta exitosa (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "tipo": "Auto",
  "placa": "ABC-1234",
  "marca": "Toyota",
  "modelo": "Corolla",
  "color": "Rojo",
  "anio": 2024,
  "clasificacion": "Gasolina",
  "numeroPuertas": 4,
  "capacidadMaletero": 450
}
```

---

### 5. DELETE /vehiculo/:id
Elimina un vehículo.

**Ejemplo:**
```bash
curl -X DELETE http://localhost:3001/vehiculo/550e8400-e29b-41d4-a716-446655440000
```

**Respuesta exitosa (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "tipo": "Auto",
  "placa": "ABC-1234",
  "marca": "Toyota",
  "modelo": "Corolla",
  "color": "Rojo",
  "anio": 2024,
  "clasificacion": "Gasolina",
  "numeroPuertas": 4,
  "capacidadMaletero": 450
}
```

---

## Validaciones

### Placa
- Formato requerido: `ABC-1234` (3 letras mayúsculas + 4 dígitos)
- Debe ser única en la base de datos

### Marca
- Mínimo 3 caracteres
- Máximo 50 caracteres
- Solo letras y espacios

### Modelo
- Mínimo 1 carácter
- Máximo 20 caracteres
- Letras, números y espacios

### Color
- Mínimo 4 caracteres
- Máximo 20 caracteres
- Solo letras y espacios

### Año
- Mínimo 1900
- Máximo año actual (2026)

### Clasificación
- Válidas: `Eléctrico`, `Híbrido`, `Gasolina`, `Diésel`

### Tipo de Vehículo
- Válidas: `Auto`, `Moto`, `Camioneta`

---

## Instrucciones de Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar base de datos
Edita el archivo `.env` con tus credenciales de PostgreSQL

### 3. Ejecutar la aplicación
```bash
npm run start:dev
```

### 4. La aplicación creará automáticamente las tablas
TypeORM sincronizará automáticamente las entidades con la base de datos (sincronize: true en desarrollo)

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - La placa ya existe |
