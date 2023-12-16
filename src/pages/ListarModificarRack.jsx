import {MagnifyingGlassIcon,HomeIcon,PencilIcon} from "@heroicons/react/24/outline";
import {Card,CardHeader,Input,Typography,Button,CardBody,CardFooter,IconButton,Tooltip,} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useState,useMemo,useEffect} from "react";
import { buscarRack, obtenerRacks } from "../scripts/racks";

const TABLE_HEAD = ["ID", "Posicion", "Altura","Fecha de creación","Modificar"];

  export default function ListarModificarRack() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda
  const [racks, setRacks] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  async function fetchRacks() {
    try {
      const racksFromDB = await obtenerRacks();
      setRacks(racksFromDB || []);
    } catch (error) {
      console.error('Error al obtener racks:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRacks();
  }, []);


  const itemsPerPage = 7; //Numero de racks por pagina

  const totalItems = racks.length;
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
      fetchRacks();
    } else {
      // Si hay texto en el campo de búsqueda, filtramos los movimientos
      console.log(value);
      buscarRack(value); // Esta función debería filtrar los movimientos en función del texto ingresado
    }
  };


  const handleSearchClick = async () => {
    if (searchText.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 clientes
      fetchRacks();
    } else {
      try {
        const racksEncontrados = await buscarRack(searchText);
        setRacks(racksEncontrados || []);
      } catch (error) {
        console.error('Error al buscar racks:', error);
      }
    }
  };

  const filteredRows = useMemo(() => {
      return racks.filter((row) =>
      row.idRack.toString().includes(searchText)
      );
  }, [searchText, racks]);


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
                Modificar Rack
              </Typography>
              <Typography variant="h5" color="gray" className="mt-1 font-normal md:text-xl lg:text-2xl xl:text-3xl text-center mb-10 text-white ">
                Actualiza la información de los racks
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
        {paginatedData.map((racks) => (
          <tr key={racks.idRack} className="border-b border-blue-gray-50">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {racks.idRack}
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
                    {racks.columnas}
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
                {racks.filas}
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
                {racks.fecha_agregado}
                </Typography>
              </div>
            </td>
            <td className="p-4">
              <Tooltip content="Actualizar rack">
                <Link to={`/modificarRack/${racks.idRack}`}>
                    <IconButton
                        variant="text"
                        className="hover:text-red-800"
                    >
                    <PencilIcon className="h-5 w-5" />
                    </IconButton>
                </Link>
              </Tooltip>
            </td>
          </tr>
        ))}

      </tbody>
          </table>
          
           ) : (
            <div>Cargando racks...</div> // Si está cargando, se muestra un mensaje de carga
        )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Página {currentPage} de {Math.ceil(racks.length / itemsPerPage)}
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