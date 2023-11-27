  import { Fragment, useState } from 'react'
  import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
  import {
    ArrowPathIcon,
    Bars3Icon,
    PlusIcon,
    MinusIcon,
    ListBulletIcon,
    SquaresPlusIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline'
  import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
  const movimientos = [
    { name: 'Registrar ingreso', description: 'Registrar un nuevo movimiento de ingreso', href: '/formIngreso', icon: PlusIcon },
    { name: 'Registrar egreso', description: 'Registrar un nuevo movimiento de egreso', href: '/formEgreso', icon: MinusIcon },
    { name: 'Ver movimientos', description: 'Ver todos los movimientos', href: '#', icon: ListBulletIcon },
    { name: 'Agregar rack', description: 'Connect with third-party tools', href: '/agregarRack', icon: SquaresPlusIcon }, //en este const van todos los de mov aca puse de rack para acceder facil, deberíamos hacer lo mismo para gestion de rack, de hangar y ver cuales más
    { name: 'Agregar hangar', description: 'Build strategic funnels that will convert', href: '/agregarHangar', icon: ArrowPathIcon }, //en este const van todos los de mov aca puse de hangar para acceder facil, deberíamos hacer lo mismo para gestion de rack, de hangar y ver cuales más
  ]
  const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
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
            <a href="/home" className="-m-1.5 p-1.5">
              <span className="sr-only">BACI BWS</span>
              <img className="h-8 w-auto" src="src\assets\images\BACI.png" alt="Baci logo" />
            </a>
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
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Movimiento
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
                          <a href={item.href} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                      >
                        <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Features
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Marketplace
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Company
            </a>
          </Popover.Group>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/home" className="-m-1.5 p-1.5">
                <span className="sr-only">Baci BWS</span>
                <img
                  className="h-8 w-auto"
                  src="src\assets\images\BACI.png"
                  alt=""
                />
              </a>
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
                          Movimiento
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...movimientos, ...callsToAction].map((item) => (
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
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className=" -my-8 box -z-10">
                <h1 className="  text-2xl sm:w-3/4   xl:w-11/12 md:w-3/4 mx-auto md:text-3xl lg:w-1/2 lg:text-4xl xl:text-6xl font-bold mt-5 text-center mb-10 pt-72 pb-4 text-red-600 ">- BACI WAREHOUSE SERVICE -</h1>
                <h2 className=" text-xl sm:w-3/4  xl:w-11/12 md:w-3/4 mx-auto md:text-2xl lg:text-3xl xl:text-5xl font-bold mt-5 text-center mb-10 pt-4 pb-4 text-red-500 "> Nos encargamos de cuidar tu almacenamiento y tu negocio</h2>
      </div>
      </div>
      
      
    )
  }
