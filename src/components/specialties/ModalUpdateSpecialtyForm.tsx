'use client'
import { LayoutModal } from '../Layout'
import { useModalsStore } from '@/stores'

export default function ModalUpdateSpecialtyForm() {

  const showUpdateSpecialtyForm = useModalsStore(state => state.showUpdateSpecialtyForm);
  const closeUpdateSpecialtyFormModal = useModalsStore(state => state.closeUpdateSpecialtyFormModal);
  
  return (
    <LayoutModal
      isOpen={showUpdateSpecialtyForm}
      onClose={() => closeUpdateSpecialtyFormModal()}
      showHeader={true}
      content={<div>Colocar form correspondiente</div>}
    />
  )
}