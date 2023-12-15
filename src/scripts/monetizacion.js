import {obtenerCostoAlmacenamientoActual} from './global.js';
import {buscaridPosicionAlquiler} from './posiciones.js';
import {obtenerMercaderiasPosicion} from './mercaderia.js';
import {buscarMovimientosMercaderia} from './movimientos.js';

export function renuevaAlquiler(idAlquiler,renuevan){
    let renueva=false
    if (renuevan.includes(idAlquiler))
    {renueva=true}
    return renueva;
}

export async function calcularMontoAlquiler(fechaRenovacion,fechaIngreso,renueva){
let montoAlmacenamiento = 0;
let costoAlmacenamiento = await obtenerCostoAlmacenamientoActual();
let cantidadDias = 0;
if (renueva === false && fechaRenovacion === null || renueva === true && fechaRenovacion === null){
    cantidadDias = Math.floor((Date.now() - fechaIngreso.getTime()) / (1000 * 60 * 60 * 24));
    montoAlmacenamiento= costoAlmacenamiento*cantidadDias;
    }
else if (fechaRenovacion != null){
    cantidadDias = Math.floor((Date.now() - fechaRenovacion.getTime()) / (1000 * 60 * 60 * 24));   
    montoAlmacenamiento= costoAlmacenamiento*cantidadDias;
}
return montoAlmacenamiento;
}

export async function calcularMontoAlquilerPosiciones(idAlquiler){
 let montoTotalAlquilerPosiciones=0;
 let posicion= await buscaridPosicionAlquiler(idAlquiler);
 if (!posicion) {
    throw new Error(`No se pudo encontrar la posición para el idAlquiler ${idAlquiler}`);
  }
 let mercaderias = await obtenerMercaderiasPosicion(posicion);
 let movimientos = await Promise.all(mercaderias.map(async (mercaderia) => {
    return await buscarMovimientosMercaderia(mercaderia.idMercaderia);
}));
movimientos.forEach(movimiento => {
    montoTotalAlquilerPosiciones= montoTotalAlquilerPosiciones + movimiento.costo;
});
return montoTotalAlquilerPosiciones;
}

export async function calcularMontoTotalAlquiler(idAlquiler,renuevan,fechaRenovacion,fechaIngreso)
{
    let total=0;
    let renueva= renuevaAlquiler(idAlquiler,renuevan);
    let montoAlmacenamiento= await calcularMontoAlquiler(fechaRenovacion,fechaIngreso,renueva);
    let montoPosiciones = await calcularMontoAlquilerPosiciones(idAlquiler);
    total=montoAlmacenamiento+montoPosiciones;
    return total;

}