import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

export  async function obtenerAlquileres() {
    try {
        let { data: Alquileres, error } = await supabase
            .from('Alquileres')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        let listaAlquileres = Alquileres.map(item => {return item;});
        return listaAlquileres;
    } catch (error) {
        console.error(error);
    }
}

export  async function agregarAlquiler(idAlquiler, fechaIngreso, estado, fechaFin, codigoCliente){
    let code=0;
    try {
        const { data, error } = await supabase
            .from('Alquileres')
            .insert([
                {idAlquiler:idAlquiler, fechaIngreso:fechaIngreso, estado:estado, fechaFin:fechaFin, codigoCliente:codigoCliente},
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
    return code;
}

export  async function borrarAlquiler(idAlquiler){
    let code=0;
    try{
        const { error } = await supabase
            .from('Alquileres')
            .delete()
            .eq('idAlquiler', idAlquiler)
        if (error) {
            code=1;
            throw new Error(error.message);}
        }
    catch (error){
        code=1;
        console.error(error);
    }
    return code;
}

export  async function buscarAlquiler(idAlquiler){
    try{
        let { data: Alquileres, error } = await supabase
        .from('Alquileres')
        .select("*")
        .ilike('idAlquiler', idAlquiler)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Alquileres.map(item => {return item;});
        return listaFiltrada; 
    }
    catch (error){
       console.log(error)
    }
}

export  async function actualizarAlquiler(idAlquiler,columnaModificar, nuevoValor) {
    let code=0;
    try {
        const { data, error } = await supabase
            .from('Alquileres')
            .update({ [columnaModificar]: nuevoValor })
            .eq("idAlquiler", idAlquiler)
            .select();
        if (error) {
            code=1;
            console.error("Error updating Alquiler:", error.message);
        } else {
            code=1;
            console.log("Cliente updated successfully:", data);
        }
    } catch (error) {
        code=1;
        console.error("Unexpected error:", error.message);
    }
    return code;
}
