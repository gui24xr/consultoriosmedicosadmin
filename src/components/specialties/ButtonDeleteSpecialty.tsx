"use client";
import { useState, useActionState, useTransition, useEffect } from "react";
import { RapidActionButton } from "@/components/Layout";
import { Modal } from "antd";
import { deleteSpecialty } from '@/actions'
import { useNotification } from '@/hooks';

export default function ButtonDeleteSpecialty({
  specialtyId,
}: {
  specialtyId: string;
}) {
  const { showSuccess, showError } = useNotification()
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Esta seguro de eliminar la especialidad?");

  const [isPendingTransition, startTransition] = useTransition()
  const [stateDeletingSpecialty, dispatch,isPending] = useActionState(deleteSpecialty,null)
  
  


  const handleOk = async () => {
    setModalText("Eliminando especialidad...");
    //setConfirmLoading(isPendingTransition);
   
          startTransition(async () =>await dispatch(specialtyId))
    

  };

  const handleCancel = () => {
    setOpen(false);
  };

 
  useEffect(()=>{
    if(stateDeletingSpecialty?.success){
      setOpen(false)
      showSuccess('Especialidad eliminada','Especialidad eliminada correctamente')
    }

     if(stateDeletingSpecialty?.success == false){
     
   setOpen(false)
      showError('Error al eliminar especialidad',stateDeletingSpecialty?.message )
    
    }
  },[stateDeletingSpecialty])

  return (
    <>
      <RapidActionButton
        onClick={() => setOpen(true)}
        iconType="SPECIALTY_DELETE"
      />
      <Modal
        title="Eliminar especialidad"
        open={open}
        onOk={handleOk}
        
        confirmLoading={isPendingTransition}
        onCancel={handleCancel}
        okText="Sí, eliminar"
        cancelText="Cancelar"
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
