import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import FormIngreso from './pages/FormIngreso'
import FormEgreso from './pages/FormEgreso'
import DescripcionMovimiento from './pages/DescripcionMovimiento'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import AgregarRack from './pages/AgregarRack'
import AgregarHangar from './pages/AgregarHangar'

function App() {
  const [movimientos, setMovimientos] = useState([])
  const [racks, setRacks] = useState([])
  const [hangar, setHangar] = useState([])
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/formIngreso" element={<FormIngreso
        setMovimientos={setMovimientos}
        movimientos={movimientos}/>}/>
        <Route path="/formEgreso" element={<FormEgreso
        setMovimientos={setMovimientos}
        movimientos={movimientos}/>}/>
        <Route path="/agregarRack" element={<AgregarRack
        setRacks={setRacks}
        racks={racks}/>}/>
        <Route path="/agregarHangar" element={<AgregarHangar
        setHangar={setHangar}
        hangar={hangar}/>}/>
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
<FormIngreso
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