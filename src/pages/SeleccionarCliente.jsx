import React, { useState, useEffect } from 'react';
import { obtenerClientes } from '../scripts/clientes';
import { useNavigate ,useParams } from 'react-router-dom';
import { Select, Option, Typography } from "@material-tailwind/react";


const SeleccionarCliente = () => {
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [clientes, setClientes] = useState([]);
    const {tipo} = useParams();
    const [loading, setLoading] = useState(true); // Nuevo estado de carga
    const navigate = useNavigate();

    async function fetchClientes() {
        try {
          const clientesFromDB = await obtenerClientes();
          const clientesFiltrados = clientesFromDB.filter(cliente => cliente.baja === "0");
          setClientes(clientesFiltrados || []);
        } catch (error) {
          console.error('Error al obtener clientes:', error);
        } finally {
          setLoading(false);
        }
      }
    
      useEffect(() => {
        fetchClientes();
      }, []);
        
      
    return (
        <>
            <div className=' flex items-center justify-center'>
                <div className='max-w-2xl mx-auto px-0 py-8 '>
                    <main className="shadow-lg bg-white py-8 rounded-lg sm:pt-5 lg:px-4 text-center">
                        <div className="shadow-sm bg-red-500 mx-auto rounded-md w-11/12 sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-10/12 mt-2 mb-4 px-10">
                            <Typography variant="h2" className="font-bold mb-6 text-white">Seleccionar Cliente para {tipo.toUpperCase()} </Typography>
                        </div>
                        <div className="mx-auto max-w-sm">
                            <div className='mb-4 flex flex-col'>
                                <Typography htmlFor='seleccionarCliente' variant='h5' className='block my-6 leading-6 text-red-500'>Buscar Cliente:</Typography>
                                <div className='flex'>
                                  <Select
                                    label="Selecionar Cliente"
                                    selected={(element) =>
                                      element &&
                                      React.cloneElement(element, {
                                        disabled: true,
                                        className:
                                          "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                                            })
                                        }
                                    onChange={(value) => {
                                      setClienteSeleccionado(value);
                                      console.log(value);
                                      }}
                                  >
                                    {clientes.map(({ nombreCliente, codigo }) => (
                                      <Option key={codigo} value={codigo} className="flex items-center gap-2">
                                        {nombreCliente}
                                      </Option>
                                    ))}
                                  </Select>
                              </div>
                            </div>
                        </div>
                        <button
                            
                            disabled= {(clienteSeleccionado === null)}
                            className={"bg-red-500 font-semibold rounded-md text-white justify-center px-10 py-2 mt-32 text-lg shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            + (clienteSeleccionado === null ? " opacity-50 cursor-not-allowed" : " hover:bg-red-600 hover:shadow-lg") + " w-1/2 mx-auto mt-4"}  
                            onClick={() => {
                                navigate(`/listarPosicionesCliente/${tipo}/${clienteSeleccionado}`);}}
                        >
                        Continuar con el {tipo}
                        </button>
                    </main>
                    
                </div>
            </div>
        </>
    );

};

export default SeleccionarCliente;

