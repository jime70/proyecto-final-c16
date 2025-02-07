import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Formulario from './Pages/Formulario';
import Catalog from './Pages/Catalog';
import { CatalogDetail } from './Pages/CatalogDetail';
import Layout from './Components/Layout';
import Store from './Pages/Store';  
import Services from './Pages/Services';


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/formulario', element: <Formulario /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/catalog/:id', element: <CatalogDetail /> },
      { path: '/store', element: <Store /> },  
      { path: '/services', element: <Services /> },  
    ],
  },
]);

export default Router;
