  import { Fragment, useState } from 'react'
  import { Link } from 'react-router-dom'
  import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
  import {Bars3Icon,PlusIcon,MinusIcon,ListBulletIcon,MapPinIcon,XMarkIcon,UserPlusIcon,UserMinusIcon, UserCircleIcon} from '@heroicons/react/24/outline'
  import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
  import { Typography } from "@material-tailwind/react";

  
  const movimientos = [
    { name: 'Registrar ingreso', description: 'Registrar un nuevo movimiento de ingreso', href: '/formIngreso', icon: PlusIcon },
    { name: 'Registrar egreso', description: 'Registrar un nuevo movimiento de egreso', href: '/formEgreso', icon: MinusIcon },
    { name: 'Relocalizar movimiento', description: 'Permite modificar un movimiento', href: '#', icon: MapPinIcon },
    { name: 'Ver movimientos', description: 'Ver todos los movimientos', href: '/listarMovimientos', icon: ListBulletIcon },
  ]
  const clientes = [
    { name: 'Registrar cliente', description: 'Registrar un nuevo cliente', href: '/agregarCliente', icon: UserPlusIcon },
    { name: 'Baja de cliente', description: 'Eliminar un cliente', href: '/bajarCliente', icon: UserMinusIcon },
    { name: 'Modificar cliente', description: 'Modificar un cliente', href: '/#', icon: UserCircleIcon }, //en este const van todos los de mov aca puse de rack para acceder facil, deberíamos hacer lo mismo para gestion de rack, de hangar y ver cuales más
    { name: 'Ver clientes', description: 'Listar todos los clientes', href: '/#', icon: ListBulletIcon },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
      <div className="">
      <header className="bg-white shadow-lg z-10">
        <nav className="mx-auto  flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/home" className="-m-1.5 p-1.5">
              <Typography className="sr-only">BACI BWS</Typography>
              <img className="h-8 w-auto" src="src\assets\images\BACI.png" alt="Baci logo" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir el menú principal</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm leading-6 font-semibold text-blue-gray-900">
                Movimientos
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {movimientos.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-red-500" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                          <Link to={item.href} className="block font-semibold  text-blue-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </Popover.Panel>
              </Transition>
            </Popover>
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm leading-6 font-semibold text-blue-gray-900">
                Clientes
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {clientes.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-red-500" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                          <Link to={item.href} className="block font-semibold  text-blue-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/home" className="-m-1.5 p-1.5">
                <span className="sr-only">Baci BWS</span>
                <img
                  className="h-8 w-auto"
                  src="src\assets\images\BACI.png"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-red-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Movimientos
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...movimientos,].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Clientes
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...clientes,].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      

      <figure className="relative h-96 w-full">
      <img
        className=" h-screen w-screen object-cover object-center"
        src="src/assets/images/BaciBlur.png" //aca va la imagen de baci blur;
        alt="imagen de baci"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h1" color="blue-gray">
            BACI WAREHOUSE SERVICE
          </Typography>
          <Typography color="gray" variant="h5" className="mt-2 font-normal">
          Nos encargamos de cuidar tu almacenamiento y tu negocio
          </Typography>
        </div>
      </figcaption>
    </figure>


      </div>
      
      
    )
  }
