# Guía de Inicialización - Explora Bolivia Client

## Requisitos Previos

### Software Necesario
- Node.js (v20.x o superior)
- NPM (v9.x o superior)
- Git
- Docker (opcional)
- VS Code (recomendado)

### Extensiones Recomendadas para VS Code
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- GitLens

## Pasos de Instalación

1. Clonar el Repositorio
```bash
git clone https://gitlab.com/daynort/explora-bolivia-client.git

cd explora-bolivia-client
```

2. Instalar Dependencias
```bash
npm install
```

3. Configurar Variables de Entorno
```bash
# Crear archivo .env.local
cp .env.example .env.local

# Configurar las siguientes variables:
NEXT_PUBLIC_BASE_URL=http://localhost:4000 // dependiendo de donde inicializo el backend
```

## Ejecución del Proyecto

### Desarrollo Local
```bash
# Iniciar en modo desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

### Usando Docker
```bash
# Construir y ejecutar contenedores
docker-compose up --build
```

## Pruebas

### Ejecutar Pruebas
```bash
# Pruebas unitarias
npm run test

# Pruebas en modo watch
npm run test:watch
```

### Estructura de Pruebas
- Ubicación: `src/components/**tests**`
- Nombrado: `[ComponentName].test.ts`
- Utiliza Jest y Testing Library

## Desarrollo

### Estructura de Componentes
1. Páginas (`src/app`)
   - Rutas y páginas principales
   - Layouts específicos

2. Componentes (`src/components`)
   - Componentes reutilizables
   - Componentes específicos por función

3. UI Components (`src/components/ui`)
   - Botones, inputs, modales
   - Componentes base

### Estilos
- Utilizar Tailwind CSS
- Seguir el sistema de diseño establecido
- Mantener consistencia con Shadcn UI

## Solución de Problemas Comunes

### Problemas de Instalación
```bash
# Limpiar caché de npm
npm clean-cache --force

# Eliminar node_modules
rm -rf node_modules
npm install
```

### Errores Comunes
1. Problemas con TypeScript
   - Verificar tipos definidos
   - Actualizar definiciones de tipos

2. Errores de Build
   - Limpiar caché de Next.js
   - Verificar compatibilidad de dependencias

## Despliegue

### Build de Producción
```bash
npm run build
npm run start
```

### Docker Production
```bash
docker build -t explora-bolivia-client .
docker run -p 3000:3000 explora-bolivia-client
```

## Mantenimiento

### Actualización de Dependencias
```bash
# Verificar actualizaciones
npm outdated

# Actualizar dependencias
npm update
```

### Linting y Formateo
```bash
# Ejecutar ESLint
npm run lint

# Formatear código
npm run format
```

### Despliegue

Se realizo el despliegue con la conexion con el servidor se encuentra en la url

Se aparece alguna advertencia de sitio inseguro se omitr y acceder a esta url

Si el link no responde quiza sea necesario darle permisos desde el navegador a la url del servidor (http://18.231.107.133:4000/api/v1/
) cceder a esta url desde cualquier navegador y acceder tambien luego a la url del cliente que es

### http://56.124.121.148:3000/

## Consideraciones de Rendimiento

### Optimizaciones
1. Lazy loading de componentes
2. Optimización de imágenes
3. Caching efectivo
4. Code splitting automático

### Monitoreo
- Lighthouse scores
- Web Vitals
- Tiempo de carga

## Guías de Estilo

### Convenciones de Código
- Usar TypeScript strict mode
- Seguir principios de Clean Code
- Documentar componentes complejos

### Commits
- Usar commits semánticos
- Incluir descripciones claras
- Referenciar issues cuando aplique

## Recursos Adicionales
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Guía de Shadcn UI](https://ui.shadcn.com)