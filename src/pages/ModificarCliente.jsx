import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button} from '@material-tailwind/react';
import { obtenerClientePorCodigo, actualizarCliente,existeEmailActual,existeUsernameActual } from '../scripts/clientes';
import { Typography } from "@material-tailwind/react";

export default function DescripcionCliente() {
  const { codigo } = useParams();
  const [cliente, setCliente] = useState(null);
  const [mail, setMail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isModified, setIsModified] = useState(false); // Nuevo estado para verificar si se han modificado datos
  const [nuevosValores, setNuevosValores] = useState({}); // Estado para almacenar los nuevos valores


  useEffect(() => {
    async function fetchCliente() {
      try {
        const clienteEncontrado = await obtenerClientePorCodigo(codigo);
        setCliente(clienteEncontrado);
  
        if (clienteEncontrado) {
          setMail(clienteEncontrado.email || '');
          setTelefono(clienteEncontrado.telefono || '');
          setUsername(clienteEncontrado.username || '');
          setPassword(clienteEncontrado.password || '');
        }
      } catch (error) {
        console.error('Error al obtener el cliente:', error);
      }
    }
  
    fetchCliente();
  }, [codigo]);
  
  useEffect(() => {
    const isDataModified =
      cliente &&
      (mail !== cliente.email ||
        telefono !== cliente.telefono ||
        username !== cliente.username ||
        password !== cliente.password);
  
    setIsModified(isDataModified); // Actualiza el estado de modificación
  }, [mail, telefono, username, password, cliente]);

  const handleGuardarCambios = async () => {
    try {
      const usernameExists = await existeUsernameActual(username, cliente.codigo);
      const emailExists = await existeEmailActual(mail, cliente.codigo);
  
      if (usernameExists || emailExists) {
        // Mostrar alerta indicando que el username o email ya están en uso
        alert(usernameExists ? 'El nombre de usuario ya está en uso.' : 'El correo electrónico ya está en uso.');
      } else {
        const nuevosValoresTemp = {};
  
        // Asignación de nuevos valores
        if (mail !== cliente.email) {
          nuevosValoresTemp['email'] = mail;
        }
        if (telefono !== cliente.telefono) {
          nuevosValoresTemp['telefono'] = telefono;
        }
        if (username !== cliente.username) {
          nuevosValoresTemp['username'] = username;
        }
        if (password !== cliente.password) {
          nuevosValoresTemp['password'] = password;
        }
  
        // Actualización del estado 'nuevosValores'
        setNuevosValores(nuevosValoresTemp);
  
        // Verifica si hay cambios para actualizar
        if (Object.keys(nuevosValoresTemp).length > 0) {
          setShowConfirmationModal(true);
        } else {
          console.log('No hay cambios para actualizar');
        }
      }
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  };

  const confirmarActualizarCliente = async () => {
    try {
      // Utiliza el estado 'nuevosValores' para la actualización
      await actualizarCliente(codigo, nuevosValores);

      const clienteActualizado = await obtenerClientePorCodigo(codigo);
      setCliente(clienteActualizado);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 p-8 text-center items-center">
      {cliente && (
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
          <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white">
              Información del cliente
            </h1>
          </div>
          <div className="py-10 sm:ml-10 md:ml-10 lg:ml-10 xl:px-30 2xl:ml-50 sm:px-5">
            <div className="flex flex-wrap justify-center">
            <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nombre de usuario"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
            </div>
            <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                    Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="block w-full rounded-md  border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
            </div>
            <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Telefono
                </label>
                <input
                  type="number"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Nro de telefono"
                  className="block  w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
              </div>
              
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Código de cliente
                </label>
                <input
                  type="text" 
                  disabled
                  className="bg-gray-200 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={cliente.codigo || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Nombre del cliente
                </label>
                <input
                  type="text" 
                  disabled
                  className="block bg-gray-200 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={cliente.nombreCliente || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  Responsable
                </label>
                <input
                  type="text" 
                  disabled
                  className="block bg-gray-200 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={cliente.responsable || ''}
                />
              </div>
              <div className='w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label className='block text-md font-medium leading-6 text-gray-900'> 
                  CUIT
                </label>
                <input
                  type="text" 
                  disabled
                  className="block bg-gray-200 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={cliente.cuit || ''}
                />
              </div>
            </div>
            <div className='w-full  md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
            <Link to="/listarModificarClientes" className='-mt-20'>
              <Button className="font-semibold mx-8 rounded-md text-white justify-center leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                  Cancelar
              </Button>
            </Link>
            <Button  className="font-semibold mx-8 rounded-md bg-red-500 text-white justify-center leading-6 shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500" onClick={handleGuardarCambios}>
                  Guardar cambios
                </Button>
            </div>
            {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <Typography variant="h6" color="blue-gray" className="mb-4">
              ¿Está seguro que desea actualizar este cliente?
            </Typography>
            <div className="flex justify-end gap-4">
            <Button
                variant="outlined"
                className="bg-red-400 text-white"
                size="sm"
                onClick={confirmarActualizarCliente}
                >
                Sí
            </Button>
            <Button
                variant="outlined"
                className="bg-gray-50"
                size="sm"
                onClick={() => setShowConfirmationModal(false)}
              >
                No
            </Button>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      )}
    </div>
    
  );
}