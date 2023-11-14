import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Matrix from './components/Matrix'
import Login from './Login';
import DescripcionMovimiento from './components/DescripcionMovimiento';

function App() {
  const [movimientos, setMovimientos] = useState([])
  return (
    <>
      <Form
        setMovimientos={setMovimientos}
        movimientos={movimientos}
      />
      {movimientos.map((movimiento) => (
        <DescripcionMovimiento key={movimiento.id} movimiento={movimiento} />
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