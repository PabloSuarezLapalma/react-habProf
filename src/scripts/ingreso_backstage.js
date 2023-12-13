import { buscarMercaderia } from './mercaderia';
import { obtenerCodigoClienteAlquiler } from './alquileres';
import { obtenerDatosActuales } from './global';
//import { registrarIngreso } from './ingreso';

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
    const hora = `${hours}:${minutes}`;
    const estado= "RELOCALIZACION";
    const nombreResponsable= "BACI.SRL";
    const transporte= "-";
    const chasis= "-";
    const chofer= "-";
    const acoplado= "-";
    const fecha= Date.now();
    const destino= "-";
    const tipoUnidad= "-";
    const tipoTransporte= "-";
    console.log("codigoBWS: ", codigoBWS);
    console.log("nroRemito: ", nroRemito);
    console.log("Estado: ", estado);
    console.log("nombreReponsable: ", nombreResponsable);
    console.log("Transporte: ", transporte);
    console.log("Chasis: ", chasis);
    console.log("Chofer: ", chofer);
    console.log("Acoplado: ", acoplado);
    console.log("Costo Relocalizar: ", costoRelocalizar);
    console.log("idMercaderia: ", idMercaderia);
    console.log("fecha: ", fecha);
    console.log("hora: ", hora);
    console.log("codigoCliente: ", codigoCliente);
    console.log("Destino: ", destino);
    console.log("tipoUnidad: ", tipoUnidad);
    console.log("tipoTransporte: ", tipoTransporte);
    console.log("idPosicion: ", idPosicion);
    console.log("Descripcion: ", descripcion);
    console.log("Largo: ", largo);
    console.log("Ancho: ", ancho);
    console.log("Alto: ",alto);
    console.log("Cantidad: ", cantidad);
    //registrarIngreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costoRelocalizar,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte, idPosicion, descripcion, largo, ancho, cantidad,alto)
}