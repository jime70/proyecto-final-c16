

# Proyecto Final: Implementación de un e-commerce usando React - FRONTEND

## Tabla de Contenidos
- [Proyecto Final: Implementación de un e-commerce usando React - FRONTEND](#proyecto-final-implementación-de-un-e-commerce-usando-react---frontend)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Requisitos](#requisitos)
  - [Introducción](#introducción)
  - [Instalación](#instalación)
  - [Implementación de Archivos y Componentes](#implementación-de-archivos-y-componentes)
      - [1.1. `Router.jsx`](#11-routerjsx)
      - [1.2. `main.jsx`](#12-mainjsx)
      - [1.3. `Pages`](#13-pages)
      - [1.4. `contexts`](#14-contexts)
    - [2. **Otras carpetas**](#2-otras-carpetas)
      - [2.1. `config`](#21-config)
    - [2.2.  `components`](#22--components)

---

## Requisitos
- React JS
- Vite
- Material UI
- React Router DOM
- Axios para consumo de APIs
- Stripe Checkout para procesar pagos

---

## Introducción
El frontend de esta aplicación fue desarrollado con React JS utilizando Vite como entorno de desarrollo rápido. La interfaz permite a los usuarios navegar por un catálogo de productos, iniciar sesión o registrarse, gestionar su perfil y realizar compras a través de la pasarela de pagos Stripe. Además, consume una API externa para mostrar animales disponibles para adopción. 

**Funcionalidades principales**
•	Registro e inicio de sesión de clientes
•	Visualización de productos por categoría
•	Visualización de animales rescatados (desde API externa)
•	Carrito de compras
•	Proceso de pago con Stripe
•	Acceso a perfil privado (sólo para usuarios logueados)
•	Rutas protegidas según autenticación

---

## Instalación
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/usuario/proyecto-module5-c16.git
   ```
2. **Acceder al directorio del proyecto:**
   ```bash
   cd PROYECTO7-BACKEND-FRONTEND
   ```
3. **Instalar las dependencias:**
   ```bash
   npm install
   ```
4. **Configurar el archivo `.env`:**
   Crear un archivo `.env` con el siguiente contenido:
```	
1. API externa – Animales rescatados
URL: https://huachitos.cl/api/animales
Se utiliza para mostrar animales en adopción dentro de la sección de rescate a través de: VITE_ANIMAL_API_URL=https://huachitos.cl/api/animales

2. API interna – Backend propio
URL base: http://localhost:3003/api 
Utilizada para manejar artículos, clientes, carritos y pagos, a través de:
VITE_BACKEND_URL=http://localhost:3003/api
```	
5. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```

---

---

## Implementación de Archivos y Componentes

#### 1.1. `Router.jsx`
El archivo Router.jsx define la estructura de navegación de la aplicación usando React Router DOM. En este archivo se configuran las rutas principales que conectan las URLs del navegador con los distintos componentes o páginas del frontend.
Funciones principales:
```
•	Establece rutas públicas como /, /store, /login, /register, etc.
•	Define rutas privadas como /profile o /checkout, protegidas mediante un componente de autenticación.
```

---

#### 1.2. `main.jsx`
Tiene como funciones principales:
- Renderiza el componente raíz <App /> dentro del elemento HTML con id="root".
- Envuelve la app con proveedores globales, como:
  
<ClientProvider> para manejar la autenticación del cliente (si usas ClientContext).
<BrowserRouter> para habilitar la navegación con React Router.

Importa estilos globales o CSS base (si es necesario).
Es un archivo fundamental que inicializa y monta toda la estructura del frontend en React.


#### 1.3. `Pages`
La carpeta /pages agrupa los componentes principales de vista que representan cada página completa del sitio web. Cada archivo dentro de esta carpeta corresponde directamente a una ruta definida en el Router.jsx.

**Funciones principales:**
•	Organizar las distintas pantallas completas de la aplicación (ej. Home, Login, Register, Store).
•	Facilitar la navegación del usuario a través de React Router.
•	Encapsular la lógica, estructura y estilos propios de cada sección.

**Ejemplos de componentes en /pages:**
•	Home.jsx: Página principal de bienvenida o presentación.
•	Store.jsx: Catálogo de productos disponibles para compra.
•	StoreDetail.jsx: Vista detallada de un artículo seleccionado.
•	Login.jsx / Register.jsx: Formularios para autenticar o registrar clientes.
•	Profile.jsx: Sección privada donde el usuario puede ver o editar sus datos.
•	Checkout.jsx: Pantalla de confirmación y pago de la compra.
•	ListadoAdoptame.jsx: Muestra los animales rescatados desde la API externa.



#### 1.4. `contexts`
La carpeta /contexts contiene la configuración del estado global de la aplicación usando React Context API. Esto permite compartir información importante (como datos del cliente autenticado) entre múltiples componentes sin necesidad de pasar props manualmente.
**Funciones principales:**
•	Centralizar el manejo de autenticación del cliente (inicio de sesión, logout, token).
•	Hacer persistente la sesión del usuario mientras navega por la aplicación.
•	Permitir acceso a los datos del cliente desde cualquier componente.

**Contiene las carpetas**
- `Clients`
- `Cart`
- `Articles`
- `Alert` 

Cada una de ellas maneja el State.jsx, Reducer.jsx y Context.jsx

---

### 2. **Otras carpetas**
#### 2.1. `config`
Contiene archivos Axios.jsx y Auth.jsx 
La carpeta `config` centraliza las configuraciones clave relacionadas con la conexión al backend y el manejo del token de autenticación. Su objetivo es mantener la lógica de red y seguridad organizada, reutilizable y fuera de los componentes visuales.
**Archivos incluidos:**
- Axios.jsx: Configura una instancia personalizada de Axios para conectarse al backend definido en las variables de entorno (VITE_BACKEND_URL).
- 
**Incluye:**
o	Interceptores que agregan automáticamente el token JWT a cada solicitud si está presente.
o	Manejo global de errores, incluyendo redirección automática al login si el token es inválido o expirado.
o	Mensajes de consola para facilitar el debugging durante el desarrollo.

- token.jsx
Función auxiliar para asignar o limpiar el token JWT desde localStorage en la configuración de Axios.
Se recomienda ejecutarla al iniciar sesión o cerrar sesión para garantizar que todas las solicitudes lleven el encabezado correcto (x-auth-token).

### 2.2.  `components`
La carpeta /components contiene todos los componentes reutilizables que forman la interfaz visual de la app. Estos componentes son piezas independientes que pueden ser usadas en múltiples páginas.
Funciones principales:
•	Definir la estructura visual del sitio (Navbar, Footer, Cards, Inputs, etc.).
•	Reutilizar diseño y lógica para mantener el código más limpio y organizado.
•	Mejorar la escalabilidad de la aplicación.
Ejemplos comunes:
•	Navbar.jsx: Barra de navegación superior.
•	Footer.jsx: Pie de página.
•	Card.jsx o TarjetaAdoptame.jsx: Componente visual para mostrar productos o animales.
•	InputAnimal.jsx: Campo de búsqueda o filtros para animales.

Contacto
📧 jimenaespinoza@gmail.com
👩‍💻 Desarrollado por Jimena Espinoza
🎓 Proyecto académico - Cohorte 16
📦 Backend completo con autenticación y Stripe