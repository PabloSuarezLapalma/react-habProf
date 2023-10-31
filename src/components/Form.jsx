import React, { useState } from 'react';

const Form = () => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [nroRemito, setNroRemito] = useState('');
    const [transporte, setTransporte] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('');
    const [chofer, setChofer] = useState('');
    const [chasis, setChasis] = useState('');
    const [acoplado, setAcoplado] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [posicion, setPosicion] = useState('');
    const [sector, setSector] = useState('');
    const [altura, setAltura] = useState('');
    const [ancho, setAncho] = useState('');
    const [largo, setLargo] = useState('');
    const [alto, setAlto] = useState('');
    const [codigoBWS, setCodigoBWS] = useState('');
    const [idCliente, setIDCliente]= useState('');  

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission here
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className='mb-3 mt-3'>
                <label className='left-0'> 
                    ID Cliente:
                    <input type="text" className='ml-2 ' value={idCliente} onChange={(e) => setIDCliente(e.target.value)}  />
                </label>
                <label className='ml-10'>
                    Código BWS:
                    <input type="text" className='ml-2' value={codigoBWS} onChange={(e) => setCodigoBWS(e.target.value)}  />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label>
                    Fecha:
                    <input type="date" className='ml-2' value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </label>
                <label className='ml-10'>
                    Hora aproximada de ingreso:
                    <input type="time" className='ml-2' value={hora} onChange={(e) => setHora(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label>
                    Nro Remito:
                    <input type="number" className='ml-2' value={nroRemito} onChange={(e) => setNroRemito(e.target.value)} />
                </label>
                <label className='ml-10'>
                    Transporte:
                    <input type="text" className='ml-2' value={transporte} onChange={(e) => setTransporte(e.target.value)} />
                </label>
                <label className='ml-10'>
                    Tipo (de Transporte):
                    <input type="text" className='ml-2' value={tipoTransporte} onChange={(e) => setTipoTransporte(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label>
                    Chofer:
                    <input type="text" className='ml-2' value={chofer} onChange={(e) => setChofer(e.target.value)} />
                </label>
                <label className='ml-10'>
                    Chasis:
                    <input type="text" className='ml-2' value={chasis} onChange={(e) => setChasis(e.target.value)} />
                </label>
                <label className='ml-10'>
                    Acoplado:
                    <input type="text" className='ml-2' value={acoplado} onChange={(e) => setAcoplado(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label>
                    Descripción:
                    <input type="text" className='ml-2' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </label>
                <label className='ml-10'>
                    Cantidad:
                    <input type="number" className='ml-2'  value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label>
                    Posición:
                    <input type="text" className='ml-2' pattern="[A-Za-z]" maxLength={1} value={posicion} onChange={(e) => setPosicion(e.target.value.toUpperCase())} />
                </label>
                <label className='ml-10'>
                    Sector:
                    <input type="text" className='ml-2' pattern="[A-Za-z]" maxLength={1} value={sector} onChange={(e) => setSector(e.target.value.toUpperCase())} />
                </label>
                <label className='ml-10'>
                    Altura:
                    <input type="number" className='ml-2' value={altura} onChange={(e) => setAltura(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label>
                    Ancho:
                    <input type="text" className='ml-2' value={ancho} onChange={(e) => setAncho(e.target.value)} />
                </label>
                <label className='ml-10'>
                    Largo:
                    <input type="text" className='ml-2' value={largo} onChange={(e) => setLargo(e.target.value)} />
                </label>
                <label className='ml-10'>
                    Alto:
                    <input type="text" className='ml-2' value={alto} onChange={(e) => setAlto(e.target.value)} />
                </label>
            </div>
            <button type="submit" className='bg-red-600 font-semibold '>Registrar</button>
        </form>
    );
    }

    export default Form;
