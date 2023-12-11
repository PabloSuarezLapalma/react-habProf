import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )

export  async function obtenerRacks() {
    try {
        let { data: Racks, error } = await supabase
            .from('Racks')
            .select('*')
        if (error) {
            throw new Error(error.message);
        }
        let listaRacks = Racks.map(item => {return item;});
        return listaRacks;
    } catch (error) {
        console.error(error);
    }
}

export  async function agregarRack(idRack,columnas, filas){
    let code=0;
    try {
        const { error } = await supabase
            .from('Racks')
            .insert([
                { idRack:idRack,columnas:columnas,filas:filas,fecha_agregado:Date.now()},
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

export  async function borrarRack(idRack){
    let code=0;
    try{
        const { error } = await supabase
            .from('Racks')
            .delete()
            .eq('idRack', idRack)
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
export async function buscarRack(idRack) {
    try {
      let { data: Racks, error } = await supabase
        .from('Racks')
        .select('*')
        .ilike('idRack', idRack);
      if (error) {
        throw new Error(error.message);
      }
      if (Racks && Racks.length > 0) {
        // Devolver solo el primer elemento del array (asumiendo que solo debería haber uno)
        return Racks[0];
      } else {
        // Si no se encuentra ningún movimiento, devolver null o un objeto vacío según sea necesario
        return null; // O puedes devolver un objeto vacío: return {}
      }
    } catch (error) {
      console.log(error);
}
}

