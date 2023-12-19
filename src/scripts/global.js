import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )


export  async function obtenerDatosActuales() {
    try {
        let { data: Global, error } = await supabase
            .from('Global')
            .select('*')
            .order('fechaActualizacion', { ascending: false })
        if (error) {
            throw new Error(error.message);
        }
        let listaGlobal = Global.map(item => {return item;});
        return listaGlobal[0];
    } catch (error) {
        console.error(error);
    }
}

export  async function obtenerCostoIngresoActual() {
    try {
        let { data: Global, error } = await supabase
            .from('Global')
            .select('*')
            .order('fechaActualizacion', { ascending: false })
        if (error) {
            throw new Error(error.message);
        }
        let listaGlobal = Global.map(item => {return item;});
        return listaGlobal[0].costoIngreso;
    } catch (error) {
        console.error(error);
    }
}

export  async function obtenerCostoEgresoActual() {
    try {
        let { data: Global, error } = await supabase
            .from('Global')
            .select('*')
            .order('fechaActualizacion', { ascending: false })
        if (error) {
            throw new Error(error.message);
        }
        let listaGlobal = Global.map(item => {return item;});
        return listaGlobal[0].costoEgreso;
    } catch (error) {
        console.error(error);
    }
}

export  async function obtenerCostoRelocalizacionActual() {
    try {
        let { data: Global, error } = await supabase
            .from('Global')
            .select('*')
            .order('fechaActualizacion', { ascending: false })
        if (error) {
            throw new Error(error.message);
        }
        if (Global.length === 0) {
            throw new Error('No data found');
        }
        let listaGlobal = Global.map(item => {return item;});
        return listaGlobal[0].costoRelocalizacion;
    } catch (error) {
        console.error(error);
    }
}
export  async function obtenerCostoAlmacenamientoActual() {
    try {
        let { data: Global, error } = await supabase
            .from('Global')
            .select('*')
            .order('fechaActualizacion', { ascending: false })
        if (error) {
            throw new Error(error.message);
        }
        if (Global.length === 0) {
            throw new Error('No data found');
        }
        let listaGlobal = Global.map(item => {return item;});
        return listaGlobal[0].costoAlmacenamiento;
    } catch (error) {
        console.error(error);
    }
}


export  async function agregarDatosGlobales(costoIngreso, costoEgreso, costoRelocalizacion,costoAlmacenamiento){
    let code=0;
    try {
        const {error} = await supabase
            .from('Global')
            .insert([
                {costoIngreso:costoIngreso, costoEgreso:costoEgreso, costoRelocalizacion:costoRelocalizacion,costoAlmacenamiento:costoAlmacenamiento},
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

export  async function borrarDatosFecha(fechaActualizacion){
    let code=0;
    try{
        const { error } = await supabase
            .from('Global')
            .delete()
            .eq('fechaActualizacion', fechaActualizacion)
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

export  async function buscarDatoFecha(fechaActualizacion){
    try{
        let { data: Global, error } = await supabase
        .from('Global')
        .select("*")
        .ilike('fechaActualizacion', fechaActualizacion)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Global.map(item => {return item;});
        return listaFiltrada; 
    }
    catch (error){
       console.log(error)
}
}



