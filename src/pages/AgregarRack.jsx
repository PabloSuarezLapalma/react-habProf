import React, { useState } from 'react';

const AgregarRack = ({racks,setRacks}) => {
    const [altura,setAltura] = useState(1);
    const [posicion,setPosicion] = useState(1);
    const handleSubmit = (e) => {
        e.preventDefault();

        //Objeto rack        
        const objetoRack = [];

        for (let i = 0; i < altura; i++) {
            objetoRack[i] = [];
            for (let j = 0; j < posicion; j++) {
                objetoRack[i][j] = null;
            }
        } 
        
        //Agrego el rack al array de racks
        setRacks([...racks, objetoRack]);
        
        //Reseteo los valores de los inputs
        setAltura(1);
        setPosicion(1);




    };

//Altura = filas
//Posicion = columnas
    

    return (
        <div className=' max-w-7xl mx-auto lg:px-72 md:px-36 p-8 md:w-full text-left'>
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
            <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white ">Registrar Nuevo Rack</h1>
            </div>

        <form className= 'sm:ml-1 lg:ml-16 md:ml-14 sm:px-5' onSubmit={handleSubmit} >
            <div className='flex flex-wrap '>
            <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto px-10 '>
                    <label htmlFor='posicion' className='block text-md font-medium leading-6 text-gray-900'> 
                        Cantidad de columnas
                    </label>
                        <input
                            id='posicion'
                            name="posicion" 
                            type="number" 
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            value={posicion} 
                            required
                            placeholder='Cantidad de columnas'
                            onChange={(e) => setPosicion(e.target.value)}  
                        />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto px-10 '>
                <label htmlFor='altura' className='block text-md font-medium leading-6 text-gray-900'> 
                        Cantidad de filas
                    </label>
                        <input
                            id='altura'
                            name="altura" 
                            type="number" 
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            value={altura}
                            required
                            placeholder='Cantidad de filas' 
                            onChange={(e) => setAltura(e.target.value)}  
                        />

                </div>      
            <input 
                type="submit"
                id="agregarRack"
                value="Registrar Rack" 
                className='bg-red-500 sm:ml-40 font-semibold mt-5 rounded-md text-white justify-center px-8  py-2 text-lg leading-6 shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
            />
            </div>
        </form>
        </div>
        </div>
    );
}

export default AgregarRack;

