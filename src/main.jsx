import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import ClientState from "./contexts/clients/ClientState"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <ClientState>  
        <RouterProvider router={Router} />
      </ClientState>
    
  </StrictMode>
);
