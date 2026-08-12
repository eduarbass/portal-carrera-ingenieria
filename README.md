# Portal Académico - Carrera

Este repositorio contiene el código fuente del Portal Académico desarrollado para la gestión de la información institucional, académica, investigativa y de vinculación.

## Tecnologías Utilizadas

El proyecto fue construido utilizando un stack moderno y eficiente enfocado en alto rendimiento y escalabilidad:

- **Frontend Framework**: [React 19](https://react.dev/)
- **Enrutamiento**: [React Router v7](https://reactrouter.com/)
- **Herramienta de Construcción**: [Vite 8](https://vitejs.dev/)
- **Estilos y Diseño**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Mapas Interactivos**: [React Leaflet](https://react-leaflet.js.org/) y Leaflet (Integración para el mapa inteligente de Los Vergeles).
- **Gráficos y Visualización de Datos**: [Recharts](https://recharts.org/) (Usado para el Dashboard IoT).
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Linter de Código**: [Oxlint](https://oxc.rs/) para mantener la calidad y rapidez en la revisión.

## Estructura del Sitio

Basado en el documento oficial de diseño de la página web, el portal está estructurado en las siguientes secciones estratégicas:

1. **INICIO**: Página principal con banners, videos institucionales, indicadores clave y accesos rápidos.
2. **LA CARRERA**: Información institucional como historia, misión, visión, perfil profesional, autoridades y malla curricular.
3. **DOCENTES**: Directorio de docentes con fichas detalladas que incluyen especialidad, proyectos, publicaciones y enlaces a Google Scholar, ORCID y Scopus.
4. **LABORATORIOS**: Secciones para los laboratorios de Redes, IoT, Electrónica y Robótica, mostrando equipamiento y manuales.
5. **CENTRO DE PRODUCCIÓN TECNOLÓGICA (CPT)**: Servicios, catálogo de productos, impresión 3D, IoT, y registro.
6. **INVESTIGACIÓN**: Detalle de las líneas de investigación. Destaca el micrositio del **Proyecto Los Vergeles**, que cuenta con monitoreo IoT en tiempo real y un Mapa Inteligente geolocalizado.
7. **VINCULACIÓN**: Proyectos sociales, convenios, capacitaciones y prácticas preprofesionales.
8. **SEMILLEROS**: Información sobre los grupos MINTEV y SMART MINDS, integrantes y proyectos.
9. **COMUNIDAD LOS VERGELES**: Micrositio orientado a los habitantes, mostrando su cultura, geografía y un formulario para reportar necesidades locales.
10. **REPOSITORIO**: Acceso centralizado a artículos, libros, tesis, normativas e informes.
11. **NOTICIAS**: Centro de novedades categorizado (Investigación, Eventos, Congresos, etc.).
12. **CONTACTO**: Mapas de ubicación, redes sociales y formularios de atención.
13. **PANEL ADMINISTRATIVO**: Entorno con roles definidos para que Administradores, Docentes, Estudiantes y la Comunidad gestionen actividades e información.

## Instalación y Desarrollo Local

Para correr el proyecto en un entorno local de desarrollo, sigue los siguientes pasos:

1. Clona el repositorio en tu equipo:
   ```bash
   git clone https://github.com/eduarbass/portal-carrera-ingenieria.git
   ```

2. Instala las dependencias de Node:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo con Vite:
   ```bash
   npm run dev
   ```
El proyecto se ejecutará por defecto en `http://localhost:5173`. Para compilar la versión de producción, utiliza el comando `npm run build`.
