import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )


export  async function obtenerClientes() {
    try {
        let { data: Clientes, error } = await supabase
            .from('Clientes')
            .select('*')
            .ilike('baja', "0")
        if (error) {
            throw new Error(error.message);
        }
        let listaClientes = Clientes.map(item => {return item;});
        return listaClientes;
    } catch (error) {
        console.error(error);
    }
}
export  async function agregarCliente(codigo, nombreCliente, responsable, cuit, telefono, email, username, password){
    let code=0;
    let baja="0";
    try {
        const {error} = await supabase
            .from('Clientes')
            .insert([
                {codigo:codigo, nombreCliente:nombreCliente, responsable:responsable, cuit:cuit, telefono:telefono, email:email, username:username, password:password, baja:baja},
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

export  async function borrarCliente(codigo){
    let code=0;
    try{
        const { error } = await supabase
            .from('Clientes')
            .delete()
            .eq('codigo', codigo)
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

export  async function darDeBajaCliente(codigo) {
    let code=0;
    try {
        const { data, error } = await supabase
            .from('Clientes')
            .update({baja: "1" })
            .eq("codigo", codigo)
            .select();

        if (error) {
            code=1;
            console.error("Error updating Cliente:", error.message);
        } else {
            code=1;
            console.log("Cliente updated successfully:", data);
        }
    } catch (error) {
        code=1;
        console.error("Unexpected error:", error.message);
    }
    return code
}


export  async function buscarCliente(nombreCliente){
    try{
        let { data: Movimientos, error } = await supabase
        .from('Clientes')
        .select("*")
        .ilike('nombreCliente', nombreCliente)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Movimientos.map(item => {return item;});
        return listaFiltrada; 
    }
    catch (error){
       console.log(error)
}
}
export async function existeUsername(username) {
    try {
      const { data: Movimientos, error } = await supabase
        .from('Clientes')
        .select('*')
        .ilike('username', username);
  
      if (error) {
        throw new Error(error.message);
      }
  
      const listaFiltrada = Movimientos.map(item => item);
      return listaFiltrada.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
}
  
export  async function existeEmail(email){
    let encontrado=false;
    try{
        let { data: Movimientos, error } = await supabase
        .from('Clientes')
        .select("*")
        .ilike('email', email)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Movimientos.map(item => {return item;});
        if (listaFiltrada.length>0){
            encontrado=true;
        }
        return encontrado;
    }
    catch (error){
       console.log(error)
}
}
  
  export async function existeCodigo(codigo) {
    try {
      const { data: Movimientos, error } = await supabase
        .from('Clientes')
        .select('*')
        .ilike('codigo', codigo);
      if (error) {
        throw new Error(error.message);
      }
      const listaFiltrada = Movimientos.map(item => item);
      return listaFiltrada.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  
export async function obtenerCodigoCliente(nombreCliente){
    let nombre='';
    try{
        let { data: Clientes, error } = await supabase
        .from('Clientes')
        .select("*")
        .ilike('nombreCliente', nombreCliente)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Clientes.map(item => {return item;});
        nombre=listaFiltrada[0].codigo; 
    }
    catch (error){
       console.log(error)
}
return nombre;
}

export async function obtenerResponsable(codigoCliente){
    let nombre='';
    try{
        let { data: Clientes, error } = await supabase
        .from('Clientes')
        .select("*")
        .ilike('codigo', codigoCliente)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Clientes.map(item => {return item;});
        nombre=listaFiltrada[0].responsable; 
    }
    catch (error){
       console.log(error)
}
return nombre;
}


export async function obtenerNombreCliente(codigoCliente){
    try{
        let { data: Clientes, error } = await supabase
        .from('Clientes')
        .select("*")
        .ilike('codigo', codigoCliente)
        if (error) {
            throw new Error(error.message);}   
        let listaFiltrada = Clientes.map(item => {return item;});
        return listaFiltrada[0].nombreCliente; 
    }
    catch (error){
       console.log(error)
}
}

export async function actualizarCliente(codigo, nuevosValores) {
    let code = 0;
    try {
      const { data, error } = await supabase
        .from('Clientes')
        .update(nuevosValores)
        .eq("codigo", codigo)
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

export async function obtenerClientePorCodigo(codigoCliente) {
    try {
      let { data: Cliente, error } = await supabase
        .from('Clientes')
        .select('*')
        .eq('codigo', codigoCliente)
        .single();
  
      if (error) {
        throw new Error(error.message);
      }
  
      return Cliente;
    } catch (error) {
      console.error(error);
    }
  }

  export async function existeUsernameActual(username, codigoCliente) {
    try {
      const { data: Movimientos, error } = await supabase
        .from('Clientes')
        .select('*')
        .neq('codigo', codigoCliente) // Excluir al cliente actual
        .ilike('username', username);
  
      if (error) {
        throw new Error(error.message);
      }
  
      const listaFiltrada = Movimientos.map(item => item);
      return listaFiltrada.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  export async function existeEmailActual(email, codigoCliente) {
    try {
      const { data: Movimientos, error } = await supabase
        .from('Clientes')
        .select('*')
        .neq('codigo', codigoCliente) // Excluir al cliente actual
        .ilike('email', email);
  
      if (error) {
        throw new Error(error.message);
      }
  
      const listaFiltrada = Movimientos.map(item => item);
      return listaFiltrada.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  
//!Esta es la forma de acceder a los datos de la función, como es asíncrono siempre el resultado es una Promise, por lo que se debe acceder de la siguiente manera para poder manipular los datos

/*
filtrarCliente("apacuero10").then(resultado=> {
    if (Array.isArray(resultado)) {
        // Itera sobre cada elemento del array
        resultado.forEach(elemento => {
            console.log("Código:", elemento.codigo);
            console.log("Nombre del Cliente:", elemento.nombreCliente);
            console.log("Responsable:", elemento.responsable);
            console.log("Cuit:", elemento.cuit);
            console.log("Teléfono:", elemento.telefono);
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
// Example usage
//updateCliente("FEP","password","fepasa");
