import { agregarMercaderia } from './mercaderia';
import { agregarMovimiento } from './movimientos';
import { obtenerCodigoClienteAlquiler } from './alquileres';

export async function registrarIngreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte, idPosicion, descripcion, largo, ancho, cantidad,alto
    ){
      //`${codigoCliente}-${idPosicion}-${nroRemito}`  
    const codigoCliente= obtenerCodigoClienteAlquiler(alquiler)
    await agregarMovimiento(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte)
    await agregarMercaderia(idMercaderia, descripcion, largo, ancho, alto, idPosicion, cantidad)
}