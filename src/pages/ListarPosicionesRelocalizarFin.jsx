import {MagnifyingGlassIcon,HomeIcon,ArrowLeftIcon} from "@heroicons/react/24/outline";
import {Card,CardHeader,Input,Typography,Button,CardBody,CardFooter,IconButton,Tooltip,Spinner} from "@material-tailwind/react";
import {Link,useParams,useNavigate} from "react-router-dom";
import {useState,useMemo,useEffect} from "react";
import { buscarPosicion, obtenerPosiciones } from "../scripts/posiciones";
import { buscarMercaderia } from "../scripts/mercaderia";
import {buscarAlquileresCliente} from "../scripts/alquileres";
import {buscarPosicionesAlquiler} from "../scripts/posiciones";
import { registrarIngresoRelocalizar } from "../scripts/ingreso_backstage";
import { registrarEgresoRelocalizar } from "../scripts/egreso_backstage";

const TABLE_HEAD = ["ID", "Posicion", "Sector","Altura", "Volumen","Alquiler","Seleccionar"];

  export default function ListarPosicionesRelocalizarFin() {
  const navigate = useNavigate();
  const {alquiler,idPosicion,codigoCliente,idMercaderia,cantidad} = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda
  const [posiciones, setPosiciones] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  async function fetchPosiciones() {
    try {
      const mercaderiaFromDB = await buscarMercaderia(idMercaderia);
      const alto = mercaderiaFromDB.alto;
      const ancho = mercaderiaFromDB.ancho;
      const largo = mercaderiaFromDB.largo;
      const volumenFiltro= alto*ancho*largo;
      const alquileres = await buscarAlquileresCliente(codigoCliente);
      const posicionesCliente = [];
      for (const alquiler of alquileres) {
        const posicionesAlquiler = await buscarPosicionesAlquiler(alquiler.idAlquiler);
        posicionesCliente.push(...posicionesAlquiler);
        console.log("Posiciones encontradas:", posicionesAlquiler);
      }
      const posicionesFiltradas = posicionesCliente.filter(posicion => posicion.volumen >= volumenFiltro && posicion.idPosicion !== idPosicion);
      setPosiciones(posicionesFiltradas || []);
    } catch (error) {
      console.error('Error al obtener posiciones:', error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchPosiciones();
  }, []); // fetchPosiciones es una dependencia, pero como no cambia, useEffect solo se ejecutará una vez

  const itemsPerPage = 7; //Numero de clientes por pagina

    
  const handleConfirmar = async () => {
    setShowConfirmationModal(true);
  };

  async function confirmarRelocalizar(posicionNueva) {
    try {    
      let nuevoIdMercaderia= Math.floor(Math.random() * 1000000000);
      registrarIngresoRelocalizar(alquiler, posicionNueva, idMercaderia,parseInt(cantidad),nuevoIdMercaderia);
      registrarEgresoRelocalizar(alquiler,idPosicion,idMercaderia,parseInt(cantidad));
      navigate('/home');
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    } finally {
      setShowConfirmationModal(false);
    }
  }


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

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // Reiniciar a la primera página al cambiar el texto de búsqueda
  
    if (value.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 movimientos
      console.log("Búsqueda vacía");
      fetchPosiciones();
    } else {
      // Si hay texto en el campo de búsqueda, filtramos los movimientos
      console.log(value);
      buscarPosicion(value); // Esta función debería filtrar los movimientos en función del texto ingresado
    }
  };


  const handleSearchClick = async () => {
    if (searchText.trim() === "") {
      // Si el campo de búsqueda está vacío, cargamos los primeros 100 clientes
      fetchPosiciones();
    } else {
      try {
        const posicionEncontrada = await buscarPosicion(searchText);
        setPosiciones(posicionEncontrada || []);
      } catch (error) {
        console.error('Error al buscar posiciones:', error);
      }
    }
  };

  const filteredRows = useMemo(() => {
      return posiciones.filter((row) =>
        row.idPosicion.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [searchText, posiciones]);


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
                Lista de Posiciones Disponibles
              </Typography>
              <Typography variant="h5" color="gray" className="mt-1 font-normal md:text-xl lg:text-2xl xl:text-3xl text-center mb-10 text-white ">
                Seleccione la posicion a la cual desea mover la mercaderia {idMercaderia}
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
                    <HomeIcon className="h-8 w-8 text-red-500"/>
                  </IconButton>   
          </Link>
                  <IconButton variant="text"  className="mx-auto mr-20 -mt-28 "
                    onClick={() => navigate(`/listarMercaderiaPosicionRelocalizar/${alquiler}/${idPosicion}/${codigoCliente}`)}
                  >
                    <ArrowLeftIcon className="h-8 w-8 text-red-500" />
                  </IconButton>   
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll -mt-6 px-0">
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
        {paginatedData.map((posiciones) => (
          <tr key={posiciones.idPosicion} className="border-b border-blue-gray-50 ">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {posiciones.idPosicion}
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
                    {posiciones.letraPosicion}
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
                {posiciones.sector}
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
                {posiciones.altura}
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
                {posiciones.volumen}
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
                {posiciones.idAlquiler}
                </Typography>
              </div>
            </td>
            <td className="p-4">
              <Tooltip content="Elegir posición para ver su mercadería">
                <Button
                  size="sm"
                  color="red"
                  variant="gradient"
                  className="hover:text-red-800"
                  onClick={() => {handleConfirmar();
                  }}                >
                  Elegir
                </Button>
              </Tooltip>
            </td>
            {showConfirmationModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded shadow-md">
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    ¿Desea relocalizar la mercadería {idMercaderia} de la posición {idPosicion} a la posición {posiciones.idPosicion}?
                  </Typography>
                  <div className="flex justify-end gap-4">
                  <Button
                      variant="outlined"
                      className="bg-red-400 text-white"
                      size="sm"
                      onClick={() => confirmarRelocalizar(posiciones.idPosicion)}
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
          </tr>
        ))}
      </tbody>
          </table>
           ) : (
            <Spinner className="flex gap-8 mx-auto h-8 w-8" color="red"/> // Si está cargando, se muestra un mensaje de carga

        )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Página {currentPage} de {Math.ceil(posiciones.length / itemsPerPage)}
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
