import {HomeIcon,MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Card,CardHeader,Typography,Button,CardBody,CardFooter,IconButton,Input,Checkbox} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useState,useMemo,useEffect} from "react";
import {buscaridPosicionAlquiler } from "../scripts/posiciones";
import { obtenerAlquileres,buscarAlquilerCliente} from "../scripts/alquileres";
import {obtenerNombreCliente,buscarCliente} from "../scripts/clientes";
import {calcularMontoTotalAlquiler} from "../scripts/monetizacion";

const TABLE_HEAD = ["Cliente", "Alquiler", "Fecha de Ingreso","Posicion", "Fecha de Renovacion", "Monto Total (USD)","Renueva?"];

  export default function Monetizacion() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [alquileres, setAlquileres] = useState([]);
  const [posiciones, setPosiciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [renuevan, setRenuevan] = useState([]);
  const [montosTotales, setMontosTotales] = useState({});

  //const [mercaderias, setMercaderias] = useState([]);

  async function fetchAlquileres() {
    try {
      const alquileresFromDB= await obtenerAlquileres();
      setAlquileres(alquileresFromDB || []);

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
        console.log("PARAMETROS DEL ALQUILER: ",alquiler.idAlquiler);
        console.log('CHAT Fecha Renovacion',fechaRenovacion);
        console.log('CHAT Fecha Ingreso',fechaIngreso);

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
  }, []);

  useEffect(() => {
    console.log(renuevan);
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


  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar el texto de búsqueda
  
    if (value.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 movimientos
      console.log("Búsqueda vacía, cargando alquileres");
      fetchAlquileres();
    } else {
      // Si hay texto en el campo de búsqueda, filtramos los movimientos
      console.log(value);
      buscarAlquilerCliente(value); // Esta función debería filtrar los movimientos en función del texto ingresado
    }
  };


  const handleSearchClick = async () => {
    if (searchText.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 clientes
      fetchAlquileres();
    } else {
      try {
        const cliente = await buscarCliente(searchText);
        const alquileresEncontrados = await buscarAlquilerCliente(cliente.codigo);
        setAlquileres(alquileresEncontrados || []);
      } catch (error) {
        console.error('Error al buscar clientes:', error);
      }
    }
  };

  
  const filteredRows = useMemo(() => {
      return alquileres.filter((row) =>
      row.codigoCliente.toString().includes(searchText));
  }, [searchText,alquileres]);


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
              <Input
                label="Buscar"
                icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer hover:text-red-600" onClick={handleSearchClick}/> }
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center rounded-md mx-auto justify-between gap-4 md:flex-row ">

          </div>
          <Button
                  size="lg"
                  color="red"
                  variant="gradient"
                >
                  Cerrar Mes
                </Button>
          <Link to="/home" className="mx-auto mr-20 -mt-28 "> 
                  <IconButton variant="text">
                    <HomeIcon className="h-8 w-8 text-red-500" />
                  </IconButton>   
          </Link>
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
                    <Checkbox color="red" className="h-5 w-5 " value={alquileres.idAlquiler} onChange={handleCheckboxChange} />
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