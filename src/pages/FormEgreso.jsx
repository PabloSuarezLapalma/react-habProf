import { useState,useEffect} from 'react';
import { registrarEgreso } from '../scripts/egreso';
import { obtenerDatosActuales } from '../scripts/global';
import {obtenerResponsable} from '../scripts/clientes';
import {obtenerCantidadMercaderia} from  '../scripts/mercaderia';
import {actualizarPosicion,obtenerVolumenPosicion} from '../scripts/posiciones';
import PropTypes from 'prop-types';

const FormEgreso = ({codigoCliente,idPosicion,mercaderia}) => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState("");
    const [nroRemito, setNroRemito] = useState('');
    const [transporte, setTransporte] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('');
    const [chofer, setChofer] = useState('');
    const [chasis, setChasis] = useState('');
    const [acoplado, setAcoplado] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [posicion, setPosicion] = useState('');
    const [ancho, setAncho] = useState('');
    const [largo, setLargo] = useState('');
    const [alto, setAlto] = useState('');
    const [codigoBWS, setCodigoBWS] = useState('');
    const [idCliente, setIDCliente]= useState('');
    const [destino, setDestino] = useState('');
    const [estado, setEstado] = useState('');
    const [tipoUnidad, setTipoUnidad] = useState('');
    const [nombreResponsable, setNombreResponsable] = useState('');
    const [costo, setCosto]= useState('');
    const [volumen, setVolumen]= useState('');
    const [idMercaderia, setIdMercaderia]= useState('');
    

    function generarIdMercaderia() {
        const id = Math.floor(Math.random() * 1000000000); // Genera un número aleatorio entre 0 y 999999999
        return id.toString();
    }

    useEffect(() => {
        setCodigoBWS(`${codigoCliente}-${idPosicion}-${nroRemito}`);
    }, [codigoCliente, idPosicion, nroRemito]);

    useEffect(() => {
        setPosicion(`${idPosicion}`);
    }, [idPosicion]);
    
    useEffect(() => {
        setIDCliente(`${codigoCliente}`);
    }, [codigoCliente]);
    
    useEffect(() => {
        setIdMercaderia(`${mercaderia}`);
    }, [mercaderia]);
    
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
        obtenerResponsable(codigoCliente).then(responsable => {
            setNombreResponsable(responsable);
        });
    }, [codigoCliente]);
    
    useEffect(() => {
        let idM = generarIdMercaderia();
        setIdMercaderia(idM);
    }, []);
    
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
            setCosto(datos.costoIngreso);
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
        console.log("codigoCliente: ", idCliente);
        console.log("Destino: ", destino);
        console.log("tipoUnidad: ", tipoUnidad);
        console.log("tipoTransporte: ", tipoTransporte);
        console.log("idPosicion: ", posicion);
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

        let cantidadActual= await obtenerCantidadMercaderia(mercaderia)
        console.log("Cantidad Actual: ",cantidadActual)
        let cantidadNueva= cantidadActual-cantidad
        console.log("Cantidad Nueva: ",cantidadNueva)

        await registrarEgreso(codigoBWS,nroRemito,estado,nombreResponsable,transporte,chasis,chofer,acoplado,costo,mercaderia,fecha,hora,codigoCliente,destino,tipoUnidad,tipoTransporte,cantidadNueva)

        //Reiniciar el formulario
        setFecha('');
        setHora('');
        setNroRemito('');
        setTransporte('');
        setTipoTransporte('');
        setChofer('');
        setChasis('');
        setAcoplado('');
        setCantidad('');
        setDescripcion('');
        setAncho('');
        setLargo('');
        setAlto('');
        setCodigoBWS('');
        setDestino('');
        setTipoUnidad('');
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
                        Fecha de Ingreso
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
                        Hora de ingreso
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
                <label htmlFor='cantidad' className='block text-md font-medium leading-6 text-gray-900'>
                        Cantidad
                    </label>
                    <input
                        id='cantidad'
                        name="cantidad" 
                        type="number" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={cantidad}
                        required
                        placeholder='Cantidad' 
                        onChange={(e) => setCantidad(e.target.value)} 
                    />
                </div>
                <div className=' w-full md:mx-2 lg:mx-2 xl:mx-2 2xl:mx-2 sm:mx-2 xs:mx-2 sm:w-auto py-5'>
                <label htmlFor='posicion' className='block text-md font-medium leading-6 text-gray-900'>
                        Posición
                    </label>
                    <input 
                        id='posicion'
                        name="posicion"
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        pattern="[A-Za-z]" 
                        maxLength={1} 
                        value={posicion}
                        required
                        placeholder='Posición' 
                        disabled
                        onChange={(e) => setPosicion(e.target.value)}  
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
                        required
                        placeholder='Ancho (cm)' 
                        onChange={(e) => setAncho(e.target.value)} 
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
                        required
                        placeholder='Largo (cm)'
                        onChange={(e) => setLargo(e.target.value)}
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
                        required
                        placeholder='Alto (cm)'
                        onChange={(e) => setAlto(e.target.value)}
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
                    <label htmlFor='tipoUnidad' className='block text-md font-medium leading-6 text-gray-900'>
                        Tipo de unidad
                    </label>
                    <input
                        id='tipoUnidad'
                        name="tipoUnidad" 
                        type="text" 
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={tipoUnidad} 
                        required
                        placeholder='Tipo de unidad'
                        onChange={(e) => setTipoUnidad(e.target.value)} 
                    />
                </div>
            </div>
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

FormEgreso.propTypes = {
    idPosicion: PropTypes.string.isRequired,
    codigoCliente: PropTypes.string.isRequired,
    mercaderia: PropTypes.string.isRequired,
};

export default FormEgreso;
