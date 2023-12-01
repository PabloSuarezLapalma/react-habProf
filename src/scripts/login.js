import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YXRoZHFwdnh1bXR4d3Jtd2d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODg4OTgyNSwiZXhwIjoyMDE0NDY1ODI1fQ.ywoRnpwVfs4deMNdkQ0I5cWjShsUJexQ0ngaKFgSkrY'
const SUPABASE_URL = 'https://ewathdqpvxumtxwrmwgw.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY  )

export const validarLogin= async function (username,password){
    let success=0;
    try{
        const {data: clientes, error } = await supabase
        .from('Clientes')
        .select()
        .eq('username', username);
        if (error) {
            success=1;
            //alert('Se ha producido un error, intente nuevamente');
            //return;
        }   
        if ( !clientes || clientes.length === 0  || clientes[0].password !== password) {    
            success=1;
            //alert('Invalid username or password');
            //return;
        }
        return success;
    }
    catch (error){
        success=1;
        //alert('An error has ocurred, please try again');
        return;
    }
}


/*
 const handleSubmit = async function (event)  {
            event.preventDefault();

            let validation = validarLogin(username,password)

            if (validation=="0"){
                //setIsAuthenticated(true);
                window.location.href = '/Home';
            }
            else{
                alert("El usuario o contraseña son incorrectos")
            }
        };*/ 