import React, { useState } from 'react';
import { existeUsername,existeEmail,agregarCliente } from '../scripts/clientes';
import {HomeIcon} from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import {IconButton} from "@material-tailwind/react";

const AgregarCliente = () => {
    const [codigo, setCodigo] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [responsable, setResponsable] = useState('');
    const [cuit, setCuit] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!existeUsername(username)) {
            alert("El nombre de usuario ya se encuentra en uso elije otro")
            return;
        }
        if (!existeEmail(email)) {
            alert("El email ya se encuentra en uso")
            return;
        }
        agregarCliente(codigo, nombreCliente, responsable, cuit, telefono, email, username, password)
        
        //Reiniciar el formulario
        setCodigo('');
        setNombreCliente('');
        setResponsable('');
        setCuit('');
        setTelefono('');
        setEmail('');
        setUsername('');
        setPassword('');
    };

    return (
        <div className=' max-w-7xl mx-auto px-8 p-8 text-center'>
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
            
            <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white ">Registrar Nuevo Cliente</h1>
            </div>

        <form className= 'py-10  sm:px-5' onSubmit={handleSubmit} >
            
            <div className='flex justify-center flex-wrap '>
                
            <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5 '>
                
                    <label htmlFor='codigo' className='block text-md font-medium leading-6 text-gray-900'> 
                        Código del Cliente
                    </label>
                        <input
                            id='codigo'
                            name="codigo" 
                            type="text" 
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            value={codigo} 
                            required
                            placeholder='Codigo cliente'
                            onChange={(e) => setCodigo(e.target.value)}  
                        />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='nombreCliente' className='block text-md font-medium leading-6 text-gray-900'>
                        Nombre del cliente
                    </label>
                        <input
                            id='nombreCliente'
                            name="nombreCliente" 
                            type="text" 
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                            value={nombreCliente}
                            required
                            placeholder=' Cliente' 
                            onChange={(e) => {
                                const inputText = e.target.value;
                                const capitalizedText = inputText.charAt(0).toUpperCase() + inputText.slice(1);
                                setNombreCliente(capitalizedText);
                              }} 
                        />

                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='responsable' className='block text-md font-medium leading-6 text-gray-900'>
                        Responsable
                    </label>
                    <input
                        id='responsable'
                        name="responsable"  
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={responsable} 
                        required
                        placeholder='Responsable'
                        onChange={(e) => setResponsable(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='cuit' className='block text-md font-medium leading-6 text-gray-900'>
                        CUIT
                    </label>
                    <input
                        id='cuit'
                        name="cuit"  
                        type="number" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={cuit}
                        required 
                        placeholder='Número de CUIT'
                        onChange={(e) => setCuit(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='telefono' className='block text-md font-medium leading-6 text-gray-900'>
                        Teléfono
                    </label>
                    <input
                        id='telefono'
                        name="telefono"  
                        type="number" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={telefono} 
                        required
                        placeholder='Número de teléfono'
                        onChange={(e) => setTelefono(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='email' className='block text-md font-medium leading-6 text-gray-900'>
                        Correo electrónico
                    </label>
                    <input
                        id='email'
                        name="email"  
                        type="email" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={email}
                        required
                        placeholder='correoelectronico@empresa.com' 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='username' className='block text-md font-medium leading-6 text-gray-900'>
                        Nombre de usuario
                    </label>
                    <input 
                        id='username'
                        name="username" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={username} 
                        required
                        placeholder='Nombre de usuario'
                        onChange={(e) => setUsername(e.target.value)} 
                    />

                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='password' className='block text-md font-medium leading-6 text-gray-900'>
                        Contraseña
                    </label>
                    <input
                        id='password'
                        name="password" 
                        type="password" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={password}
                        required
                        placeholder='No menos de 8 caracteres' 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </div>
            <input 
                type="submit"
                id="clientes"
                value="Aceptar" 
                className='bg-red-500 font-semibold mt-5 rounded-md text-white justify-center px-10 py-2 text-lg leading-6 shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
            />
            
        </form>
        <Link to="/home" className="mx-auto -mt-28 "> 
                  <IconButton variant="text">
                    <HomeIcon className="h-8 w-8 text-red-500" />
                  </IconButton>   
                </Link>
    </div>
    </div>
);
}

export default AgregarCliente;
