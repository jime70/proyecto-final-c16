import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import ClientState from "./contexts/clients/ClientState";
import StoreState from "./contexts/store/StoreState";
import CartState from "./contexts/Cart/CartState";
import AlertState from "./contexts/Alert/AlertState";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AlertState>
      <ClientState>
        <StoreState>
          <CartState>
            <RouterProvider router={Router} />
          </CartState>
        </StoreState>
      </ClientState>
    </AlertState>
  </StrictMode>
);
