'use client'
import Link from "next/link";
import { useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Menu, X, ArrowLeftCircle, ArrowLeft } from "lucide-react";
//import { ModeToggle } from "../Theme-Toggle-Button";

// Tus items de menú, sin cambios
const menuItems = [
  {
    name: "home",
    label: "Inicio",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    originalRoute: "/", // Este no tiene submenú
  },
  {
    name: "patients",
    label: "Pacientes",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    elements: [
      { label: "Ver Pacientes", href: "/patients" },
      { label: "Buscar Pacientes", href: "/patients/search" },
      { label: "Nuevo Paciente", href: "/patients/new" }
    ]
  },
  {
    name: "specialties",
    label: "Especialidades",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    elements: [
      { label: "Administrar Especialidades", href: "/specialties" }
    ]
  },
  {
    name: "medics",
    label: "Personal Médico",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z M9 12l2 2 4-4",
    elements: [
      { label: "Ver Médicos", href: "/medicServices/medics" },
      { label: "Nuevo Médico", href: "/medicServices/medics/new" }
    ]
  },
  {
    name: "consultations",
    label: "Consultorios",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    elements: [
      { label: "Ver Consultorios", href: "/medicServices/consultationServices" },
      { label: "Nuevo Consultorio", href: "/medicServices/consultationServices/new" }
    ]
  },
  {
    name: "appointments",
    label: "Agenda",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    elements: [
      { label: "Ver Agenda", href: "/medicServices/appointments" },
      { label: "Administrar Agenda", href: "/medicServices/appointments/new" }
    ]
  },
  {
    name: "bookings",
    label: "Reservas",
    icon: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    elements: [
      { label: "Ver Reservas", href: "/bookings" },
      { label: "Nueva Reserva", href: "/bookings/new" }
    ]
  }
];
export default function Navbar() {
  // Un único estado para controlar la barra lateral
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(menu => menu !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <>
      {/* --- BARRA SUPERIOR (SIEMPRE VISIBLE) --- */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="h-12 flex  items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
         

          {/* Logo en el centro/derecha */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <Link href="/" className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Consultorios Medicos
              </span>
            </Link>
          </div>

           {/* Botón para abrir/cerrar el menú */}
          <button onClick={toggleSidebar} className="mt-1 p-2 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer">
          <Menu className="w-6 h-6" />
          </button>
          
      
          
        </div>
      </header>

      {/* --- BARRA LATERAL (DRAWER) --- */}
      <Transition.Root show={isSidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeSidebar}>
          {/* Fondo oscuro (backdrop) */}
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-900/80 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full'>
                <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-200" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    {/* El contenido de tu antigua Navbar va aquí dentro */}
                    <nav className="flex h-full w-full max-w-md flex-col bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 text-white shadow-xl">
                      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-6">
                         {/* Botón para abrir/cerrar el menú */}
          <button onClick={toggleSidebar} className="p-2 rounded-md text-white hover:text-shadow-blue-400">
            {isSidebarOpen && <ArrowLeftCircle className="w-6 h-6" />}
          </button>
                        {/* Logo dentro del sidebar */}
                        <Link href="/" className="group flex items-center gap-3 text-xl font-bold text-emerald-200 mb-6 p-4 rounded-xl hover:bg-white/10" onClick={closeSidebar}>
                          <span className="bg-gradient-to-r from-emerald-100 to-green-200 bg-clip-text text-transparent">
                            Sistema Medico
                          </span>
                        </Link>
                        
                        {/* Items de Navegación */}
                        <div className="flex flex-col items-center gap-2 w-full">
                          {/* He simplificado tu lógica de menús para el ejemplo, puedes volver a poner la completa */}
                          {menuItems.map((item) => (
        <div key={item.name} className="w-full">
          {item.elements ? (
            // --- SI TIENE SUBMENÚ ---
            <>
              <button
                onClick={() => toggleMenu(item.name)}
                className="group flex items-center justify-between w-full p-3 text-center rounded-xl hover:bg-white/10 hover:text-emerald-100 transition-all duration-300 shadow-sm border border-transparent hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-200 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </div>
                <svg 
                  className={`w-4 h-4 text-emerald-200 transition-transform duration-300 ${openMenus.includes(item.name) ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openMenus.includes(item.name) && (
                <div className="mt-1 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {item.elements.map((subItem) => (
                    <Link 
                      key={subItem.href}
                      href={subItem.href} 
                      className="block w-full p-2 text-sm text-emerald-100 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 pl-8"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            // --- SI NO TIENE SUBMENÚ (Es un enlace simple) ---
            <Link 
              href={item.originalRoute} 
              className="group flex items-center gap-3 w-full p-3 text-center rounded-xl hover:bg-white/10 hover:text-emerald-100 transition-all duration-300 shadow-sm border border-transparent hover:border-white/20"
              onClick={() =>setIsSidebarOpen(false)}
            >
              <svg className="w-5 h-5 text-emerald-200 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-medium">{item.label}</span>
            </Link>
          )}
        </div>
      ))}
                        </div>

                        {/* Toggle de tema en la parte inferior */}
                        <div className="mt-auto pt-6">
                          <p>Toggle themes</p>
                        </div>
                      </div>
                    </nav>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}