import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon, ArrowRightIcon} from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
  const TABS = [
    {
      label: "Todos",
      value: "todos",
    },
    {
      label: "Ingreso",
      value: "ingreso",
    },
    {
      label: "Egreso",
      value: "egreso",
    },
  ];
   
  const TABLE_HEAD = ["Tipo de movimiento", "Código BWS", "Fecha", "Descripcion", ""];
   
  const TABLE_ROWS = [
    {
      tipo:"Ingreso",
      codigo:"12-AB1-123",
      fecha:"12/12/2021",
      descripcion:"Ingreso de cajas de vino",
    },
    {
      tipo:"Egreso",
      codigo:"02-KL1-777",
      fecha:"02/11/2019",
      descripcion:"Egreso de cajas de vino",
    },
    {
      tipo:"Ingreso",
      codigo:"45-FG2-742",
      fecha:"10/06/2020",
      descripcion:"Ingreso de cajas de zapatos",
    },
    {
      tipo:"Egreso",
      codigo:"21-CD3-321",
      fecha:"01/08/2023",
      descripcion:"Egreso de cajas de mesas",
    },
    {
      tipo:"Ingreso",
      codigo:"12-CABJ-567",
      fecha:"06/02/2002",
      descripcion:"Ingreso de cajas de teclados",
    },
  ];
   
  export default function SortableTable() {
    return (
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de movimientos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Ve información sobre todos los movimientos
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                Ver todos
              </Button>
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Añadir movimiento
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
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
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ tipo,codigo,fecha,descripcion }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={codigo}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {tipo}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {codigo}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {fecha}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {descripcion}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Ver inormación detallada">
                          <Link to="/descripcionMovimiento">
                          <IconButton variant="text" >
                            <ArrowRightIcon className="h-4 w-4" />
                          </IconButton>
                          </Link>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Página 1 de 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Atrás
            </Button>
            <Button variant="outlined" size="sm">
              Siguiente
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }