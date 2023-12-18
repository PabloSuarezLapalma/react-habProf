import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import SeleccionarCliente from './pages/SeleccionarCliente'
import ListarPosicionesCliente from './pages/ListarPosicionesCliente'
import ListadoMercaderiaPosicionCliente from './pages/ListarMercaderiaCliente'
import FormIngreso from './pages/FormIngreso'
import FormEgreso from './pages/FormEgreso'
import ListarMovimientos from './pages/ListarMovimientos'
import DescripcionMovimiento from './pages/DescripcionMovimiento'
import AgregarRack from './pages/AgregarRack'
import BajaRack from './pages/BajaRack'
import ListarModificarRack from './pages/ListarModificarRack'
import ModificarRack from './pages/ModificarRack'
import AgregarHangar from './pages/AgregarHangar'
import BajaHangar from './pages/BajaHangar'
import ListarModificarHangar from './pages/ListarModificarHangar'
import ModificarHangar from './pages/ModificarHangar'
import AgregarCliente from './pages/AgregarCliente'
import BajaCliente from './pages/BajaCliente'
import ListarClientes from './pages/ListarClientes'
import DescripcionCliente from './pages/DescripcionCliente'
import ListarModificarCliente from './pages/ListarModificarClientes'
import ModificarCliente from './pages/ModificarCliente'
import ListarPosicionesRelocalizar from './pages/ListarPosicionesRelocalizar'
import ListarMercaderiaPosicionRelocalizar from './pages/ListarMercaderiaPosicionRelocalizar'
import ListarPosicionesRelocalizarFin from './pages/ListarPosicionesRelocalizarFin'
import Monetizacion from './pages/Monetizacion'
import Error404 from './pages/Error404'

function App() {
  const idAlquiler="1234"
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/seleccionarCliente/:tipo" element={<SeleccionarCliente/>}/>
        <Route path="/listarPosicionesCliente/:tipo/:clienteSeleccionado" element={<ListarPosicionesCliente/>}/>
        <Route path="/formIngreso/:tipo/:clienteSeleccionado/:idPosicion" element={<FormIngreso/>}/>
        <Route path="/formEgreso/:tipo/:clienteSeleccionado/:idPosicion/:idMercaderia/:cantidad/:descripcion/:ancho/:largo/:alto" element={<FormEgreso/>}/>
        <Route path="/listadoMercaderiaPosicionCliente/:tipo/:clienteSeleccionado/:idPosicion" element={<ListadoMercaderiaPosicionCliente/>}/>
        <Route path="/agregarRack" element={<AgregarRack/>}/>
        <Route path='/bajarRack' element={<BajaRack/>}/>
        <Route path="/listarModificarRacks" element={<ListarModificarRack/>}/>
        <Route path="/modificarRack/:idRack" element={<ModificarRack />} />
        <Route path='/bajarCliente' element={<BajaCliente/>}/>
        <Route path="/agregarHangar" element={<AgregarHangar/>}/>
        <Route path="/bajarHangar" element={<BajaHangar/>}/>
        <Route path="/listarModificarHangar" element={<ListarModificarHangar/>}/>
        <Route path="/modificarHangar/:idHangar" element={<ModificarHangar />} />
        <Route path="/listarMovimientos" element={<ListarMovimientos/>}/>
        <Route path="/listarPosicionesRelocalizar" element={<ListarPosicionesRelocalizar alquiler={idAlquiler}/>}/>
        <Route path="/listarMercaderiaPosicionRelocalizar/:alquiler/:idPosicion" element={<ListarMercaderiaPosicionRelocalizar/>}/>
        <Route path="/listarPosicionesRelocalizarFin/:alquiler/:idPosicion/:idMercaderia/:cantidad" element={<ListarPosicionesRelocalizarFin/>}/>
        <Route path="/descripcionMovimiento/:codigoBWS" element={<DescripcionMovimiento />} />
        <Route path="/agregarCliente" element={<AgregarCliente/>}/>
        <Route path="/listarClientes" element={<ListarClientes/>}/>
        <Route path="/descripcionCliente/:codigo" element={<DescripcionCliente />} />
        <Route path="/listarModificarClientes" element={<ListarModificarCliente/>}/>
        <Route path="/modificarCliente/:codigo" element={<ModificarCliente />} />
        <Route path="/infoMonetizacion" element={<Monetizacion/>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
