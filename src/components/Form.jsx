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
        <>
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 color-black rounded-md text-black sm:w-1/5 md:w-fit lg:w-fit">
            <div className="bg-red-500 ml-96 mr-96 rounded-md">
             <h1 className="text-3xl font-bold mt-5 text-center mb-10 pt-4 pb-4  text-white">Registrar Ingreso</h1>
         </div>
        <form onSubmit={handleSubmit} >
            <div className='mb-3 mt-3'>
                <label className='left-0 text-lg'> 
                    ID Cliente:
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={idCliente} onChange={(e) => setIDCliente(e.target.value)}  />
                </label>
                <label className='ml-10 text-lg'>
                    Código BWS:
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={codigoBWS} onChange={(e) => setCodigoBWS(e.target.value)}  />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label className='text-lg'>
                    Fecha:
                    <input type="date" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </label>
                <label className='ml-10 text-lg'>
                    Hora aproximada de ingreso:
                    <input type="time" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={hora} onChange={(e) => setHora(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label className='text-lg'>
                    Nro Remito:
                    <input type="number" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={nroRemito} onChange={(e) => setNroRemito(e.target.value)} />
                </label>
                <label className='ml-10 text-lg'>
                    Transporte:
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={transporte} onChange={(e) => setTransporte(e.target.value)} />
                </label>
                <label className='ml-10 text-lg'>
                    Tipo (de Transporte):
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={tipoTransporte} onChange={(e) => setTipoTransporte(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label className='text-lg'>
                    Chofer:
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={chofer} onChange={(e) => setChofer(e.target.value)} />
                </label>
                <label className='ml-10 text-lg'>
                    Chasis:
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={chasis} onChange={(e) => setChasis(e.target.value)} />
                </label>
                <label className='ml-10 text-lg'>
                    Acoplado:
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={acoplado} onChange={(e) => setAcoplado(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label className='text-lg'>
                    Descripción:
                    <textarea type="text" className='ml-2 rounded-md pl-2 w-1/3 h-8   align-middle bg-gray-600 text-white' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </label>
                <label className='ml-10 text-lg'>
                    Cantidad:
                    <input type="number" className='ml-2 rounded-md pl-2 bg-gray-600 text-white'  value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label className='text-lg'>
                    Posición:
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' pattern="[A-Za-z]" maxLength={1} value={posicion} onChange={(e) => setPosicion(e.target.value.toUpperCase())} />
                </label>
                <label className='ml-10 text-lg'>
                    Sector:
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' pattern="[A-Za-z]" maxLength={1} value={sector} onChange={(e) => setSector(e.target.value.toUpperCase())} />
                </label>
                <label className='ml-10 text-lg'>
                    Altura:
                    <input type="number" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={altura} onChange={(e) => setAltura(e.target.value)} />
                </label>
            </div>
            <div className='mb-3 mt-3'>
                <label className='text-lg'>
                    Ancho(cm):
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={ancho} onChange={(e) => setAncho(e.target.value)} />
                </label>
                <label className='ml-10 text-lg'>
                    Largo(cm):
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={largo} onChange={(e) => setLargo(e.target.value)} />
                </label>
                <label className='ml-10 text-lg'>
                    Alto(cm):
                    <input type="text" className='ml-2 rounded-md pl-2 bg-gray-600 text-white' value={alto} onChange={(e) => setAlto(e.target.value)} />
                </label>
            </div>
            <button type="submit" className='bg-red-600 font-semibold  rounded-full text-white'>Registrar</button>
        </form>
        </div>
        </>
    );
    }

    export default Form;
