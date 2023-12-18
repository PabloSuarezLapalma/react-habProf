import { useState,useEffect} from 'react';
import { registrarEgreso } from '../scripts/egreso';
import { obtenerDatosActuales } from '../scripts/global';
import {obtenerResponsable} from '../scripts/clientes';
import {obtenerCantidadMercaderia} from  '../scripts/mercaderia';
import {actualizarPosicion,obtenerVolumenPosicion} from '../scripts/posiciones';
import { useParams } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';


const FormEgreso = () => {
    const navigate = useNavigate();
    const {tipo,clienteSeleccionado,idPosicion,idMercaderia,cantidad,descripcion,ancho,largo,alto} = useParams();
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState("");
    const [nroRemito, setNroRemito] = useState('');
    const [transporte, setTransporte] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('');
    const [chofer, setChofer] = useState('');
    const [chasis, setChasis] = useState('');
    const [acoplado, setAcoplado] = useState('');
    const [codigoBWS, setCodigoBWS] = useState('');
    const [idCliente, setIDCliente]= useState('');
    const [destino, setDestino] = useState('');
    const [estado, setEstado] = useState('');
    const [nombreResponsable, setNombreResponsable] = useState('');
    const [costo, setCosto]= useState('');
    const [volumen, setVolumen]= useState('');
    const [idPosicionEgreso, setIDPosicionEgreso]= useState('');

    useEffect(() => {
        setCodigoBWS(`${clienteSeleccionado}-${idPosicion}-${nroRemito}`);
    }, [clienteSeleccionado, idPosicion, nroRemito]);

    useEffect(() => {
        setIDPosicionEgreso(`${idPosicion}`);
    }, [idPosicion]);
    
    useEffect(() => {
        setIDCliente(`${clienteSeleccionado}`);
    }, [clienteSeleccionado]);
    

    
    useEffect(() => {
        console.log("codigo: ", codigoBWS);
    }, [codigoBWS]);

    useEffect(() => {
        setEstado("EGRESO");
    }, []);
    
    useEffect(() => {
        let vol = alto * ancho * largo;
        setVolumen(vol);
    }, [alto, ancho, largo]);
    
    useEffect(() => {
        let costo = 0;
        obtenerDatosActuales().then((datos) => {
            costo = datos.costoEgreso;
            setCosto(costo);
        });
    }, []);
    
    useEffect(() => {
        obtenerResponsable(clienteSeleccionado).then(responsable => {
            setNombreResponsable(responsable);
        });
    }, [clienteSeleccionado]);
    

    
    async function handleSubmit(e) {
        e.preventDefault();

        // Obtener el valor actual de la fecha y hora actual     
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear();
        const diaActual = fechaActual.getDate();
        const mesActual = fechaActual.getMonth() + 1;
        const horaActual = fechaActual.getHours();
        const minActual = fechaActual.getMinutes();

        // Obtener el valor actual de la fecha y hora actual en formato string y luego a número
        const [anio,mes,dia] = fecha.split('-');
        const [horas,mins] = hora.split(':');
        const anioInput =  parseInt(anio);
        const mesInput = parseInt(mes);
        const diaInput = parseInt(dia);
        const horaInput = parseInt(horas);
        const minInput = parseInt(mins);

        setVolumen(alto * ancho * largo);
        obtenerDatosActuales().then((datos) => {
            setCosto(datos.costoEgreso);
        });

        //No anda la comparación de hora y segundos
        if ((anioInput > anioActual) || (anioInput === anioActual && mesInput > mesActual) || (anioInput === anioActual && mesInput === mesActual && diaInput > diaActual) || (anioInput === anioActual && mesInput === mesActual && diaInput === diaActual && horaInput > horaActual ) || (anioInput === anioActual && mesInput === mesActual && diaInput === diaActual && horaInput === horaActual && minInput > minActual)) {
            alert("La fecha y hora ingresada no puede ser mayor a la fecha y hora actual")
            return;
        }

        //Realiza el registro del movimiento   
      
        console.log("codigoBWS: ", codigoBWS);
        console.log("nroRemito: ", nroRemito);
        console.log("Estado: ", estado);
        console.log("nombreReponsable: ", nombreResponsable);
        console.log("Transporte: ", transporte);
        console.log("Chasis: ", chasis);
        console.log("Chofer: ", chofer);
        console.log("Acoplado: ", acoplado);
        console.log("Costo: ", costo);
        console.log("idMercaderia: ", idMercaderia);
        console.log("fecha: ", fecha);
        console.log("hora: ", hora);
        console.log("codigoCliente: ", clienteSeleccionado);
        console.log("Destino: ", destino);
        console.log("tipoUnidad: ", descripcion);
        console.log("tipoTransporte: ", tipoTransporte);
        console.log("idPosicion: ", idPosicion);
        console.log("Descripcion: ", descripcion);
        console.log("Largo: ", largo);
        console.log("Ancho: ", ancho);
        console.log("Alto: ",alto);
        console.log("Cantidad: ", cantidad);
        console.log("Volumen: ", volumen); 

        let volumenActual =await obtenerVolumenPosicion(idPosicion)
        await actualizarPosicion(idPosicion, "volumen",volumenActual+volumen)
        console.log("Volumen Actual: ",volumenActual)
        console.log("Diferencia de Volumen : ",volumenActual+volumen)

        let cantidadActual= await obtenerCantidadMercaderia(idMercaderia)
        console.log("Cantidad Actual: ",cantidadActual)
        let cantidadNueva= cantidadActual-cantidad
        console.log("Cantidad Nueva: ",cantidadNueva)

        await registrarEgreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,idMercaderia,fecha,hora,clienteSeleccionado,destino,descripcion,tipoTransporte,cantidadNueva)

        //Reiniciar el formulario
        setFecha('');
        setHora('');
        setNroRemito('');
        setTransporte('');
        setTipoTransporte('');
        setChofer('');
        setChasis('');
        setAcoplado('');
        setCodigoBWS('');
        setDestino('');
    }

    return (
        <div className=' max-w-7xl mx-auto px-8 p-8 text-center'>
        <div className="bg-white pt-4 pb-4 pl-2 pr-2 rounded-lg shadow-md text-black sm:w-fit md:w-fit lg:w-fit xl:w-fit">
            <div className="shadow-md bg-red-500 mx-auto rounded-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-11/12">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-white ">Registrar Egreso</h1>
            </div>

        <form className= 'py-10  sm:px-5' onSubmit={handleSubmit} >
            <div className='flex justify-center flex-wrap '>
            <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5 '>
                    <label htmlFor='codigoCliente' className='block text-md font-medium leading-6 text-gray-900'> 
                        ID del Cliente
                    </label>
                        <input
                            id='idCliente'
                            name="idCliente" 
                            type="text" 
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            value={idCliente} 
                            disabled
                            placeholder='ID Cliente'
                            onChange={(e) => setIDCliente(e.target.value)}  
                        />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='codigoBWS' className='block text-md font-medium leading-6 text-gray-900'>
                        Código BWS
                    </label>
                        <input
                            id='codigoBWS'
                            name="codigoBWS" 
                            type="text" 
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                            value={codigoBWS}
                            disabled
                            placeholder=' Se genera automático' 
                            onChange={(e) => setCodigoBWS(e.target.value)}  
                        />

                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='fecha' className='block text-md font-medium leading-6 text-gray-900'>
                        Fecha de Egreso
                    </label>
                    <input
                        id='fecha'
                        name="fecha"  
                        type="date" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={fecha} 
                        required
                        onChange={(e) => setFecha(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='hora' className='block text-md font-medium leading-6 text-gray-900'>
                        Hora de Egreso
                    </label>
                    <input
                        id='hora'
                        name="hora"  
                        type="time" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={hora}
                        required 
                        onChange={(e) => setHora(e.target.value)} 
                    />

                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='nroRemito' className='block text-md font-medium leading-6 text-gray-900'>
                        Número de Remito
                    </label>
                    <input
                        id='nroRemito'
                        name="nroRemito"  
                        type="number" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={nroRemito} 
                        required
                        placeholder='Nro Remito'
                        onChange={(e) => setNroRemito(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='transporte' className='block text-md font-medium leading-6 text-gray-900'>
                        Transporte
                    </label>
                    <input
                        id='transporte'
                        name="transporte"  
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={transporte}
                        required
                        placeholder='Transporte' 
                        onChange={(e) => setTransporte(e.target.value)} 
                    />

                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='tipoTransporte' className='block text-md font-medium leading-6 text-gray-900'>
                        Tipo
                    </label>
                    <input 
                        id='tipoTransporte'
                        name="tipoTransporte" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={tipoTransporte} 
                        required
                        placeholder='Tipo de transporte'
                        onChange={(e) => setTipoTransporte(e.target.value)} 
                    />

                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='chofer' className='block text-md font-medium leading-6 text-gray-900'>
                        Chofer
                    </label>
                    <input
                        id='chofer'
                        name="chofer" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={chofer}
                        required
                        placeholder='Chofer' 
                        onChange={(e) => setChofer(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='chasis' className='block text-md font-medium leading-6 text-gray-900'>
                        Chasis
                    </label>
                    <input
                        id='chasis'
                        name="chasis" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={chasis}
                        required
                        placeholder='Chasis' 
                        onChange={(e) => setChasis(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='acoplado' className='block text-md font-medium leading-6 text-gray-900'>
                        Acoplado
                    </label>
                    <input
                        id='acoplado'
                        name="acoplado" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={acoplado} 
                        required
                        placeholder='Acoplado'
                        onChange={(e) => setAcoplado(e.target.value)} 
                    />
                </div>
                
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='destino' className='block text-md font-medium leading-6 text-gray-900'>
                        Destino
                    </label>
                    <input
                        id='destino'
                        name="destino" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={destino} 
                        required
                        placeholder='Destino'
                        onChange={(e) => setDestino(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label htmlFor='idPosicion' className='block text-md font-medium leading-6 text-gray-900'>
                        Posición
                    </label>
                    <input 
                        id='idPosicion'
                        name="idPosicion"
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        pattern="[A-Za-z]" 
                        maxLength={1} 
                        value={idPosicion}
                        required
                        placeholder='Posición' 
                        disabled
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='ancho' className='block text-md font-medium leading-6 text-gray-900'>
                        Ancho
                    </label>
                    <input
                        id='ancho'
                        name="ancho" 
                        type="number" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={ancho}
                        disabled
                        placeholder='Ancho (cm)' 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='largo' className='block text-md font-medium leading-6 text-gray-900'>
                        Largo
                    </label>
                    <input
                        id='largo'
                        name="largo" 
                        type="number" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={largo} 
                        disabled
                        placeholder='Largo (cm)'
                    /> 
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='alto' className='block text-md font-medium leading-6 text-gray-900'>
                        Alto
                    </label>
                    <input
                        id='alto'
                        name="alto" 
                        type="number"
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={alto}
                        disabled
                        placeholder='Alto (cm)'
                    /> 
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                    <label htmlFor='descripcion' className='block text-md font-medium leading-6 text-gray-900'>
                        Descripcion
                    </label>
                    <input
                        id='descripcion'
                        name="descripcion" 
                        type="text"
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={descripcion}
                        disabled
                        placeholder='Alto (cm)'
                    /> 
                </div>

            </div>
            <IconButton variant="text"  className="mx-auto flex flex-auto "
                    onClick={() => navigate(`/listadoMercaderiaPosicionCliente/${tipo}/${clienteSeleccionado}/${idPosicion}`)}
                  >
                    <ArrowLeftIcon className="h-8 w-8 text-red-500" />
                  </IconButton>
            <input 
                type="submit"
                id="movimientos"
                value="Aceptar" 
                className='bg-red-500 font-semibold mt-5 rounded-md text-white justify-center px-10 py-2 text-lg leading-6 shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
            />
        </form>
        
    </div>
    
    </div>
);
}


export default FormEgreso;
