import { agregarMercaderia } from './mercaderia';
import { agregarMovimiento } from './movimientos';

export async function registrarIngreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte, idPosicion, descripcion, largo, ancho, cantidad,alto
    ){
    await agregarMovimiento(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte)
    await agregarMercaderia(idMercaderia, descripcion, largo, ancho, alto, idPosicion, cantidad)
}