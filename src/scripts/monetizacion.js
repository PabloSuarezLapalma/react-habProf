import {obtenerCostoAlmacenamientoActual} from './global.js';
import {buscaridPosicionAlquiler} from './posiciones.js';
import {obtenerMercaderiasPosicion} from './mercaderia.js';
import {buscarMovimientosMercaderia} from './movimientos.js';
import { actualizarAlquiler } from './alquileres.js';

export function renuevaAlquiler(idAlquiler,renuevan){
    let renueva=false
    if (renuevan.includes(idAlquiler))
    {renueva=true}
    return renueva;
}

// Función para calcular la diferencia de días entre la fecha dada y la fecha actual
function calcularDiferenciaDias(fecha) {
    if (!(fecha instanceof Date)) {
      console.error('Error: La variable "fecha" no es de tipo Date.');
      console.warn('La variable fecha es de tipo ', typeof fecha, ' y su valor es ', fecha, '.');
      return 0; // O manejar el error de alguna otra manera
    }
  
    const fechaActual = new Date();
    fecha.setHours(0, 0, 0, 0);
    fechaActual.setHours(0, 0, 0, 0);
    const diferenciaMilisegundos = fechaActual.getTime() - fecha.getTime();
    return Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
  }
  

export async function calcularMontoAlquiler(fechaRenovacion,fechaIngreso,renueva){
let montoAlmacenamiento = 0;
let costoAlmacenamiento = await obtenerCostoAlmacenamientoActual();
let cantidadDias = 0;
console.log("Fecha de Ingreso: ",fechaIngreso);
console.log("Ultima Fecha de Renovacion: ",fechaRenovacion);
if (renueva === false && fechaRenovacion === null || renueva === true && fechaRenovacion === null){
    cantidadDias = calcularDiferenciaDias(fechaIngreso);
    montoAlmacenamiento= costoAlmacenamiento*cantidadDias;
    }
else if (fechaRenovacion != null){
    cantidadDias = calcularDiferenciaDias(fechaRenovacion);
    montoAlmacenamiento= (costoAlmacenamiento * cantidadDias).toFixed(1); // Limitar a dos decimales
}
console.log("Cantidad de Dias: ",cantidadDias);
console.log("Costo de Almacenamiento: ", costoAlmacenamiento);   
return montoAlmacenamiento;
}

export async function calcularMontoAlquilerPosiciones(idAlquiler){
 let montoTotalAlquilerPosiciones=0;
 let posicion= await buscaridPosicionAlquiler(idAlquiler);
 console.log("Alquiler: ",idAlquiler,"Posicion: ",posicion);
 if (!posicion) {
    throw new Error(`No se pudo encontrar la posición para el idAlquiler ${idAlquiler}`);
  }
 let mercaderias = await obtenerMercaderiasPosicion(posicion);
 for (let i = 0; i < mercaderias.length; i++) {
    let mercaderia = mercaderias[i];
    let movimientos = await buscarMovimientosMercaderia(mercaderia.idMercaderia);

    movimientos.forEach(movimiento => {
      console.log("Movimiento: ", movimiento.codigoBWS, "Costo: ", movimiento.costo);
      montoTotalAlquilerPosiciones += movimiento.costo;
    });
  }
  console.log("Monto Total Alquiler Posiciones: ",montoTotalAlquilerPosiciones);
return montoTotalAlquilerPosiciones;
}

export async function calcularMontoTotalAlquiler(idAlquiler,renuevan,fechaRenovacion,fechaIngreso)
{
    let total=0;
    let renueva= renuevaAlquiler(idAlquiler,renuevan);
    console.log("Alquiler ",idAlquiler,"renueva: ",renueva);
    let montoAlmacenamiento= await calcularMontoAlquiler(fechaRenovacion,fechaIngreso,renueva);
    let montoPosiciones = await calcularMontoAlquilerPosiciones(idAlquiler);
    total=montoAlmacenamiento+montoPosiciones;
    console.log("Monto de Alquiler para:",idAlquiler, ",  ",montoAlmacenamiento,"$");
    console.log("Monto de Movimientos para:",idAlquiler,",  ", montoPosiciones,"$");
    console.log("------------------------------------------------------------------------");

    return total;

}

export async function cierrreMes(renuevan, todoAlquileres){
  const fechaHoy= new Date();
  for (const alquiler of renuevan){
    await actualizarAlquiler(alquiler,'fechaRenovacion', fechaHoy)
  }
  const alquileresNoRenovados = todoAlquileres.filter(alquiler => !renuevan.includes(alquiler));

  for (const alquiler of alquileresNoRenovados){
    await actualizarAlquiler(alquiler,'fechaFin', fechaHoy)
  }
}