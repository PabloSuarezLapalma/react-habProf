import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { filtrarMovimientoxCodigo } from '../scripts/movimientos';
import {Link} from "react-router-dom";
import {Button} from "@material-tailwind/react";
import { buscarMercaderia } from '../scripts/mercaderia';
import { buscarPosicion } from '../scripts/posiciones';


export default function DescripcionMovimiento() {
  const { codigoBWS } = useParams();
  const [movimiento, setMovimiento] = useState(null);
  const [descripcionMercaderia, setDescripcionMercaderia] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [ancho, setAncho] = useState(0);
  const [largo, setLargo] = useState(0);
  const [alto, setAlto] = useState(0);
  const [sector, setSector] = useState('');
  const [posicion, setPosicion] = useState('');
  const [altura, setAltura] = useState('');


  useEffect(() => {
    filtrarMovimientoxCodigo(codigoBWS).then((movimientoFiltrado) => {
      setMovimiento(movimientoFiltrado);
      // Obtener la mercadería correspondiente al ID de la mercadería en el movimiento
      buscarMercaderia(movimientoFiltrado.idMercaderia).then((mercaderia) => {
        // Asignar la descripción de la mercadería al estado para mostrarla en los campos
        if (mercaderia.length > 0) {
          setDescripcionMercaderia(mercaderia[0].descripcion);
          setCantidad(mercaderia[0].cantidad);
          setAncho(mercaderia[0].ancho);
          setLargo(mercaderia[0].largo);
          setAlto(mercaderia[0].alto);
        }
      });
      // Obtener la posición sector altura correspondiente al ID de la posición en el movimiento
      buscarPosicion(movimientoFiltrado.idPosicion).then((posicion) => {
        // Asignar la descripción de la posicion al estado para mostrarla en los campos
        if (posicion.length > 0) {
          setSector(posicion[0].sector);
          setPosicion(posicion[0].posicion);
          setAltura(posicion[0].altura);
        }
      });

    });
    
  }, [codigoBWS]);



  return (
    <div className='max-w-7xl mx-auto px-8 p-8 text-center items-center '>
      {movimiento && (
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
          <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white ">Detalles del Movimiento</h1>
          </div>

          <div className='py-10 sm:ml-10 md:ml-10 lg:ml-10 xl:px-30 2xl:ml-50 sm:px-5  '>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Tipo de movimiento
                </label>
                <input
                  type="text" 
                  readOnly
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={movimiento.estado || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Fecha del movimiento
                </label>
                <input
                  type="text" 
                  readOnly
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={movimiento.fecha || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Hora del movimiento
                </label>
                <input
                  type="text" 
                  readOnly
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={movimiento.hora || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Remito
                </label>
                <input
                  type="text" 
                  readOnly
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={movimiento.nroRemito || ''}
                />
              </div>
              {movimiento.estado === "EGRESO" && (
                <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                  <label className='block text-md font-medium leading-6 text-gray-900'> 
                    Responsable
                  </label>
                  <input
                    type="text" 
                    readOnly
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                    value={movimiento.nombreResponsable || ''}
                  />
                </div>
              )}
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Código BWS
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={movimiento.codigoBWS || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Transporte
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={movimiento.descripcionTransporte || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Chofer
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={movimiento.chofer || ''}
                />
              </div> 
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Chasis
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={movimiento.chasis || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Acoplado
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={movimiento.acoplado || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Cantidad
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={cantidad}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Unidad
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={movimiento.tipoUnidad || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Descripcion
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={descripcionMercaderia || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Tipo
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={movimiento.tipo || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Ancho (cm)
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={ancho}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Largo (cm)
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={largo}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Alto (cm)
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={alto}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  M3 Ocupados
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={(ancho*largo*alto)/1000000}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Sector
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={sector}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Posicion
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={posicion}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Altura
                </label>
                <input
                  readOnly
                  type="text" 
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                  value={altura}
                />
              </div>              
            </div>
            <Button>
                <Link to="/listarMovimientos" className="mx-auto -mt-20"> 
                  Volver atrás
                </Link>
                </Button>
          </div>
        </div>
      )}
    </div>
  );
}