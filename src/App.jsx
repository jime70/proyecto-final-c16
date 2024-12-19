import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>
        Bienvenido a nuestra fakestore
      </h1>
      <p className="read-the-docs">
        Todo lo que buscas para ti y tu hogar
      </p>
    </>
  )
}

export default App
