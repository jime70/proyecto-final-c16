import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; 
import Router from "./Router"; 
import UserState from "./contexts/clients/UserState"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserState> 
      <RouterProvider router={Router} />
    </UserState>
  </StrictMode>
);
