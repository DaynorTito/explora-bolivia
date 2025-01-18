# Explora Bolivia Service

Servicio backend para la plataforma Explora Bolivia, construido con NestJS para gestionar destinos turísticos, reseñas y manejo de imágenes sobre llos destinos turisticos de nuestro querido pais Bolivia, reflejando la diversidad de cultura que se tiene en la misma.

## Descripción del Proyecto

Este servicio proporciona una API RESTful para la gestión de destinos turísticos en Bolivia, incluyendo funcionalidades para manejar detalles de destinos pudiendo crearlos, editarlos, eliminarlos, información de ubicación con mapas interactivos, y reseñas de las personas sobre los destinos filtros de estos desitnos por precion calificacaciones y gestión de imágenes a través de la integración con Cloudinary.

## Stack Tecnológico

### Tecnologías Principales

- **Node.js** (v18.x)
- **NestJS** (v10.0.0)
- **TypeScript** (v5.1.3)
- **PostgreSQL** (v16)
- **Docker** (v20.10.16)
- **Docker Compose** (v3.x)

### Dependencias Principales y Versiones

- **@nestjs/common**, **@nestjs/core**, **@nestjs/platform-express**: ^10.0.0
  - Framework base de NestJS para construcción de aplicaciones escalables
- **@nestjs/typeorm**: ^10.0.2
  - ORM para manejo de base de datos
- **typeorm**: ^0.3.20
  - ORM para TypeScript y JavaScript
- **pg**: ^8.13.1
  - Cliente PostgreSQL
- **@nestjs/config**: ^3.3.0
  - Manejo de configuración y variables de entorno
- **class-validator**: ^0.14.1
  - Validación de DTOs
- **class-transformer**: ^0.5.1
  - Transformación de objetos
- **cloudinary**: ^2.5.1
  - Servicio de gestión de imágenes
- **nestjs-command**: ^3.1.4
  - Comandos CLI para seeding de base de datos

## Estructura del Proyecto

```
src/
├── config/              # Archivos de configuración (Cloudinary, etc.)
├── controllers/         # Controladores de la aplicación
├── database/           # Configuración de base de datos y seeders
├── destino-turistico/  # Módulo de destinos turísticos
├── modules/            # Módulos adicionales
├── resena/            # Módulo de reseñas
└── services/          # Implementación de servicios
```

## Esquema de Base de Datos

![alt text](<docs/Untitled Diagram.drawio.png>)

### Entidades Principales

- **DestinoTuristico**: Destinos turísticos
- **Ubicacion**: Información de ubicación
- **Resena**: Reseñas
- **Imagen**: Metadatos de imágenes

El diagrama se basa en los destinos turisticos que tiene una relaicon d euno a uno con ubicaicon donde se almacena los detalles del mismo, tambien otra entidad de imagenes para almacenar las url de las imagenes del destino que se suben al servicio, y por ultimo las resenas donde los usuarios dando su nombre o anonimos pueden calificar el destino

## Documentación de API

### Destinos Turísticos

- **GET** `/api/v1/destino-turistico`: Obtener todos los destinos
- **POST** `/api/v1/destino-turistico`: Crear destino
  ```json
  {
    "nombre": "",
    "descripcion": "",
    "departamento": "",
    "puntoSalida": "",
    "imagenesUrls": ["", "", ""],
    "calificacion": 0,
    "costoAprox": 0,
    "ubicacion": {
        "nombreUbicacion": "a",
        "latitud": 0,
        "longitud": 0,
        "tipo": "Plaza"
    },
    "resenas": [
        {"calificacion": 4, "comentario": "Es un lugar muy ataractivo ideal para pasar el fin de semana", "nombrePersona": "Juana Apaza"},
        {"calificacion": 4, "comentario": "El lugar es asombroso ideal para pasar el fin de semana con la familia", "nombrePersona": "Mario Choque"},
        {"calificacion": 2, "comentario": "No me agradaron las actividades, son muy llenas, recomiendo ir un dia ue no sea feriado o fin de semana"}
    ]
  };
  ```

### GET http://localhost:4000/api/v1/destino-turistico/id

### PUT http://localhost:4000/api/v1/destino-turistico/id

### DELETE http://localhost:4000/api/v1/destino-turistico/id

## Resenas

### POST http://localhost:4000/api/v1/resena/id

### GET http://localhost:4000/api/v1/resena/idDestino


# Imagenes

#### POST http://localhost:4000/api/v1/imagen


Se realizo el despliegue del backend puede ejecutarse

http://18.231.107.133:4000/api/v1/destino-turistico

Dando permisos al navegador

## Configuración Docker

El proyecto utiliza un Dockerfile multi-etapa para optimizar builds:
- Etapa de Builder: Compila código TypeScript
- Etapa de Producción: Crea imagen mínima de producción
- Puerto expuesto: 4000

La configuración de Docker Compose incluye:
- Servicio de aplicación NestJS
- Servicio de base de datos PostgreSQL
- Volumen persistente para base de datos
- Red personalizada para comunicación entre servicios

## Pipeline CI/CD

Pipeline de GitLab CI/CD incluye:
1. **Compile**: Compila código TypeScript
2. **Build**: Ejecuta linting y formatting
3. **Unit Tests**: Ejecuta suite de pruebas
4. **Coverage**: Genera reportes de cobertura
5. **Build Image**: Crea imagen Docker
6. **Push Image**: Publica en registro de contenedores

## Seeding de Base de Datos

El proyecto incluye seeders para inicializar la base de datos con datos de ejemplo:
- Destinos turísticos
- Datos de ubicación
- Datos de configuración básica

Ejecutar seeders: `npm run seed`

## Scripts Disponibles

```bash
npm run build          # Compila el proyecto
npm run format         # Formatea el código
npm run start          # Inicia el servidor
npm run start:dev      # Inicia el servidor en modo desarrollo
npm run start:debug    # Inicia el servidor en modo debug
npm run start:prod     # Inicia el servidor en modo producción
npm run lint           # Ejecuta el linting
npm run test          # Ejecuta pruebas
npm run test:watch    # Ejecuta pruebas en modo watch
npm run test:cov      # Genera reporte de cobertura
npm run test:e2e      # Ejecuta pruebas end-to-end
````

