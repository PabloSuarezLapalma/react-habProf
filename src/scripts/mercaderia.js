import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )

export  async function obtenerMercaderias() {
    try {
        let { data: Mercaderias, error } = await supabase
            .from('Mercaderias')
            .select('*')
        if (error) {
            throw new Error(error.message);
        }
        let listaMercaderias = Mercaderias.map(item => {return item;});
        return listaMercaderias;
    } catch (error) {
        console.error(error);
    }
}

export async function obtenerDescripcionMercaderia(idMercaderia){
    try{
        let { data: Mercaderias, error } = await supabase
        .from('Mercaderias')
        .select("*")
        .ilike('idMercaderia', idMercaderia)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Mercaderias.map(item => {return item;});
        return listaFiltrada[0].descripcion; 
    }
    catch (error){
       console.log(error)
}
}

export  async function agregarMercaderia(idMercaderia, descripcion, largo, ancho, alto, idPosicion, cantidad){
    let code=0;
    try {
        const {error } = await supabase
            .from('Mercaderias')
            .insert([
                {idMercaderia:idMercaderia, descripcion:descripcion, largo:largo, ancho:ancho, alto:alto,idPosicion:idPosicion,cantidad:cantidad},
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

export  async function borrarMercaderia(idMercaderia){
    let code=0;
    try{
        const { error } = await supabase
            .from('Mercaderias')
            .delete()
            .eq('idMercaderia', idMercaderia)
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

export  async function buscarMercaderia(idMercaderia){
    try{
        let { data: Mercaderias, error } = await supabase
        .from('Mercaderias')
        .select("*")
        .ilike('idMercaderia', idMercaderia)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Mercaderias.map(item => {return item;});
        return listaFiltrada; 
    }
    catch (error){
       console.log(error)
}
}

export  async function actualizarMercaderia(idMercaderia,columnaModificar, nuevoValor) {
    let code=1;
    try {
        const { data, error } = await supabase
            .from('Mercaderias')
            .update({ [columnaModificar]: nuevoValor })
            .eq("idMercaderia", idMercaderia)
            .select();
        if (error) {
            code=1;
            console.error("Error updating Mercaderia:", error.message);
        } else {
            code=1;
            console.log("Mercaderia updated successfully:", data);
        }
    } catch (error) {
        code=1;
        console.error("Unexpected error:", error.message);
    }
    return code
}