Aquí tienes una versión ampliada del `README.md` que explica cómo se implementan los archivos y componentes en tu proyecto. El enfoque está en detallar la funcionalidad y el propósito de cada componente, con ejemplos de uso cuando sea relevante.

---

# Proyecto 5: Aplicación Web con React

## Tabla de Contenidos
1. [Requisitos](#requisitos)  
2. [Introducción](#introducción)  
3. [Instalación](#instalación)  
4. [Estructura del Proyecto](#estructura-del-proyecto)  
5. [Implementación de Archivos y Componentes](#implementación-de-archivos-y-componentes)  
6. [Funcionamiento](#funcionamiento)  

---

## Requisitos
- React
- Vite
- Material UI
- React Router DOM

---

## Introducción
En este proyecto se construyó una aplicación web que consume datos de una API pública para mostrar información sobre animales disponibles para adopción. Incluye funcionalidades como:
- Conexión con una API externa.
- Mostrar datos en una interfaz visualmente atractiva.
- Interacción del usuario mediante formularios y botones.

---

## Instalación
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/usuario/proyecto-module5-c16.git
   ```
2. **Acceder al directorio del proyecto:**
   ```bash
   cd proyecto-module5-c16
   ```
3. **Instalar las dependencias:**
   ```bash
   npm install
   ```
4. **Configurar el archivo `.env`:**
   Crear un archivo `.env` con el siguiente contenido:
   ```
   VITE_ANIMAL_API_URL=https://huachitos.cl/api/animales
   ```
5. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```

---

## Estructura del Proyecto

```plaintext
📦 Proyecto-module5-c16
├── 📂 src
│   ├── 📂 components
│   │   ├── AnimalFinder.jsx
│   │   ├── Carousel.css
│   │   ├── Carousel.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Layout.jsx
│   ├── 📂 Helpers
│   │   ├── CarouselData.js
│   ├── 📂 hooks
│   │   ├── UseFetchAnimal.js
│   ├── 📂 Images
│   ├── 📂 pages
│   │   ├── Catalog.jsx
│   │   ├── CatalogDetail.jsx
│   │   ├── Formulario.jsx
├── 📜 .env
├── 📜 App.css
├── 📜 App.jsx
├── 📜 Router.jsx
```

---

## Implementación de Archivos y Componentes

#### 1.1. `Carousel.jsx`
Muestra un carrusel de imágenes con información de los animales en adopción. Utiliza un estado interno para controlar la navegación entre imágenes.

**Características:**
- Cambiar entre imágenes con botones.
- Importación de datos de `CarouselData.js`.

**Ejemplo de navegación:**
```jsx
<button onClick={handleNext}>Siguiente</button>
<button onClick={handlePrev}>Anterior</button>
```

---

#### 1.2. `ErrorBoundary.jsx`
Este componente es una clase que envuelve otros componentes para capturar errores y mostrar un mensaje amigable al usuario.

**Características:**
- Muestra una imagen de error personalizada, sin que se colapse el servidor.

---

#### 1.3. `Navbar.jsx`
Barra de navegación fija en la parte superior, diseñada con Material UI, que permite moverse entre las diferentes secciones de la aplicación.

**Ejemplo de rutas:**
```jsx
<Button component={Link} to="/catalog">Catálogo</Button>
<Button component={Link} to="/formulario">Formulario</Button>
```

---

#### 1.4. `Layout.jsx`
Componente principal que organiza el diseño de la aplicación. Incluye:
- `Navbar`
- `ErrorBoundary`
- `Footer`
- `Outlet` para renderizar contenido dinámico según las rutas.

---

### 2. **Helpers**
#### 2.1. `CarouselData.js`
Archivo que contiene datos estáticos del carrusel, como imágenes y descripciones.

**Ejemplo:**
```javascript
export const images = [
  { title: "Lola", subtitle: "Hola, soy Lola y estoy en adopción", img: Lola },
];
```
### 3. **Pages**
### 3.1.  `Carousel.jsx`
Página principal del catálogo de animales en adopción. Incluye paginación y tarjetas con información básica de cada animal.

<Button
  component={Link}
  to={`/catalog/${animal.id}`}
  state={{ animal }}
>
  Más Información
</Button>

---

#### 3.2. `CatalogDetail.jsx`
Muestra detalles completos de un animal seleccionado desde el catálogo.

---

#### 3.3. `Formulario.jsx`
Formulario para que los usuarios contacten a la fundación y realicen solicitudes de adopción.

**Características:**
- Muestra un modal al enviar el formulario.
- Validación básica de campos requeridos.

---

### 4. **Router**
Define las rutas principales de la aplicación, incluyendo:
- `/`: Página de inicio.
- `/catalog`: Catálogo de animales.
- `/catalog/:id`: Detalle de un animal.
- `/formulario`: Formulario de contacto.

---

## Funcionamiento

1. **Inicio**: La aplicación comienza con una página de bienvenida que incluye un carrusel con imágenes.
2. **Catálogo**: El usuario puede navegar al catálogo y ver una lista de animales.
3. **Detalle**: Al seleccionar un animal, se muestra información detallada.
4. **Formulario**: Permite enviar una solicitud de adopción.

