import {MagnifyingGlassIcon,HomeIcon} from "@heroicons/react/24/outline";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {Card,CardHeader,Input,Typography,Button,CardBody,CardFooter,IconButton,Tooltip,} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useState,useMemo,useEffect} from "react";
import {obtenerHangares,buscarHangar, borrarHangar} from "../scripts/hangares";


const TABLE_HEAD = ["ID", "Tamaño",,"Fecha de creación","Dar de baja"];

  export default function BajaHangar() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda
  const [hangares, setHangares] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [hangarToDelete, setHangarToDelete] = useState(null)

  async function fetchHangares() {
    try {
      const hangaresFromDB = await obtenerHangares();
      setHangares(hangaresFromDB || []);
    } catch (error) {
      console.error('Error al obtener hangares:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHangares();
  }, []);


  const itemsPerPage = 7; //Numero de clientes por pagina

  const totalItems = hangares.length;
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
      console.log("Búsqueda vacía, cargando los 100 primeros hangares");
      fetchHangares();
    } else {
      // Si hay texto en el campo de búsqueda, filtramos los movimientos
      console.log(value);
      buscarHangar(value); // Esta función debería filtrar los movimientos en función del texto ingresado
    }
  };


  const handleSearchClick = async () => {
    if (searchText.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 clientes
      fetchHangares();
    } else {
      try {
        const hangaresEncontrados = await buscarHangar(searchText);
        setHangares(hangaresEncontrados || []);
      } catch (error) {
        console.error('Error al buscar hangares:', error);
      }
    }
  };

  const filteredRows = useMemo(() => {
      return hangares.filter((row) =>
        row.idHangar.toString().includes(searchText)
      );
  }, [searchText, hangares]);


  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredRows.length);
    return filteredRows.slice(startIndex, endIndex);
  }, [currentPage, filteredRows]);

  const handleEliminar = async (idHangar) => {
    setHangarToDelete(idHangar);
    setShowConfirmationModal(true);
  };
  
  const confirmarEliminarHangar = async () => {
    try {
      await borrarHangar(hangarToDelete); // Elimina el cliente
    
      // Vuelve a cargar la lista de clientes después de eliminar uno
      const hangaresActualizados = await obtenerHangares();
      setHangares(hangaresActualizados || []);
    } catch (error) {
      console.error('Error al eliminar el hangar:', error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

    return (
      <Card className="lg:h-full lg:w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between  gap-8">
            <div className="shadow-md bg-red-500  rounded-md  xl:w-2/4">
              <Typography className=" md:text-3xl lg:text-4xl xl:text-6xl font-bold  text-center  pt-4  text-white " variant="h2" color="blue-gray">
                Eliminar hangares
              </Typography>
              <Typography variant="h5" color="gray" className="mt-1 font-normal md:text-xl lg:text-2xl xl:text-3xl text-center mb-10 text-white ">
                Dar de baja a un hangar
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
        {paginatedData.map((hangares) => (
          <tr key={hangares.idHangar} className="border-b border-blue-gray-50">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {hangares.idHangar}
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
                    {hangares.tamanio}
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
                {hangares.fecha_agregado}
                </Typography>
              </div>
            </td>
            <td className="p-4">
              <Tooltip content="Eliminar hangar" className="bg-red-500">
                <IconButton
                  variant="text"
                  className="hover:text-red-800"
                  onClick={() => handleEliminar(hangares.idHangar)} // Llama a handleEliminar con el código del cliente
                  >
                  <XMarkIcon className="h-5 w-5" />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        ))}
         {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <Typography variant="h6" color="blue-gray" className="mb-4">
              ¿Está seguro de que desea eliminar este hangar?
            </Typography>
            <div className="flex justify-end gap-4">
            <Button
                variant="outlined"
                className="bg-red-400 text-white"
                size="sm"
                onClick={confirmarEliminarHangar}
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
      </tbody>
          </table>
          
           ) : (
            <div>Cargando hangares...</div> // Si está cargando, se muestra un mensaje de carga
        )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Página {currentPage} de {Math.ceil(hangares.length / itemsPerPage)}
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