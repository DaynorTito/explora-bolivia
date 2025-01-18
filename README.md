# Explora Bolivia
Portal de lugares turisticos de Bolivia en los distintos departamentos, con informacion del lugar, su ubicacion y el costo de visitar el lugar

## Explora Bolivia Service

Servicio backend para la plataforma Explora Bolivia, construido con NestJS para gestionar destinos turísticos, reseñas y manejo de imágenes sobre llos destinos turisticos de nuestro querido pais Bolivia, reflejando la diversidad de cultura que se tiene en la misma.

### Descripción del Proyecto

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

![alt text](<explora-bolivia-service/docs/Untitled Diagram.drawio.png>)

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

## Pipeline CI/CD - gitlab-ci.yml

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

## Explora-Bolivia-Client


### Descripción del Proyecto
Aplicación web frontend desarrollada para mostrar los atractivos turísticos de Bolivia, permitiendo a los usuarios explorar y descubrir los diversos destinos turísticos del país. Este proyecto forma parte de la iniciativa para promover el turismo en Bolivia.

## Stack Tecnológico

### Tecnologías Core
- **Next.js** (v15.1.4)
- **React** (v19.0.0)
- **TypeScript** (v5.x)
- **Node.js** (v20.x)
- **Tailwind CSS** (v3.4.1)

### Componentes UI y Bibliotecas
- **Radix UI** - Componentes de UI accesibles:
  - `@radix-ui/react-alert-dialog`: ^1.1.4
  - `@radix-ui/react-dialog`: ^1.1.4
  - `@radix-ui/react-select`: ^2.1.4
  - `@radix-ui/react-slider`: ^1.2.2
  - `@radix-ui/react-toast`: ^1.2.4
- **Shadcn UI** (v0.9.4) - Sistema de diseño personalizable
- **Leaflet** (v1.9.4) y **React Leaflet** (v5.0.0) - Mapas interactivos
- **Lucide React** (v0.471.0) - Iconos
- **Nextjs-toploader** (v3.7.15) - Barra de progreso

### Utilidades
- **class-variance-authority** (v0.7.1) - Manejo de variantes de clases
- **clsx** (v2.1.1) - Utilidad para clases condicionales
- **lodash.debounce** (v4.0.8) - Optimización de eventos
- **tailwind-merge** (v2.6.0) - Utilidad para Tailwind CSS

## Características Principales

### Exploración de Destinos
- Visualización de destinos turísticos
- Mapas interactivos con ubicaciones
- Búsqueda y filtros avanzados
- Carrusel de imágenes

![alt text](explora-bolivia-client/docs/image.png)

![alt text](explora-bolivia-client/docs/image-1.png)

### Gestión de Contenido
- Creación de destinos turísticos
- Edición de información existente
- Sistema de reseñas y calificaciones
- Gestión de imágenes

![alt text](explora-bolivia-client/docs/image-2.png)

### Edicion de Destinos

Se pueden cambiar todos sus atributos incluyendo imagenes, ubicaicon


![alt text](explora-bolivia-client/docs/image-5.png)

![alt text](explora-bolivia-client/docs/image-6.png)

Creacion de destinos

![alt text](explora-bolivia-client/docs/image-7.png)

Se pueden anjuntar imagenes desde el dispositivo

![alt text](explora-bolivia-client/docs/image-8.png)

### Mapa Interactivo

![alt text](explora-bolivia-client/docs/image-3.png)


### Resenas

Los usuario pueden comentar y calificar destino, para que las demas personas las vean

![alt text](explora-bolivia-client/docs/image-9.png)

### Filtrado de destinos, buscador

Se pueden realizar busquedas por nombr eo descirpcion, asi tambien como filtrados por precio, departamento en que se encuentran, y ordear de forma acendente o descendente

![alt text](explora-bolivia-client/docs/image-12.png)

![alt text](explora-bolivia-client/docs/image-13.png)

### Interfaz de Usuario
- Diseño responsivo
- Componentes accesibles
- Notificaciones y alertas
- Navegación intuitiva

![alt text](explora-bolivia-client/docs/image-4.png)

### Diseno Responsivo Adaptable a Tablets Celulates y PC

![alt text](explora-bolivia-client/docs/image-10.png)

![alt text](explora-bolivia-client/docs/image-11.png)

### Despliegue

Se realizo el despliegue con la conexion con el servidor se encuentra en la url

Se aparece alguna advertencia de sitio inseguro se omitr y acceder a esta url

Si el link no responde quiza sea necesario darle permisos desde el navegador a la url del servidor (http://18.231.107.133:4000/api/v1/
) cceder a esta url desde cualquier navegador y acceder tambien luego a la url del cliente que es

### http://56.124.121.148:3000/



## Estructura del Proyecto

```
src/
├── app/                  # Páginas y rutas de la aplicación
├── components/          
│   ├── destinations/    # Componentes específicos de destinos
│   ├── layout/         # Componentes de estructura
│   ├── resenas/        # Componentes de reseñas
│   └── ui/             # Componentes UI reutilizables
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades y funciones
└── types/              # Definiciones de tipos
```

## Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta el linter
npm run test         # Ejecuta las pruebas
npm run test:watch   # Ejecuta las pruebas en modo watch
```

## Configuración Docker

El proyecto incluye configuración para Docker:
- Dockerfile optimizado para producción
- Docker Compose para desarrollo
- Variables de entorno gestionadas

## Pipeline CI/CD

El pipeline de GitLab CI/CD incluye:
1. Configuración del entorno
2. Instalación de dependencias
3. Linting
4. Pruebas
5. Construcción de imagen Docker
6. Publicación de imagen
7. Despliegue

## Requisitos del Sistema
- Node.js 20.x o superior
- NPM 9.x o superior
- Docker (opcional)
- Git

## Pruebas
El proyecto utiliza:
- Jest
- Pruebas unitarias
