import { actualizarMercaderia,buscarMercaderia,obtenerDescripcionMercaderia,borrarMercaderia} from './mercaderia';
import { agregarMovimiento } from './movimientos';

export async function registrarEgreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte, cantidadNueva,nuevoIdMercaderia
    ){
    let descripcion =  await obtenerDescripcionMercaderia(idMercaderia)
    await agregarMovimiento(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte)
    let mercaderia= await buscarMercaderia(idMercaderia)
    const cantidadVieja= mercaderia.cantidad;
    const diferencia= cantidadNueva-cantidadVieja
    if (diferencia === 0) {
        borrarMercaderia(nuevoIdMercaderia)
    } else{
        await actualizarMercaderia(idMercaderia, 'cantidad', parseInt(cantidadNueva))
        await actualizarMercaderia(idMercaderia, 'descripcion', descripcion)
    }
}