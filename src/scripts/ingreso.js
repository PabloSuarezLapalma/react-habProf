import { agregarMercaderia } from './mercaderia';
import { agregarPosicion } from './posiciones';
import { agregarMovimiento } from './movimientos';

export function registrarIngreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte, idPosicion, letraPosicion, sector, altura, volumen, idAlquiler, descripcion, largo, ancho, cantidad
    ){
    agregarMovimiento(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte)
    agregarPosicion(idPosicion, letraPosicion, sector, altura, volumen, idAlquiler)
    agregarMercaderia(idMercaderia, descripcion, largo, ancho, idPosicion, cantidad)
}