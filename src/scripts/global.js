import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )


export  async function obtenerDatosActuales() {
    try {
        let { data: Clientes, error } = await supabase
            .from('Global')
            .select('*')
        if (error) {
            throw new Error(error.message);
        }
        let listaClientes = Clientes.map(item => {return item;});
        return listaClientes[0];
    } catch (error) {
        console.error(error);
    }
}

export  async function agregarDatosGlobales(fecha, costoIngreso, costoEgreso, costoRelocalizar){
    let code=0;
    try {
        const {error} = await supabase
            .from('Clientes')
            .insert([
                {fecha:fecha, costoIngreso:costoIngreso, costoEgreso:costoEgreso, costoRelocalizar:costoRelocalizar},
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

export  async function borrarDatosFecha(fecha){
    let code=0;
    try{
        const { error } = await supabase
            .from('Clientes')
            .delete()
            .eq('fecha', fecha)
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

export  async function buscarDatoFecha(fecha){
    try{
        let { data: Movimientos, error } = await supabase
        .from('Clientes')
        .select("*")
        .ilike('fecha', fecha)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Movimientos.map(item => {return item;});
        return listaFiltrada; 
    }
    catch (error){
       console.log(error)
}
}



