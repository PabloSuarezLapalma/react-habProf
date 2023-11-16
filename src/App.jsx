import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Form from './pages/Form'
import DescripcionMovimiento from './pages/DescripcionMovimiento'
import Home from './pages/Home'
import Error404 from './pages/error404'



function App() {
  const [movimientos, setMovimientos] = useState([])
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/Form" element={<Form
        setMovimientos={setMovimientos}
        movimientos={movimientos}/>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
      </BrowserRouter>
      {movimientos.map((movimiento) => (
        <DescripcionMovimiento key={movimiento.codigoBWS} movimiento={movimiento} />
      ))}
    </>
  )
}

export default App

/* Esto va debajo de descripcion Movimiento
<Form
        setMovimientos={setMovimientos}
        movimientos={movimientos}
      />

*/

/*
{movimientos.map((movimiento) => (
        <DescripcionMovimiento key={movimiento.codigoBWS} movimiento={movimiento} />
      ))}
*/

/*
<Login/>
*/