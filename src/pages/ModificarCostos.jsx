import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button} from '@material-tailwind/react';
import { Typography } from "@material-tailwind/react";
import { obtenerDatosActuales, agregarDatosGlobales } from '../scripts/global';

export default function ModificarCostos() {
  const [global, setGlobal] = useState(null);
  const [costoIngreso,setCostoIngreso] = useState(0);
  const [costoAlmacenamiento,setCostoAlmacenamiento] = useState(0)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isModified, setIsModified] = useState(false); // Nuevo estado para verificar si se han modificado datos
  const [nuevosValores, setNuevosValores] = useState({}); // Estado para almacenar los nuevos valores


  useEffect(() => {
    async function fetchCostos() {
      try {
        const globalEncontrado = await obtenerDatosActuales();
        setGlobal(globalEncontrado);
  
        if (globalEncontrado) {
          setCostoIngreso(globalEncontrado.costoIngreso || 0);
          setCostoAlmacenamiento(globalEncontrado.costoAlmacenamiento || 0);
        }
      } catch (error) {
        console.error('Error al obtener los costos:', error);
      }
    }
  
    fetchCostos();
  }, []); //aca capaz va algo
  
  useEffect(() => {
    const isDataModified =
    global &&
      (costoIngreso !== global.costoIngreso ||
        costoAlmacenamiento !== global.costoAlmacenamiento
      );
  
    setIsModified(isDataModified); // Actualiza el estado de modificación
  }, [costoIngreso,costoAlmacenamiento, global]);

  const handleGuardarCambios = async () => {
    try {
        const nuevosValoresTemp = {};
        // Asignación de nuevos valores
        if (costoIngreso !== global.costoIngreso) {
          nuevosValoresTemp['costoIngreso'] = costoIngreso;
        }
        if (costoAlmacenamiento !== global.costoAlmacenamiento) {
          nuevosValoresTemp['costoAlmacenamiento'] = costoAlmacenamiento;
        }
        // Actualización del estado 'nuevosValores'
        setNuevosValores(nuevosValoresTemp);
  
        // Verifica si hay cambios para actualizar
        if (Object.keys(nuevosValoresTemp).length > 0) {
          setShowConfirmationModal(true);
        } else {
          console.log('No hay cambios para actualizar');
        }
    } catch (error) {
      console.error('Error al actualizar los costos:', error);
    }
  };

  const confirmarActualizarGlobal = async () => {
    try {
      // Utiliza el estado 'nuevosValores' para la actualización
      await agregarDatosGlobales(costoIngreso,0,0,costoAlmacenamiento);

      const globalActualizado = await obtenerDatosActuales();
      setGlobal(globalActualizado);
    } catch (error) {
      console.error('Error al actualizar los costos:', error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 p-8 text-center items-center">
      {global && (
        <div className="bg-white pt-4 pb-4 mx-auto rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-auto">
          <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white">
              Actualizar costos
            </h1>
          </div>
          <div className="py-10 sm:ml-10 md:ml-10 lg:ml-10 xl:px-30 2xl:ml-50 sm:px-5 ">
            <div className="flex flex-wrap justify-center">
            <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Costo de ingreso (USD)
                </label>
                <input
                  type="number"
                  value={costoIngreso}
                  onChange={(e) => setCostoIngreso(e.target.value)}
                  placeholder="Costo de Ingreso"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
            </div>
            <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Costo de almacenamiento (USD)
                </label>
                <input
                  type="number"
                  value={costoAlmacenamiento}
                  onChange={(e) => setCostoAlmacenamiento(e.target.value)}
                  placeholder="Costo de Almacenamiento"
                  className="block w-full rounded-md  border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
            </div>
            </div>
            <div className='w-full  md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
            <Link to="/home" className='-mt-20'>
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
              ¿Está seguro que desea actualizar los costos?
            </Typography>
            <div className="flex justify-end gap-4">
            <Button
                variant="outlined"
                className="bg-red-400 text-white"
                size="sm"
                onClick={confirmarActualizarGlobal}
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