# Guía de Inicialización del Proyecto

## Requisitos del Sistema

### Versiones de Software Requeridas
- Node.js v18.x o superior
- Docker v20.10.16 o superior
- Docker Compose v3.x
- PostgreSQL v16 (si se ejecuta sin Docker)
- Git v2.x o superior

### Requisitos de Hardware
- Mínimo 2GB RAM
- 10GB de espacio en disco disponible
- Procesador: mínimo 2 núcleos

### Configuración del Entorno de Desarrollo

#### Configuración Recomendada de IDE
- VSCode con extensiones:
  - ESLint
  - Prettier
  - Docker
  - GitLens
  - NestJS Snippets

#### Configuración Recomendada de VSCode
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Configuración Inicial

1. Clonar el repositorio:
```bash
git clone https://gitlab.com/daynort/explora-bolivia-service.git
cd explora-bolivia-service
```

2. Copiar el archivo de entorno:
```bash
cp .env.example .env
```

3. Configurar variables de entorno en `.env`:
```plaintext
# Configuración de Base de Datos
DB_HOST=localhost        # Usar 'db' si se ejecuta con Docker
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=explora_bolivia

# Configuración de Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

4. Instalar dependencias:
```bash
npm install
```

## Flujo de Desarrollo

### Desarrollo Local
1. Iniciar PostgreSQL:
```bash
docker compose up -d
```

3. O de otra forma Iniciar aplicación:
```bash
npm run start:dev
```

### Usando Docker
```bash
docker-compose up --build
```

## Estrategia de Pruebas

### Pruebas Unitarias
- Ubicadas en archivos `*.spec.ts`
- Prueban componentes individuales
- Ejecutar: `npm run test`

## Gestión de Base de Datos

### Comandos de Migración / Pupular la base de datos si se inicia en dev
```bash
# Ejecutar migraciones
npm run seed
```

### Datos de Prueba (Seeders)
```bash
# Ejecutar todos los seeders
npm run seed

# Ejecutar seeder específico
npm run seed -- --seed=DestinoTuristicoSeeder
```

## Despliegue

### Build de Producción
```bash
npm run build
npm run start:prod
```

### Despliegue con Docker en Producción
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Guía de Solución de Problemas

### Problemas Comunes

1. Errores de Conexión a Base de Datos
```bash
# Verificar estado de PostgreSQL
docker-compose ps

# Ver logs
docker-compose logs db
```

2. Problemas con Subida de Imágenes a Cloudinary
- Verificar límites de tamaño de archivo
- Comprobar conectividad de red
- Validar credenciales de API

3. Errores de Build
- Limpiar node_modules y reinstalar
- Verificar versión de Node.js
- Actualizar dependencias

## Optimización de Rendimiento

### Consejos de Desarrollo
1. Utilizar query builder de TypeORM para consultas complejas
2. Implementar caché cuando sea apropiado
3. Usar índices adecuados en la base de datos
4. Optimizar tamaños de imágenes antes de subir

### Monitoreo
- Usar el sistema de logging integrado de NestJS
- Monitorear rendimiento de consultas de base de datos
- Seguimiento de tiempos de respuesta de API

## Mejores Prácticas de Seguridad

1. Mantener dependencias actualizadas
2. Usar variables de entorno para datos sensibles
3. Implementar validación adecuada
4. Seguir directrices OWASP

## Scripts Disponibles

### Desarrollo
```bash
npm run start:dev      # Iniciar en modo desarrollo
npm run start:debug    # Iniciar en modo debug
```

### Se relaizaron unit tests
```bash
npm run test          # Ejecutar pruebas unitarias
```

### Mantenimiento
```bash
npm run lint          # Ejecutar revisión de código
npm run format        # Formatear código
```

### Base de Datos
```bash
npm run seed          # Ejecutar seeders
```
