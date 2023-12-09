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
import ListarMovimientos from './pages/ListarMovimientos'
import AgregarCliente from './pages/AgregarCliente'
import BajaCliente from './pages/BajaCliente'
import ListarClientes from './pages/ListarClientes'
import DescripcionCliente from './pages/DescripcionCliente'
import ListarModificarCliente from './pages/ListarModificarClientes'
import ModificarCliente from './pages/ModificarCliente'

function App() {
  const [idAlquiler, setIdAlquiler] = useState(0)
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/formIngreso" element={<FormIngreso idAlquiler={idAlquiler}/>}/>
        <Route path="/formEgreso" element={<FormEgreso idAlquiler={idAlquiler}/>}/>
        <Route path="/agregarRack" element={<AgregarRack/>}/>
        <Route path="/agregarHangar" element={<AgregarHangar/>}/>
        <Route path="/listarMovimientos" element={<ListarMovimientos/>}/>
        <Route path="/descripcionMovimiento/:codigoBWS" element={<DescripcionMovimiento />} />
        <Route path="/agregarCliente" element={<AgregarCliente/>}/>
        <Route path="/bajarCliente" element={<BajaCliente/>}/>
        <Route path="/listarClientes" element={<ListarClientes/>}/>
        <Route path="/descripcionCliente/:codigo" element={<DescripcionCliente />} />
        <Route path="/listarModificarClientes" element={<ListarModificarCliente/>}/>
        <Route path="/modificarCliente/:codigo" element={<ModificarCliente />} />
      
        <Route path='*' element={<Error404/>}/>
      </Routes>
      </BrowserRouter>
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