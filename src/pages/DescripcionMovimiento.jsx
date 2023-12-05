import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import {filtrarMovimiento} from "../scripts/movimientos";

export default function DescripcionMovimiento() {
  const { codigoBWS } = useParams();
  const [movimiento, setMovimiento] = useState(null);

  useEffect(() => {
    filtrarMovimiento(codigoBWS).then((movimientoFiltrado) => {
    setMovimiento(movimientoFiltrado);
     });
  }, [codigoBWS]);




  return (
    <div className="sm:px-0 bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-full md:w-full lg:w-full xl:w-full max-w-7xl mx-auto px-8 p-8 text-center">
    <div className="bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12 shadow-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white ">Información del movimiento</h1>
    </div>
    {movimiento ? ( // Agregar condición para verificar si movimiento tiene valor
      <div className="mt-6 border-t border-gray-300">
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">ID del cliente</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.codigoBWS.split("-")[0]}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Código BWS</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.codigoBWS}</dd>
          </div>  
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Fecha de ingreso</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.fecha}</dd> 
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Hora de ingreso</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.hora}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Número de Remito</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.nroRemito}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Transporte</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.transporte}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Tipo de transporte</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.descripTransporte}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Chofer</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.chofer}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Chásis</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.chasis}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Tipo de acoplado</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.acoplado}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Cantidad</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.cantidad}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Descripción</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.descripcion}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Posición</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.posicion}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Sector</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.sector}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Altura</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.altura}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Ancho</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.ancho}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Largo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.largo}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Alto</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.alto}</dd>
          </div>
          
          {movimiento.destino === '' ? <p></p> : <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-md font-medium leading-6 text-gray-900">Destino</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.destino}</dd>
                                                  </div>
          }
          
          {movimiento.tipoUnidad === '' ? <p ></p> : <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                  <dt className="text-md font-medium leading-6 text-gray-900">Tipo de unidad</dt>
                                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.tipoUnidad}</dd>
                                                </div>
          }

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-medium leading-6 text-gray-900">Estado</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{movimiento.estado}</dd>
          </div>
        </dl>
      </div>
       ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}