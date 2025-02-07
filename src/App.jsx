import './App.css'
import Gallery from "./Gallery/Gallery"; 
import Carousel from './Components/Carousel';

function App() {

  return (
    <>
     <Gallery />
      <h1>
        Bienvenido a "Huachitos", nuestra Fake Fundación de Adopción de Mascotas
      </h1>
      <p className="read-the-docs">
        La mejor compañía que buscas para ti y tu familia.
      </p>
      
      <Carousel />
    </>
  )
}

export default App