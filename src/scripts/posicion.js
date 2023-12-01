import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )

export  async function obtenerPosiciones() {
    try {
        let { data: Posiciones, error } = await supabase
            .from('Posiciones')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        let listaPosiciones = Posiciones.map(item => {
            return item;});
        return listaPosiciones;
    } catch (error) {
        console.error(error);
    }
}

export  async function agregarPosicion(idPosicion, letraPosicion, sector, altura, volumen, idAlquiler){
    let code=0;
    try {
        const { data, error } = await supabase
            .from('Posiciones')
            .insert([
                {idPosicion:idPosicion, letraPosicion:letraPosicion, sector:sector, altura:altura, volumen:volumen,idAlquiler:idAlquiler},
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

export  async function borrarPosicion(idPosicion){
    let code=0;
    try{
        const { error } = await supabase
            .from('Posicion')
            .delete()
            .eq('idPosicion', idPosicion)
        if (error) {
            code=1;
            throw new Error(error.message);}
        }
    catch (error){
        code=1;
        console.error(error);
    }
}

export  async function buscarPosicion(idPosicion){
    let code=0;
    try{
        let { data: Posiciones, error } = await supabase
        .from('Posiciones')
        .select("*")
        .ilike('idPosicion', idPosicion)
        if (error) {
            code=1;
            throw new Error(error.message);}   
        let listaFiltrada = Posiciones.map(item => {
            return item;});
        return listaFiltrada; 
    }
    catch (error){
       code=1;
       console.log(error)
}
}

export  async function actualizarPosicion(idPosicion,columnaModificar, nuevoValor) {
    try {
        const { data, error } = await supabase
            .from('Posiciones')
            .update({ [columnaModificar]: nuevoValor })
            .eq("idPosicion", idPosicion)
            .select();

        if (error) {
            console.error("Error updating Posicion:", error.message);
        } else {
            console.log("Posicion updated successfully:", data);
        }
    } catch (error) {
        console.error("Unexpected error:", error.message);
    }
}