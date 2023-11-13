import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Matrix from './components/Matrix'
import Login from './Login';


function App() {
  const [movimientos, setMovimientos] = useState([])
  return (
    <>
      <Form
        setMovimientos={setMovimientos}
        movimientos={movimientos}
      />
    </>
  )
}

export default App
