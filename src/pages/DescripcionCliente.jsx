import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import {Button} from "@material-tailwind/react";
import {obtenerClientePorCodigo} from "../scripts/clientes";

export default function DescripcionCliente() {
  const { codigo } = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    async function fetchCliente() {
      try {
        const clienteEncontrado = await obtenerClientePorCodigo(codigo);
        setCliente(clienteEncontrado);
      } catch (error) {
        console.error('Error al obtener el cliente:', error);
      }
    }

    fetchCliente();
  }, [codigo]);


  return (
    <div className='max-w-7xl mx-auto px-8 p-8 text-center items-center '>
      {cliente && (
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
          <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white ">Información del cliente</h1>
          </div>

          <div className='py-10 sm:ml-10 md:ml-10 lg:ml-10 xl:px-30 2xl:ml-50 sm:px-5  '>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Código de cliente
                </label>
                <input
                  type="text" 
                  readOnly
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={cliente.codigo || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Nombre del cliente
                </label>
                <input
                  type="text" 
                  readOnly
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={cliente.nombreCliente || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Responsable
                </label>
                <input
                  type="text" 
                  readOnly
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={cliente.responsable || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  CUIT
                </label>
                <input
                  type="text" 
                  readOnly
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={cliente.cuit || ''}
                />
              </div>

              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Teléfono
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={cliente.telefono || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Correo electrónico
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={cliente.email || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Nombre de usuario
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={cliente.username || ''}
                />
              </div> 
            </div>
            <Link to="/listarClientes" className="mx-auto -mt-20">
              <Button>
                  Volver atrás
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}