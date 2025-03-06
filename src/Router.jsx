import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import App from "./App";
import Formulario from "./Pages/Formulario";
import Catalog from "./Pages/Catalog";
import { CatalogDetail } from "./Pages/CatalogDetail";
import Store from "./Pages/Store";
import Services from "./Pages/Services";
import Us from "./Pages/Information";
import StoreDetail from "./Pages/StoreDetail";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";

export const Router = createBrowserRouter([
  {
    path: "/*",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },  
      { path: "formulario", element: <Formulario /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <CatalogDetail /> },
      { path: "store", element: <Store /> },
      { path: "store/:id", element: <StoreDetail /> },
      { path: "services", element: <Services /> },
      { path: "information", element: <Us /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default Router;
