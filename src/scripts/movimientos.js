import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )

export  async function obtenerMovimientos() {
    try {
        let { data: Movimientos, error } = await supabase
            .from('Movimientos')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        let listaDeMovimientos = Movimientos.map(item => {return item;});
        return listaDeMovimientos;
    } catch (error) {
        console.error(error);
    }
}
//?Descomentar para ver por consola el listado de movimientos
//const listaDeMovimientos = obtenerMovimientos();
//console.log(listaDeMovimientos);

export  async function insertarMovimiento(codigo, fecha,hora, nroRemito, estado, responsable, transporte, chasis, chofer, acoplado, costo, idMercaderia,codigoCliente){
    let code=0;
    try {
        const { data, error } = await supabase
            .from('Movimientos')
            .insert([
                { codigoBWS: codigo, fecha:fecha,hora:hora, nroRemito: nroRemito, estado: estado, nombreResponsable: responsable, descripTransporte: transporte, chasis: chasis, chofer: chofer, acoplado: acoplado, costo: costo, idMercaderia: idMercaderia,codigoCliente:codigoCliente},
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

export async function filtrarMovimiento(codigoBWS){
    let code=0;
    try{
        let { data: Movimientos, error } = await supabase
        .from('Movimientos')
        .select("*")
        .ilike('codigoBWS', codigoBWS)
        if (error) {
            code=1;
            throw new Error(error.message);}   
        let listaFiltrada = Movimientos.map(item => {
            return item;});
        return listaFiltrada; 
    }
    catch (error){
       code=1;
       console.log(error)
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

/*
filtrarMovimientosEntreFechas("2021-10-01","2024-10-31").then(resultado=> {
    if (Array.isArray(resultado)) {
        // Itera sobre cada elemento del array
        resultado.forEach(elemento => {
            console.log("Código BWS:", elemento.codigoBWS);
            console.log("Fecha y Hora:", elemento.fechaHora);
            console.log("Responsable:", elemento.nombreResponsable);
            console.log("idMercaderia:", elemento.idMercaderia);
            console.log("Descripcion:", elemento.descripcionTransporte);
            console.log("Codigo del Cliente: ", elemento.codigoCliente);
            // ... y así sucesivamente para otros campos
        });
    } else {
        console.error("El resultado no es un array.");
    }  
    }
)
*/
//deleteMovimiento("PBC-BJ1-3212");

//?Si se descomenta esto para probar por consola, cambiar el valor del codigoBWS, porque sino no deja hacer el insert porque existen claves primarias duplicadas
//console.log(insertMovimiento("PBC-BJ1-3212","2023-11-04T01:48" ,"123456789","EGRESO","Juan Perez","Transporte 1","Chasis 1","Chofer 1","Acoplado 1",3,"1001"))

//let filtrada=filtrarMovimiento("PBC-BJ1-3212")

//!Esta es la forma de acceder a los datos de la función, como es asíncrono siempre el resultado es una Promise, por lo que se debe acceder de la siguiente manera para poder manipular los datos
/*
filtrarMovimiento("PBC-BJ1-3212").then(resultado=> {
    if (Array.isArray(resultado)) {
        // Itera sobre cada elemento del array
        resultado.forEach(elemento => {
            console.log("Código BWS:", elemento.codigoBWS);
            console.log("Fecha y Hora:", elemento.fechaHora);
            console.log("Responsable:", elemento.nombreResponsable);
            console.log("idMercaderia:", elemento.idMercaderia);
            console.log("Descripcion:", elemento.descripcionTransporte);
            console.log("Codigo del Cliente: ", elemento.codigoCliente);
            // ... y así sucesivamente para otros campos
        });
    } else {
        console.error("El resultado no es un array.");
    }
})
.catch(error => {
    console.error("Error en la promesa:", error);
});
*/