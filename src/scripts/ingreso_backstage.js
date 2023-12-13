import { buscarMercaderia,agregarMercaderia } from './mercaderia';
import { obtenerCodigoClienteAlquiler } from './alquileres';
import { obtenerCostoRelocalizacionActual} from './global';
import { agregarMovimiento } from './movimientos';
import { actualizarPosicion,obtenerVolumenPosicion } from './posiciones';

export async function registrarIngresoRelocalizar(alquiler,idPosicion,idMercaderia,cantidadNueva,nuevoIdMercaderia)
{ 
    const codigoCliente=  await obtenerCodigoClienteAlquiler(alquiler) 
    const costoRelocalizar = await obtenerCostoRelocalizacionActual();  
    const nroRemito = Math.floor(1000 + Math.random() * 9000);
    const codigoBWS = `${codigoCliente}-${idPosicion}-${nroRemito}` 
    const mercaderia = await buscarMercaderia(idMercaderia);
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
    const fecha= new Date();
    const destino= "-";
    const tipoUnidad= "-";
    const tipoTransporte= "-";
    console.log("REGISTRAR INGRESO")
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
    await agregarMovimiento(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costoRelocalizar,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte)
    await agregarMercaderia(nuevoIdMercaderia, descripcion, largo, ancho, alto, idPosicion, cantidadNueva)
    const volumenNuevo= largo*ancho*alto*cantidad
    let volumenViejo =await obtenerVolumenPosicion(idPosicion)
    await actualizarPosicion(idPosicion, "volumen",volumenViejo-volumenNuevo)
    //registrarIngreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costoRelocalizar,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte, idPosicion, descripcion, largo, ancho, cantidad,alto)
}