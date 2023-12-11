import React, { useState } from 'react';
import {existeIDHangar,agregarHangar} from '../scripts/hangares';
import {HomeIcon} from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import {IconButton} from "@material-tailwind/react";




const AgregarHangar = () => {
  const [tamanio, setTamanio] = useState(1);
  const [idHangar, setIdHangar] = useState(1);

  const handleSubmit =async (e) => {
    e.preventDefault();
      
    const existsIDHangarResult = await existeIDHangar(idHangar);

    if (existsIDHangarResult) {
      alert('El ID ya se encuentra en uso, elija otro.')
      return;
    }

    agregarHangar(idHangar,tamanio);

    // Reinicio el formulario
    setTamanio(1);
    setIdHangar(1);
  };

  return (
    <div className=' max-w-7xl mx-auto p-8 flex flex-wrap lg:px-72'>
    <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
        
        <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white ">Registrar Nuevo Hangar</h1>
        </div>

    <form className= 'py-10  sm:px-5' onSubmit={handleSubmit} >
        
        <div className='flex justify-center flex-wrap '>
            
        <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5 '>
            
                <label htmlFor='idHangar' className='block text-md font-medium leading-6 text-gray-900'> 
                    Código del Hangar
                </label>
                    <input
                        id='idHangar'
                        name="idHangar" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        value={idHangar} 
                        required
                        placeholder='Codigo del Rack'
                        onChange={(e) => setIdHangar(e.target.value)}  
                    />
            </div>
            <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label htmlFor='tamanio' className='block text-md font-medium leading-6 text-gray-900'>
                Tamaño
                </label>
                    <input
                        id='tamanio'
                        name="tamanio" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={tamanio}
                        required
                        placeholder=' Tamaño' 
                        onChange={(e) => {setTamanio(e.target.value)}}
                    />

            </div>
            
        </div>
        <input 
            type="submit"
            id="hangarSubmit"
            value="Aceptar" 
            className='bg-red-500 font-semibold mt-5 rounded-md text-white justify-center px-10 py-2 text-lg leading-6 shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
        />
        
    </form>
    <Link to="/home" className="mx-auto -mt-28 "> 
              <IconButton variant="text">
                <HomeIcon className="h-8 w-8 text-red-500" />
              </IconButton>   
            </Link>
</div>
</div>
);
}
export default AgregarHangar;
