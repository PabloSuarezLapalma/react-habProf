import { actualizarMercaderia,obtenerDescripcionMercaderia} from './mercaderia';
import { agregarMovimiento } from './movimientos';

export async function registrarEgreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte, cantidadNueva
    ){
    let descripcion =  await obtenerDescripcionMercaderia(idMercaderia)
    await agregarMovimiento(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte)
    await actualizarMercaderia(idMercaderia, 'cantidad', cantidadNueva)
    await actualizarMercaderia(idMercaderia, 'descripcion', descripcion)
}