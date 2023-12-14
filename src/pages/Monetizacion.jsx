import {HomeIcon,InformationCircleIcon} from "@heroicons/react/24/outline";
import {Card,CardHeader,Typography,Button,CardBody,CardFooter,IconButton,Tooltip,} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useState,useMemo,useEffect} from "react";
import {buscaridPosicionAlquiler } from "../scripts/posiciones";
import { obtenerAlquileres} from "../scripts/alquileres";
import {obtenerNombreCliente} from "../scripts/clientes";

const TABLE_HEAD = ["Cliente", "Alquiler", "Fecha de Ingreso","Posicion", "Fecha de Renovacion", "Monto Total (USD)","Renueva?"];

  export default function Monetizacion() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [alquileres, setAlquileres] = useState([]);
  const [posiciones, setPosiciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  //const [mercaderias, setMercaderias] = useState([]);

  async function fetchAlquileres() {
    try {
      const alquileresFromDB= obtenerAlquileres();
      setPosiciones(alquileresFromDB || []);

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

    } catch (error) {
      console.error('Error al obtener clientes:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlquileres();
  }, []);


  const itemsPerPage = 7; //Numero de clientes por pagina

  const totalItems = posiciones.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  /*
  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar el texto de búsqueda
  
    if (value.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 movimientos
      console.log("Búsqueda vacía, cargando los 100 primeros movimientos");
      fetchPosiciones();
    } else {
      // Si hay texto en el campo de búsqueda, filtramos los movimientos
      console.log(value);
      //buscarCliente(value); // Esta función debería filtrar los movimientos en función del texto ingresado
    }
  };


  /*
  const handleSearchClick = async () => {
    if (searchText.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 clientes
      fetchPosiciones();
    } else {
      try {
        //const clientesEncontrados = await buscarCliente(searchText);
        //setPosiciones(clientesEncontrados || []);
      } catch (error) {
        console.error('Error al buscar clientes:', error);
      }
    }
  };
*/
  
  const filteredRows = useMemo(() => {
      return posiciones;  
  }, [posiciones]);


  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredRows.length);
    return filteredRows.slice(startIndex, endIndex);
  }, [currentPage, filteredRows]);


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
            <div className="flex flex-col items-center rounded-md mx-auto justify-between gap-4 md:flex-row ">

          </div>
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
                    {alquileres.idAlquiler}
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
                    {clientes[alquileres.codigoCliente]}
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
            <td className="p-4">
              <Tooltip content="Ver información detallada">
                <Link to={`/descripcionCliente/${clientes.codigo}`}>
                    <IconButton
                        variant="text"
                        className="hover:text-red-800"
                    >
                    <InformationCircleIcon className="h-5 w-5" />
                    </IconButton>
                </Link>
              </Tooltip>
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