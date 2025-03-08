import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
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
import Checkout from "./Components/Checkout/Checkout";
import Profile from "./Components/Profile/Profile";
import Private from "./routes/Private";
import Auth from "./routes/Auth";

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
      { path: "register", element: <Auth component={Register} /> },
      { path: "login", element: <Auth component={Login} /> },
      { path: "checkout", element: <Private component={Checkout} /> },
      { path: "profile", element: <Private component={Profile} /> },
    ],
  },
]);

export default Router;
