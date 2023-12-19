import {HomeIcon} from "@heroicons/react/24/outline";
import {Card,CardHeader,Typography,Button,CardBody,CardFooter,IconButton,Checkbox,Alert,Select,Option} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useState,useMemo,useEffect} from "react";
import {buscaridPosicionAlquiler } from "../scripts/posiciones";
import { obtenerAlquileres} from "../scripts/alquileres";
import {obtenerNombreCliente} from "../scripts/clientes";
import {calcularMontoTotalAlquiler,cierrreMes} from "../scripts/monetizacion";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const TABLE_HEAD = ["Cliente", "Alquiler", "Fecha de Ingreso","Posición", "Fecha de Renovación", "Monto Total (USD)","Renueva?"];

  export default function Monetizacion() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [alquileres, setAlquileres] = useState([]);
  const [posiciones, setPosiciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [renuevan, setRenuevan] = useState([]);
  const [idAlquileres, setIdAlquileres] = useState([]);
  const [montosTotales, setMontosTotales] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [finalizados,setFinalizados] = useState(true);


  const date = new Date();
  const currentYear = date.getFullYear();
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const currentMonth = monthNames[date.getMonth()];

  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  async function fetchAlquileres() {
    try {
      const alquileresFromDB= await obtenerAlquileres();
      alquileresFromDB.sort((a, b) => {
        const fechaA = new Date(a.fechaIngreso + ' GMT-0300');
        const fechaB = new Date(b.fechaIngreso + ' GMT-0300');
        return fechaA - fechaB;
      });
      if (finalizados){
        setAlquileres(alquileresFromDB || []);
        }else{
          const alquileresActivos = alquileresFromDB.filter(alquiler => alquiler.fechaFin === null);
          setAlquileres(alquileresActivos || []);
        }

      const todosAlquileres = [];
      for (const alquiler of alquileresFromDB) {
        todosAlquileres.push(alquiler.idAlquiler);
      }
      setIdAlquileres(todosAlquileres);

      const clientes = {};
      for (const alquiler of alquileresFromDB) {
          const nombreCliente = await obtenerNombreCliente(alquiler.codigoCliente);
          clientes[alquiler.codigoCliente] = nombreCliente;
      }
      setClientes(clientes);

      const posiciones = {};
      for (const alquiler of alquileresFromDB) {
          const idPosicion = await buscaridPosicionAlquiler(alquiler.idAlquiler);
          posiciones[alquiler.idAlquiler] = idPosicion;
      }
      setPosiciones(posiciones);

      
      const montos= {};
      for (const alquiler of alquileresFromDB) {
        const fechaRenovacion = alquiler.fechaRenovacion ? new Date(alquiler.fechaRenovacion + ' GMT-0300') : null;
        const fechaIngreso = alquiler.fechaIngreso ? new Date(alquiler.fechaIngreso + ' GMT-0300') : null;        
        let monto= await calcularMontoTotalAlquiler(alquiler.idAlquiler, renuevan,fechaRenovacion, fechaIngreso);
        montos[alquiler.idAlquiler] = monto;
      }
      setMontosTotales(montos);
      

    } catch (error) {
      console.error('Error al obtener clientes:', error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAlquileres();
  },[]);
  
  useEffect(() => {
    fetchAlquileres(finalizados);
  }, [finalizados]);

  useEffect(() => {
  }, [renuevan]);
  
  
  const itemsPerPage = 7; //Numero de clientes por pagina

  const totalItems = alquileres.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const filteredRows = useMemo(() => {
    if (selectedClient === "" || !selectedClient) {
      return alquileres
    } else {
      return alquileres.filter(
        (row) =>
        row.codigoCliente && row.codigoCliente.toLowerCase().includes(selectedClient.toLowerCase())
      );
    }
  }, [selectedClient, alquileres]);


  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredRows.length);
    return filteredRows.slice(startIndex, endIndex);
  }, [currentPage, filteredRows]);


  const handleCheckboxChange = (event) => {
    const idAlquiler = event.target.value; // Obtiene el idAlquiler del valor del Checkbox
    const isChecked = event.target.checked; // Obtiene el estado marcado del Checkbox
  
    // Si el Checkbox está marcado, añade el idAlquiler a la lista renuevan
    // Si no está marcado, quita el idAlquiler de la lista renuevan
    if (isChecked) {
      setRenuevan(prevRenuevan => [...prevRenuevan, idAlquiler]);
    } else {
      setRenuevan(prevRenuevan => prevRenuevan.filter(id => id !== idAlquiler));
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Cliente", "Alquiler", "Fecha de Ingreso","Posición", "Fecha de Renovación", "Monto Total (USD)", "Renuevan"]; // Aquí debes poner los nombres de las columnas de tu tabla
    const tableRows = []; // Aquí debes poner los datos de tu tabla
    // Llena la tabla con datos
    filteredRows.forEach(alquileres => {
      const alquilerData = [
        clientes[alquileres.codigoCliente],
        alquileres.idAlquiler,
        alquileres.fechaIngreso,
        posiciones[alquileres.idAlquiler],
        alquileres.fechaRenovacion ? alquileres.fechaRenovacion : 'Sin Fecha de Renovación',
        montosTotales[alquileres.idAlquiler].toString(),
        renuevan.includes(alquileres.idAlquiler) ? 'Sí' : 'No'
      ];
      tableRows.push(alquilerData);
    });

     // Dibuja la tabla en el PDF
   autoTable(doc, { head: [tableColumn], body: tableRows });

  // Guarda el PDF
  doc.save(`${currentYear}-BWS-Monetizacion-${currentMonth}.pdf`);
};


    return (
      <Card className="lg:h-full lg:w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none"> 
          <div className="mb-8 flex items-center justify-between  gap-8">
            <div className="shadow-md bg-red-500  rounded-md  xl:w-2/4">
              <Typography className=" md:text-3xl lg:text-4xl xl:text-6xl font-bold  text-center  pt-4  text-white " variant="h2" color="blue-gray">
                MONETIZACION
              </Typography>
              <Typography variant="h5" color="gray" className="mt-1 font-normal md:text-xl lg:text-2xl xl:text-3xl text-center mb-10 text-white ">
                Información de la monetizacion de todos los clientes y cerrar mes
              </Typography>
            </div>
            <div className="w-full md:w-72 sm:w-11/12  ">
            </div>
          {!open && (
          <Button
                  size="lg"
                  color="red"
                  variant="gradient"
                  onClick={() => {console.log(renuevan);
                  console.log(idAlquileres);
                  setOpen(true);
                  setTimeout(() => {
                    exportToPDF();
                    cierrreMes(renuevan, idAlquileres);
                    setOpen(false);
                  }, 5000);
                  setTimeout(() => {
                    fetchAlquileres();
                  }, 7000);
                  setRenuevan([]);

                }}
                >
                  Cerrar Mes
                </Button>
                 )}

                <Button
                  size="lg"
                  color="amber"
                  variant="gradient"
                  onClick={() => {setFinalizados(!finalizados);
                }}
                >
                  {finalizados ? 'Con Alquileres Finalizados' : 'Solo Activos'}
                </Button>
          <Link to="/home" className="mx-auto mr-20 -mt-28 "> 
                  <IconButton variant="text">
                    <HomeIcon className="h-8 w-8 text-red-500" />
                  </IconButton>   
          </Link>
          </div>
          <Alert open={open} color="green"  icon={<Icon />}
                        className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
                          MES {currentMonth} CERRADO
                      </Alert>
            <div className="w-full md:w-72 sm:w-11/12  ">
            <div className='flex'>
                                <Select
                                    size="lg"
                                    label="Seleccionar Cliente"
                                    onChange={(value) => setSelectedClient(value)} // Almacena el cliente seleccionado
                                    value={selectedClient} // Establece el valor seleccionado del Select
                                  >
                                    <Option value="">Todos</Option>
                                    {Object.keys(clientes).map((codigo) => (
                                      <Option key={codigo} value={codigo}>
                                        {clientes[codigo]}
                                      </Option>

                                    ))
                                    }
                                  </Select>
                              </div>
            </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0 -mt-6">
        {!loading ? ( // Si NO está cargando, se muestra un mensaje o un indicador de carga
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr className="">
                {TABLE_HEAD.map((head) => (
            <th
            key={head}
            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
            > 
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
              {head}{" "}
              
            </Typography>
            </th>
                ))}
              </tr>
            </thead>
 <tbody>
        {paginatedData.map((alquileres) => (
          <tr key={alquileres.idAlquiler} className="border-b border-blue-gray-50">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {clientes[alquileres.codigoCliente]}
                   
                  </Typography>
                </div>
              </div>
            </td>
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                   {alquileres.idAlquiler}
                  </Typography>
                </div>
              </div>
            </td>
            <td className="p-4">
              <div className="flex flex-col">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                {alquileres.fechaIngreso}
                </Typography>
              </div>
            </td>
            <td className="p-4">
              <div className="flex flex-col">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                 {posiciones[alquileres.idAlquiler]}
                </Typography>
              </div>
            </td>
            {alquileres.fechaRenovacion != null &&(
            <td className="p-4">
              <div className="flex flex-col">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                {alquileres.fechaRenovacion}
                </Typography>
              </div>
            </td>
             )}
           {alquileres.fechaRenovacion == null &&(
            <td className="p-4">
              <div className="flex flex-col">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Sin Fecha de Renovación
                </Typography>
              </div>
            </td>
             )}
            <td className="p-4">
              <div className="flex flex-col">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                {montosTotales[alquileres.idAlquiler].toString()}
                </Typography>
              </div>
            </td>
            <td className="p-4">
                    <IconButton
                        variant="text"
                        className="hover:text-red-800"
                    >
                    <Checkbox color="red" className="h-5 w-5 " value={alquileres.idAlquiler} onChange={handleCheckboxChange} 
                      checked={renuevan.includes(alquileres.idAlquiler)}
                      />
                    </IconButton>            
            </td>
          </tr>
        ))}

      </tbody>
          </table>
          
           ) : (
            <div>Cargando monetizacion...</div> // Si está cargando, se muestra un mensaje de carga
        )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Página {currentPage} de {Math.ceil(alquileres.length / itemsPerPage)}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" className="bg-gray-50" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
              Atrás
            </Button>
            <Button variant="outlined" className="bg-red-400 text-white" size="sm"onClick={handleNextPage} disabled={totalPages <= 1 || currentPage === totalPages}>
              Siguiente
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }