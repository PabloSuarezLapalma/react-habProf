import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {HomeIcon} from "@heroicons/react/24/outline";



const AgregarHangar = () => {
  const [tamanio, setTamanio] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Objeto hangar
    const objetoHangar = [];

    for (let i = 0; i < tamanio; i++) {
      objetoHangar[i] = [];
    }
    // Agrego el hangar al array de hangar
    setHangar([...hangar, objetoHangar]);

    // Reinicio el formulario
    setTamanio(1);
  };

  return (
    <div className='max-w-7xl mx-auto lg:px-72 md:px-36 p-8 md:w-full text-left'>
      <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
        <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white">
            Registrar Nuevo Hangar
          </h1>
        </div>

        <form className='sm:ml-1 lg:ml-16 md:ml-14 sm:px-5 items-center flex-wrap' onSubmit={handleSubmit}>
          <div className='flex flex-wrap items-center'>
            <div className='flex items-center'>
              <label htmlFor='tamanio' className='block text-md font-medium text-left leading-6 text-gray-900 mr-2'>
                Tamaño del hangar
              </label>
              <input
                id='tamanio'
                name="tamanio"
                type="number"
                className="block sm:rounded-r-md md:rounded-r-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                value={tamanio}
                required
                placeholder='Tamaño del hangar'
                onChange={(e) => setTamanio(e.target.value)}
                style={{ height: '2.5rem' }} // Ajustar altura del input
              />
            </div>
            <input
              type="submit"
              id="agregarHangar"
              value="Registrar Hangar"
              className=' sm:rounded-l-md md:rounded-l-none bg-red-500 font-semibold mt-2 md:mt-0 rounded-md text-white justify-center px-6 py-2 text-lg leading-6 shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
              style={{ height: '2.5rem' }} // Ajustar altura del botón
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarHangar;
