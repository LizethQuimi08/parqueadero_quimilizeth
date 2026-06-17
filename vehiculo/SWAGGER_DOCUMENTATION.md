# Documentación de Swagger/OpenAPI

## 📚 Acceso a la Documentación Interactiva

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:3001/docs
```

## 🎯 Características de Swagger

### 1. **Interfaz Interactiva**
- Visualiza todos los endpoints disponibles
- Lee la descripción detallada de cada operación
- Ve los esquemas de solicitud y respuesta
- Prueba los endpoints directamente desde la interfaz

### 2. **Documentación Completa**
- **Titúlo API**: API de Vehículos
- **Versión**: 1.0.0
- **Descripción**: Documentación del servicio REST de vehículos
- **Contacto**: soporte@vehiculos.com

### 3. **Endpoints Documentados**

Todos los 5 endpoints CRUD están completamente documentados:

#### POST /vehiculo
- **Descripción**: Crear un nuevo vehículo
- **Ejemplos incluidos** para cada tipo:
  - Auto con numeroPuertas y capacidadMaletero
  - Moto con tipoMotocicleta
  - Camioneta con cabina y capacidadCarga
- **Códigos de respuesta**: 201, 400, 409

#### GET /vehiculo
- **Descripción**: Obtener todos los vehículos
- **Código de respuesta**: 200
- **Esquema de respuesta**: Array de vehículos

#### GET /vehiculo/:id
- **Descripción**: Obtener un vehículo específico
- **Parámetro**: id (UUID)
- **Códigos de respuesta**: 200, 404

#### PATCH /vehiculo/:id
- **Descripción**: Actualizar un vehículo
- **Parámetro**: id (UUID)
- **Ejemplo de actualización**: cambiar color y año
- **Códigos de respuesta**: 200, 400, 404

#### DELETE /vehiculo/:id
- **Descripción**: Eliminar un vehículo
- **Parámetro**: id (UUID)
- **Códigos de respuesta**: 200, 404

## 🧪 Cómo Probar los Endpoints en Swagger

### 1. **Expandir un Endpoint**
Haz clic en el endpoint que deseas probar (POST, GET, PATCH, DELETE)

### 2. **Ver Ejemplos**
- Para POST /vehiculo, hay 3 ejemplos predefinidos:
  - Auto
  - Motocicleta
  - Camioneta
- Haz clic en un ejemplo para cargarlo automáticamente

### 3. **Modificar Parámetros** (opcional)
Edita el JSON si necesitas personalizar los valores

### 4. **Ejecutar**
Haz clic en "Try it out" → "Execute"

### 5. **Ver Respuesta**
Se mostrará automáticamente el código de estado y la respuesta JSON

## 📋 DTOs Documentados

### CreateVehiculoDto
Todos los campos tienen:
- **Descripción clara** de qué representa
- **Tipo de dato**
- **Restricciones**: min/max, pattern, enum
- **Ejemplos** concretos
- **Información de requerimiento** (required/opcional)

### UpdateVehiculoDto
Hereda de CreateVehiculoDto pero permite campos opcionales

## 🔍 Funcionalidades Adicionales

### Opciones de Swagger UI
- **persistAuthorization**: Mantiene la autorización entre sesiones
- **docExpansion: 'list'**: Muestra lista por defecto
- **filter**: Permite filtrar endpoints por nombre
- **showRequestHeaders**: Muestra headers de la solicitud
- **operationsSorter: 'alpha'**: Ordena operaciones alfabéticamente

### Schema Validation
- Todos los campos tienen validaciones documentadas
- Los errores de validación se muestran en la respuesta 400
- Las restricciones de datos se reflejan en el esquema Swagger

## 📦 Descarga de Especificación OpenAPI

Desde Swagger UI puedes:
1. Ver el JSON completo de OpenAPI (botón "OpenAPI JSON")
2. Generar clientes en múltiples lenguajes usando swagger-codegen
3. Importar la especificación en herramientas como Postman

## 🚀 Archivo OpenAPI

La especificación OpenAPI completa se genera automáticamente y está disponible en:

```
http://localhost:3001/docs-json
```

## 💡 Ventajas de Usar Swagger

✅ **Documentación Automática**: Se actualiza con el código
✅ **Pruebas Interactivas**: No necesitas Postman o curl
✅ **Ejemplos Predefinidos**: Facilita el testing
✅ **Esquemas Visuales**: Entiende mejor la estructura
✅ **Exportable**: Comparte la especificación con el equipo
✅ **Multi-lenguaje**: Genera clientes en varios lenguajes

## 🔗 Enlaces Útiles

- **Swagger UI Local**: http://localhost:3001/docs
- **OpenAPI JSON**: http://localhost:3001/docs-json
- **Swagger Official**: https://swagger.io/
- **OpenAPI Spec**: https://spec.openapis.org/
