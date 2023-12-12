import { buscarMercaderia } from './mercaderia';
import { obtenerCodigoClienteAlquiler } from './alquileres';
import { obtenerDatosActuales } from './global';
import { registrarIngreso } from './ingreso';

export async function registrarIngresoRelocalizar(alquiler,idPosicion,idMercaderia)
{ 
    const codigoCliente= obtenerCodigoClienteAlquiler(alquiler)
    const costoRelocalizar = obtenerDatosActuales().costoRelocalizar;
    const nroRemito = "0000";
    const codigoBWS = `${codigoCliente}-${idPosicion}-${nroRemito}` 
    const mercaderia = buscarMercaderia(idMercaderia);
    const largo = mercaderia.largo;
    const ancho = mercaderia.ancho;
    const alto = mercaderia.alto;
    const cantidad = mercaderia.cantidad;
    const descripcion = mercaderia.descripcion;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
    registrarIngreso(codigoBWS,nroRemito,"RELOCALIZACION","BACI.SRL","-","-","-","-",costoRelocalizar,idMercaderia,Date.now(),time,codigoCliente,"-","-","-", idPosicion, descripcion, largo, ancho, cantidad,alto)
}