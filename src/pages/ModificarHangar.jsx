import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button} from '@material-tailwind/react';
import {actualizarHangar, obtenerHangarPorCodigo } from '../scripts/hangares';
import { Typography } from "@material-tailwind/react";

export default function ModificarHangar() {
  const { idHangar } = useParams();
  const [hangar, setHangar] = useState(null);
  const [tamanio, setTamanio] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isModified, setIsModified] = useState(false); // Nuevo estado para verificar si se han modificado datos
  const [nuevosValores, setNuevosValores] = useState({}); // Estado para almacenar los nuevos valores


  useEffect(() => {
    async function fetchHangares() {
      try {
        const hangarEncontrado = await obtenerHangarPorCodigo(idHangar);
        setHangar(hangarEncontrado);
  
        if (hangarEncontrado) {
          setTamanio(hangarEncontrado.tamanio || '');

          
        }
      } catch (error) {
        console.error('Error al obtener el hangar:', error);
      }
    }
  
    fetchHangares();
  }, [idHangar]);
  
  useEffect(() => {
    const isDataModified =
      hangar &&
      (tamanio !== hangar.tamanio);
  
    setIsModified(isDataModified); // Actualiza el estado de modificación
  }, [tamanio, hangar]);

  const handleGuardarCambios = async () => {
    try {
        const nuevosValoresTemp = {};
        // Asignación de nuevos valores
        if (tamanio !== hangar.tamanio) {
            nuevosValoresTemp['tamanio'] = tamanio;
          }

        // Actualización del estado 'nuevosValores'
        setNuevosValores(nuevosValoresTemp);
  
        // Verifica si hay cambios para actualizar
        if (Object.keys(nuevosValoresTemp).length > 0) {
          setShowConfirmationModal(true);
        } else {
          Alert('No hay cambios para actualizar');
        }
    } catch (error) {
      console.error('Error al actualizar el hangar:', error);
    }
  };

  const confirmarActualizarHangar = async () => {
    try {
      // Utiliza el estado 'nuevosValores' para la actualización
      await actualizarHangar(idHangar, nuevosValores);

      const hangarActualizado = await obtenerHangarPorCodigo(idHangar);
      setHangar(hangarActualizado);
    } catch (error) {
      console.error('Error al actualizar el hangar:', error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-wrap lg:px-72">
      {hangar && (
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
          <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white">
              Información del Hangar
            </h1>
          </div>
          <div className="py-10 sm:ml-10 md:ml-10 lg:ml-10 xl:px-30 2xl:ml-50 sm:px-5">
            <div className="flex flex-wrap justify-center">
            <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Tamaño
                </label>
                <input
                  type="number"
                  value={tamanio}
                  onChange={(e) => setTamanio(e.target.value)}
                  placeholder="Posicion"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
            </div>
            <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  ID Hangar
                </label>
                <input
                  type="text" 
                  disabled
                  className="bg-gray-200 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={hangar.idHangar || ''}
                />
            </div>
            </div>
            <div className='w-full  md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
            <Link to="/listarModificarHangar" className='-mt-20'>
              <Button className="font-semibold mx-8 rounded-md text-white justify-center leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                  Cancelar
              </Button>
            </Link>
            <Button  className="font-semibold mx-8 rounded-md bg-red-500 text-white justify-center leading-6 shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500" onClick={handleGuardarCambios}>
                  Guardar cambios
                </Button>
            </div>
            {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <Typography variant="h6" color="blue-gray" className="mb-4">
              ¿Está seguro que desea actualizar este Hangar?
            </Typography>
            <div className="flex justify-end gap-4">
            <Button
                variant="outlined"
                className="bg-red-400 text-white"
                size="sm"
                onClick={confirmarActualizarHangar}
                >
                Sí
            </Button>
            <Button
                variant="outlined"
                className="bg-gray-50"
                size="sm"
                onClick={() => setShowConfirmationModal(false)}
              >
                No
            </Button>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      )}
    </div>
    
  );
}