'use client'
import React, { useEffect} from 'react'
import { SpinnerLayout, ResultCard } from '@/components/Layout'
import { useNotification } from '@/hooks';




interface FormWrapperProps {
  // Títulos y descripciones
  formTitle?: string;
  formDescription: string;
  
  // Contenido del formulario
  mainForm: React.ReactNode;
  
  // Estados de loading
  formIsLoading?: boolean;
  loadingFormMessage?: string;
  
  // Estados de envío/procesamiento
  formIsTasking?: boolean;
  formTaskingMessage?: string;
  
  // Estados de éxito
  taskingSuccessOK?: boolean;
  renderOnSuccessOK?: React.ReactNode;
  renderOnSuccessOFail?: React.ReactNode;
  notificateOnSuccessOK?: boolean;
  noticationSuccessOKMessage?: string;
  
  // Estados de error
  taskingSuccessFail?: boolean;
  taskingSuccessFailMessage?: string;
  notificateOnSuccessFail?: boolean;
  noticationSuccessFailMessage?: string;

  // Acciones
  doOnSuccessOK?: () => void;
  doOnSuccessFail?: () => void;
}

export default function FormWrapper({
  formTitle,
  formDescription,
  mainForm,
  formIsLoading = false,
  loadingFormMessage = 'Cargando...',
  formIsTasking = false,
  formTaskingMessage = 'Enviando...',
  taskingSuccessOK = false,
  renderOnSuccessOK,
  renderOnSuccessOFail,
  notificateOnSuccessOK = true,
  noticationSuccessOKMessage = 'Tarea finalizada exitosamente.',
  taskingSuccessFail = false,
  taskingSuccessFailMessage,
  notificateOnSuccessFail = true,
  noticationSuccessFailMessage = 'Algo salio mal',
  doOnSuccessOK = () => {},
  doOnSuccessFail = () => {},
}: FormWrapperProps) {
  
      
  const { showSuccess, showError } = useNotification()

  useEffect(() => {
    if (taskingSuccessOK ) {
        showSuccess('Tarea finalizada', noticationSuccessOKMessage)
        doOnSuccessOK()
        }
       
   
  },[taskingSuccessOK])
  

  useEffect(() => {
    if (taskingSuccessFail) {
       showError('Tarea finalizada', noticationSuccessFailMessage)
        doOnSuccessOK()
            doOnSuccessFail()
        }
    
  },[taskingSuccessFail])

  const renderFunction = () => {
    if (formIsLoading) {
      return <SpinnerLayout message={loadingFormMessage} />
    }

    if (taskingSuccessOK) {
      return renderOnSuccessOK  || 
      <ResultCard 
        status='success'
        title="Tarea finalizada exitosamente"
        message={noticationSuccessOKMessage}
        />
    }
       

    
    if (taskingSuccessFail) {
      return renderOnSuccessOFail || 
      <ResultCard 
        status='error'
        title="No se pudo realizar la tarea."
        message={noticationSuccessFailMessage}
        />
    }


    if (formIsTasking) {
      return <SpinnerLayout message={formTaskingMessage} />
    }
    return mainForm
  }
  return (
       <div className="flex  bg-white  border-emerald-500 rounded-md shadow-xs p-4 md:p-8 ">
      <div className='flex flex-col gap-12 justify-start w-full max-w-lg mx-auto'>
        <div className="flex flex-col ">
          {formTitle && <h2 className="font-bold text-emerald-500 text-2xl align-left">{formTitle}</h2>}
          {formDescription ? <p className='text-gray-800'>{formDescription}</p> : <hr className='my-4'/>}
        </div>
          {renderFunction()}        
        </div>
      </div>
  )
}

