import {MagnifyingGlassIcon,HomeIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {Card,CardHeader,Input,Typography,Button,CardBody,CardFooter,IconButton,Tooltip,} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useState,useMemo,useEffect} from "react";
import { buscarCliente, obtenerCienPrimerosClientes } from "../scripts/clientes";

const TABLE_HEAD = ["Código", "Nombre", "Responsable","Correo electrónico", "Nombre de usuario","Dar de baja"];

  export default function BajaCliente() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  async function fetchClientes() {
    try {
      const clientesFromDB = await obtenerCienPrimerosClientes(); //Solo trae los primeros cien movimientos, no la base de datos completa
      setClientes(clientesFromDB || []);

    } catch (error) {
      console.error('Error al obtener clientes:', error);
    } finally {
      setLoading(false); // Se establece a falso independientemente del resultado de la obtención de datos
    }
  }

  useEffect(() => {
    fetchClientes();
  }, []);


  const itemsPerPage = 7; //Numero de clientes por pagina

  const totalItems = clientes.length;
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
      console.log("Búsqueda vacía, cargando los 100 primeros movimientos");
      fetchClientes();
    } else {
      // Si hay texto en el campo de búsqueda, filtramos los movimientos
      console.log(value);
      buscarCliente(value); // Esta función debería filtrar los movimientos en función del texto ingresado
    }
  };

  const cargarNuevosDatos = async () => {
    const nuevosClientes = await buscarCliente(nombreCliente);
    setClientes(nuevosClientes || []);
  };

  const handleSearchClick = async () => {
    if (searchText.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 clientes
      fetchClientes();
    } else {
      try {
        const clientesEncontrados = await buscarCliente(searchText);
        setClientes(clientesEncontrados || []);
      } catch (error) {
        console.error('Error al buscar clientes:', error);
      }
    }
  };

  const filteredRows = useMemo(() => {
      return clientes.filter((row) =>
        row.nombreCliente.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [searchText, clientes]);

  const handleTabChange = (value) => {
    setSelectedTab(value);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar de pestaña
  };

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
                Lista de movimientos
              </Typography>
              <Typography variant="h5" color="gray" className="mt-1 font-normal md:text-xl lg:text-2xl xl:text-3xl text-center mb-10 text-white ">
                Ve información sobre todos los movimientos
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
          <Link to="/home" className="mx-auto -mt-28 "> 
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
                {TABLE_HEAD.map((head, index) => (
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
        {paginatedData.map((clientes) => (
          <tr key={clientes.codigo} className="border-b border-blue-gray-50">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {clientes.codigo}
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
                    {clientes.nombreCliente}
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
                {clientes.responsable}
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
                {clientes.email}
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
                {clientes.username}
                </Typography>
              </div>
            </td>
            <td className="p-4">
              <Tooltip content="Eliminar cliente" className="bg-red-500">
                  <IconButton variant="text" className=" hover:text-red-800">
                    <ArrowRightIcon className="h-4 w-4" />
                  </IconButton>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
          </table>
           ) : (
            <div>Cargando movimientos...</div> // Si está cargando, se muestra un mensaje de carga
        )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Página {currentPage} de {Math.ceil(clientes.length / itemsPerPage)}
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