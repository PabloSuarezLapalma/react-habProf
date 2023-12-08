import {MagnifyingGlassIcon,HomeIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {Card,CardHeader,Input,Typography,Button,CardBody,CardFooter,Tabs,TabsHeader,Tab,IconButton,Tooltip,} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useState,useMemo,useEffect} from "react";
import {filtrarMovimiento, obtenerMovimientos,filtrarMovimientosEntreFechas} from "../scripts/movimientos";
import {obtenerDescripcionMercaderia} from "../scripts/mercaderia";
import {obtenerNombreCliente,obtenerCodigoCliente} from "../scripts/clientes";

const TABS = [{label: "Todos",value: "Todos",},{label: "Ingreso",value: "INGRESO",},{label: "Egreso",value: "EGRESO",},];
const TABLE_HEAD = ["Cliente", "Tipo de movimiento", "Fecha", "Descripcion", "Detalles"];

  export default function SortableTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("Todos"); // Por defecto, mostrar todos
  const [searchText, setSearchText] = useState(""); // Nuevo estado para el texto de búsqueda
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [mercaderias, setMercaderias] = useState([]); // Estado para almacenar las mercaderías
  const [clientes, setClientes] = useState([]); // Estado para almacenar los nombres de los Clientes
  const [fechaDesde, setFechaDesde] = useState();
  const [fechaHasta, setFechaHasta] = useState();

  async function fetchMovimientos() {
    try {
      const movimientosFromDB = await obtenerMovimientos(); //Solo trae los primeros cien movimientos, no la base de datos completa
      setMovimientos(movimientosFromDB || []);

      // Obtenemos los nombres de los clientes para cada movimiento
      const clientes = {};
      for (const movimiento of movimientosFromDB) {
          const nombreCliente = await obtenerNombreCliente(movimiento.codigoCliente);
          clientes[movimiento.codigoCliente] = nombreCliente;
      }
      setClientes(clientes);

      // Obtenemos la descripcion de cada mercaderia para cada movimiento
      const mercaderias={};
      for (const movimiento of movimientosFromDB) {
        const descripcionMercaderia = await obtenerDescripcionMercaderia(movimiento.idMercaderia);
        mercaderias[movimiento.idMercaderia] = descripcionMercaderia;
      }
      setMercaderias(mercaderias);

    } catch (error) {
      console.error('Error al obtener movimientos:', error);
    } finally {
      setLoading(false); // Se establece a falso independientemente del resultado de la obtención de datos
    }
  }

  useEffect(() => {
    fetchMovimientos();
  }, []);


  const itemsPerPage = 7; //Numero de movimientos por pagina

  const totalItems = movimientos.length;
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
      fetchMovimientos();
    } else {
      // Si hay texto en el campo de búsqueda, filtramos los movimientos
      console.log(value);
      filtrarMovimiento(value); // Esta función debería filtrar los movimientos en función del texto ingresado
    }
  };

  const handleDateClick = () => {
    if (fechaDesde.trim() === "" || fechaHasta.trim() === "") {
      fetchMovimientos();
    } else {
      cargarFiltradoFechas();
    }
  };

  const cargarFiltradoFechas = async () => {  
    const nuevosMovimientos = await filtrarMovimientosEntreFechas(fechaDesde,fechaHasta);
    setMovimientos(nuevosMovimientos || []);
    const clientes = {};
    for (const movimiento of nuevosMovimientos) {
        const nombreCliente = await obtenerNombreCliente(movimiento.codigoCliente);
        clientes[movimiento.codigoCliente] = nombreCliente;
    }
    setClientes(clientes);
    const mercaderias={};
    for (const movimiento of nuevosMovimientos) {
      const descripcionMercaderia = await obtenerDescripcionMercaderia(movimiento.idMercaderia);
      mercaderias[movimiento.idMercaderia] = descripcionMercaderia;
    }
    setMercaderias(mercaderias);
  };

  const cargarNuevosDatos = async () => {
    const codigoCliente = await obtenerCodigoCliente(searchText);
    const nuevosMovimientos = await filtrarMovimiento(codigoCliente);
    setMovimientos(nuevosMovimientos || []);
     // Obtenemos los nombres de los clientes para cada movimiento
     const clientes = {};
     for (const movimiento of nuevosMovimientos) {
         const nombreCliente = await obtenerNombreCliente(movimiento.codigoCliente);
         clientes[movimiento.codigoCliente] = nombreCliente;
     }
     setClientes(clientes);

     // Obtenemos la descripcion de cada mercaderia para cada movimiento
     const mercaderias={};
     for (const movimiento of nuevosMovimientos) {
       const descripcionMercaderia = await obtenerDescripcionMercaderia(movimiento.idMercaderia);
       mercaderias[movimiento.idMercaderia] = descripcionMercaderia;
     }
     setMercaderias(mercaderias);

  };



  const handleSearchClick = () => {
    setFechaDesde("");
    setFechaHasta("");
    if (searchText.trim() === "") {
      fetchMovimientos();
    } else {
      cargarNuevosDatos();
    }
  };

  
  const filteredRows = useMemo(() => {
    if (selectedTab === "Todos") {
      return movimientos
      //.filter((row) =>
       // row.codigoCliente.toLowerCase().includes(searchText.toLowerCase()) &&
        //(!fechaDesde || row.fecha >= fechaDesde) &&
        //(!fechaHasta || row.fecha <= fechaHasta)
      //);
    } else {
      return movimientos.filter(
        (row) =>
          row.estado === selectedTab 
         
         // &&
          //row.codigoCliente.toLowerCase().includes(searchText.toLowerCase()) &&
          //(!fechaDesde || row.fecha >= fechaDesde) &&
          //(!fechaHasta || row.fecha <= fechaHasta)
          
      );
    }
  }, [selectedTab, searchText, movimientos, fechaDesde, fechaHasta]);
  
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
            <Tabs value="all" className="w-full  md:w-max rounded-md shadow-lg ">
              <TabsHeader className=" bg-red-500 shadow-lg ">
                {TABS.map(({ label, value }) => (
                  <Tab className="" key={value} value={value} onClick={() => handleTabChange(value)}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>
          <label htmlFor='fecha' className='block text-md font-medium leading-6 text-gray-900'>
                        Filtrar por fechas:
                    </label>
          <input
                        id='fechaDesde'
                        name="fechaDesde"  
                        type="date" 
                        className="block rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={fechaDesde} 
                        required
                        onChange={(e) => setFechaDesde(e.target.value)} 
                    />
                <input
                        id='fechaHasta'
                        name="fechaHasta"  
                        type="date" 
                        className="block rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" 
                        value={fechaHasta} 
                        required
                        onChange={(e) => setFechaHasta(e.target.value)} 
                    />
         <Button onClick={handleDateClick}>
            Filtrar
          </Button>
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
        {paginatedData.map((movimiento) => (
          <tr key={movimiento.nombreCliente} className="border-b border-blue-gray-50">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {clientes[movimiento.codigoCliente]}
                  </Typography>
                </div>
              </div>
            </td>
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="red"
                    className="font-normal"
                  >
                    {movimiento.estado}
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
                {movimiento.fecha}
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
                {mercaderias[movimiento.idMercaderia]}  
                </Typography>
              </div>
            </td>
            <td className="p-4">
              <Tooltip content="Ver información detallada">
                <Link to={`/descripcionMovimiento/${movimiento.codigoBWS}`}>
                  <IconButton variant="text">
                    <ArrowRightIcon className="h-4 w-4" />
                  </IconButton>
                </Link>
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
            Página {currentPage} de {Math.ceil(movimientos.length / itemsPerPage)}
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