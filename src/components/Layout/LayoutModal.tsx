'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { GoBackBar } from '@/components/Layout'

interface LayoutModalProps {
  isOpen?: boolean
  onClose: (value: boolean) => void
  titleIcon?: React.ReactNode
  title?: string
  description?: string
  fullScreen?: boolean
  backgroundColor?: string
  content?: React.ReactNode
  footer?: React.ReactNode
  showHeader?: boolean
}
export default function LayoutModal({
  isOpen = false,
  onClose,
  titleIcon = <X />,
  title = "Mi modal",
  description = "descripcion del modal",
  fullScreen = false, // Nueva prop más simple
  backgroundColor = "bg-gradient-to-br from-green-500 to-blue-500",
  content = <DefaultHeader />,
  footer = <DefaultFooter />,
  showHeader = true

}: LayoutModalProps) {

  // ✅ Estado interno para manejar animaciones
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para que la animación se vea al montar
      const timer = setTimeout(() => setInternalOpen(true), 10);
      return () => clearTimeout(timer);
    } else {
      setInternalOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* El Modal con transiciones */}
      <Transition.Root show={internalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => onClose(false)}>

          {/* Backdrop con animación */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden ">
              <div className={`pointer-events-none fixed inset-y-0 right-0 flex ${fullScreen ? 'w-full' : 'w-full xl:w-1/2 2xl:w-2/6'}`}>

                {/* Panel del modal deslizándose desde la derecha */}
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-full h-full">
                    <div className="h-full w-full flex flex-col bg-white shadow-2xl">

                      {/* Header */}
                      {showHeader && (
                      <div className={backgroundColor}>
                      <GoBackBar onBack={() => onClose(false)}/>
                      </div>
                       )}

                      {/* Contenido scrolleable */}
                      <div className="flex-1 overflow-y-auto
                       ">
                        {content}
                      </div>

                      {/* Footer 
                      <div className="bg-gray-500 p-4 flex-shrink-0 bg-black">
                        {footer}
                      </div>
                      */}

                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}


//-----------Partes defaults--------------------------------------------------------
function DefaultHeader() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <p>Contenido del modal aquí</p>
      <p>Este contenido puede ser muy largo y se hará scroll automáticamente.</p>
      <p>Puedes poner aquí lo que necesites.</p>
    </div>
  )
}

function DefaultFooter() {
  return (
    <div className="bg-gray-500 p-4 flex-shrink-0 bg-black">
      <p>Footer del modal</p>
    </div>
  )
}

