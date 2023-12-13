import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )

export  async function obtenerHangares() {
    try {
        let { data: Hangares, error } = await supabase
            .from('Hangares')
            .select('*')
        if (error) {
            throw new Error(error.message);
        }
        let listaHangares = Hangares.map(item => {return item;});
        return listaHangares;
    } catch (error) {
        console.error(error);
    }
}

export  async function agregarHangar(idHangar,tamanio){
    let code=0;
    try {
        const { error } = await supabase
            .from('Hangares')
            .insert([
                { idHangar:idHangar,tamanio:tamanio},
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

export async function actualizarHangar(idHangar, nuevosValores) {
  let code = 0;
  try {
    const { data, error } = await supabase
      .from('Hangares')
      .update(nuevosValores)
      .eq("idHangar", idHangar)
      .select();

    if (error) {
      code = 1;
      console.error("Error updating Cliente:", error.message);
    } else {
      code = 1;
      console.log("Cliente updated successfully:", data);
    }
  } catch (error) {
    code = 1;
    console.error("Unexpected error:", error.message);
  }
  return code;
}


export  async function borrarHangar(idHangar){
    let code=0;
    try{
        const { error } = await supabase
            .from('Hangares')
            .delete()
            .eq('idHangar', idHangar)
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
export async function buscarHangar(idHangar) {
    try {
      let { data: Hangares, error } = await supabase
        .from('Hangares')
        .select('*')
        .ilike('codigoBWS', idHangar);
      if (error) {
        throw new Error(error.message);
      }
      if (Hangares && Hangares.length > 0) {
        // Devolver solo el primer elemento del array (asumiendo que solo debería haber uno)
        return Hangares[0];
      } else {
        // Si no se encuentra ningún movimiento, devolver null o un objeto vacío según sea necesario
        return null; // O puedes devolver un objeto vacío: return {}
      }
    } catch (error) {
      console.log(error);
}
}


export async function obtenerHangarPorCodigo(idHangar) {
  try {
    let { data: Hangares, error } = await supabase
      .from('Hangares')
      .select('*')
      .eq('idHangar', idHangar)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return Hangares;
  } catch (error) {
    console.error(error);
  }
}

export async function existeIDHangar(idHangar) {
    try {
      const { data: Hangares, error } = await supabase
        .from('Hangares')
        .select('*')
        .eq('idHangar', idHangar); // Utiliza 'eq' en lugar de 'ilike'  
      if (error) {
        throw new Error(error.message);
      }
  
      const listaFiltrada = Hangares.map(item => item);
      return listaFiltrada.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
