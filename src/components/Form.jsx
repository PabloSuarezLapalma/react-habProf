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
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 color-black rounded-md text-black sm:w-fit md:w-fit lg:w-fit">
            <div className="bg-red-500 ml-96 mr-96 rounded-md sm:w-1/4  ">
             <h1 className="text-3xl sm:text-xl md:text-2xl lg:text-4xl  font-bold mt-5 text-center mb-10 pt-4 pb-4  text-white ">Registrar Ingreso</h1>
            </div>
        <form onSubmit={handleSubmit} >
            <div className='flex flex-wrap'>
                <div className='w-full sm:w-auto text-left'>
                    <label className='left-0 text-lg sm:text-base md:text-lg lg:text-3xl '> 
                        ID Cliente:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={idCliente} onChange={(e) => setIDCliente(e.target.value)}  />
                    </label>
                </div>
                <div className='w-full sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Código BWS:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={codigoBWS} onChange={(e) => setCodigoBWS(e.target.value)}  />
                    </label>
                </div>
            </div>
            <div className='flex flex-wrap text-left'>
                <div className='mb-3 mt-3 w-full sm:w-auto'>
                    <label className='text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Fecha:
                        <input type="date" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </label>
                </div>
                <div className='mb-3 mt-3 w-full sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Hora aproximada de ingreso:
                        <input type="time" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={hora} onChange={(e) => setHora(e.target.value)} />
                    </label>
                </div>
            </div>
            <div className='flex flex-wrap'>
                <div className=' w-full sm:w-auto text-left'>
                    <label className='text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Nro Remito:
                        <input type="number" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={nroRemito} onChange={(e) => setNroRemito(e.target.value)} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl  '>
                        Transporte:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={transporte} onChange={(e) => setTransporte(e.target.value)} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left' >
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Tipo:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={tipoTransporte} onChange={(e) => setTipoTransporte(e.target.value)} />
                    </label>
                </div>
            </div>
            <div className='mb-3 mt-3 flex flex-wrap'>
                <div className=' w-full  sm:w-auto text-left'>
                    <label className='text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Chofer:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={chofer} onChange={(e) => setChofer(e.target.value)} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Chasis:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={chasis} onChange={(e) => setChasis(e.target.value)} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Acoplado:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={acoplado} onChange={(e) => setAcoplado(e.target.value)} />
                    </label>
                </div>
            </div>
            <div className='mb-3 mt-3 flex flex-wrap'>
                <div className='w-full sm:w-auto text-left'>
                    <label className='text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Descripción:
                        <textarea type="text" className='ml-2 rounded-md pl-2  h-8 align-middle bg-gray-500 text-white border-2 border-black' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Cantidad:
                        <input type="number" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black'  value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                    </label>
                </div>
            </div>
            <div className='mb-3 mt-3 flex flex-wrap'>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Posición:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' pattern="[A-Za-z]" maxLength={1} value={posicion} onChange={(e) => setPosicion(e.target.value.toUpperCase())} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Sector:
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' pattern="[A-Za-z]" maxLength={1} value={sector} onChange={(e) => setSector(e.target.value.toUpperCase())} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Altura:
                        <input type="number" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={altura} onChange={(e) => setAltura(e.target.value)} />
                    </label>
                </div>
            </div>
            <div className='mb-3 mt-3 flex flex-wrap'>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Ancho(cm):
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={ancho} onChange={(e) => setAncho(e.target.value)} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Largo(cm):
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={largo} onChange={(e) => setLargo(e.target.value)} />
                    </label>
                </div>
                <div className='w-full  sm:w-auto text-left'>
                    <label className='ml-10 text-lg sm:text-base md:text-lg lg:text-3xl '>
                        Alto(cm):
                        <input type="text" className='ml-2 rounded-md pl-2 bg-gray-500 text-white border-2 border-black' value={alto} onChange={(e) => setAlto(e.target.value)} />
                    </label>
                </div>
            </div>
            <button type="submit" className='bg-red-600 font-semibold  rounded-full text-white'>Guardar</button>
        </form>
        </div>
        </>
    );
    }

    export default Form;
