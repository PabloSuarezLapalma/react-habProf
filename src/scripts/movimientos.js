import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )

export  async function obtenerCienPrimerosMovimientos() {
    try {
        let { data: Movimientos, error } = await supabase
            .from('Movimientos')
            .select('*')
            .range(0, 99)
        if (error) {
            throw new Error(error.message);
        }
        let listaDeMovimientos = Movimientos.map(item => {return item;});
        return listaDeMovimientos;
    } catch (error) {
        console.error(error);
    }
}

export  async function agregarMovimiento(codigoBWS,nroRemito,estado,nombreResponsable,descripcionTransporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipo){
    let code=0;
    try {
        const { error } = await supabase
            .from('Movimientos')
            .insert([
                { codigoBWS:codigoBWS,nroRemito:nroRemito,estado:estado,nombreResponsable:nombreResponsable,descripcionTransporte:descripcionTransporte,chasis:chasis,chofer:chofer,acoplado:acoplado,costo:costo,idMercaderia:idMercaderia,fecha:fecha,hora:hora,codigoCliente:codigoCliente,destino:destino,tipoUnidad:tipoUnidad, tipo:tipo},
            ])
            .select()
        if (error) {
            code=1;
            throw new Error(error.message);
        }
    } catch (error) {
        code=1
        console.error(error);
    }
    return code
}

export  async function borrarMovimiento(codigoBWS){
    let code=0;
    try{
        const { error } = await supabase
            .from('Movimientos')
            .delete()
            .eq('codigoBWS', codigoBWS)
        if (error) {
            code=1;
            throw new Error(error.message);}
        }
    catch (error){
        code=1;
        console.error(error);
    }
    return code
}

export  async function filtrarMovimiento(codigoCliente){
    try{
        let { data: Movimientos, error } = await supabase
        .from('Movimientos')
        .select("*")
        .ilike('codigoCliente', codigoCliente)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Movimientos.map(item => {return item;});
        return listaFiltrada; 
    }
    catch (error){
       console.log(error)
}
}

export async function filtrarMovimientoxCodigo(codigoBWS) {
    try {
      let { data: Movimientos, error } = await supabase
        .from('Movimientos')
        .select('*')
        .ilike('codigoBWS', codigoBWS);
      if (error) {
        throw new Error(error.message);
      }
      if (Movimientos && Movimientos.length > 0) {
        // Devolver solo el primer elemento del array (asumiendo que solo debería haber uno)
        return Movimientos[0];
      } else {
        // Si no se encuentra ningún movimiento, devolver null o un objeto vacío según sea necesario
        return null; // O puedes devolver un objeto vacío: return {}
      }
    } catch (error) {
      console.log(error);
}
}

export async function filtrarMovimientosEntreFechas(fechaInicio, fechaFin){
  try{
      let { data: Movimientos, error } = await supabase
      .from('Movimientos')
      .select("*")
      .gte('fecha', fechaInicio)
      .lte('fecha', fechaFin)
      if (error) {
          throw new Error(error.message);}   
      let listaFiltrada = Movimientos.map(item => {return item;});
      return listaFiltrada; 
  }
  catch (error){
         console.log(error)
  }
}
