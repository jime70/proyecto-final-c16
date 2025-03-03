import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Store from "./Pages/Store";
import Catalog from "./Pages/Catalog";
import StoreDetail from "./Pages/StoreDetail";
import Services from "./Pages/Services";
import Information from "./Pages/Information";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Formulario from "./Pages/Formulario";
import Profile from "./Components/Profile/Profile";
import ClientState from "./contexts/clients/ClientState";

function App() {
  return (
    <>
      <Navbar />
      <ClientState> 
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/store" element={<Store />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/information" element={<Information />} />
        </Routes>
     
      </ClientState>
      <Footer />
    </>
  );
}

export default App;
