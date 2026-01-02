import { specialtiesService } from '@/services'
import { Suspense } from 'react'
import { SpinnerLayout,  LayoutTitle, EntityPageLayout } from '@/components/Layout'
import { SpecialtiesList, ButtonCreateNewSpecialty } from '@/components/specialties'
export default async function MedicsPage() {
 const specialties = await specialtiesService.getSpecialties()
  return (
    <>
    <EntityPageLayout
        headerContent={<LayoutTitle title="Especialidades" descripcion="Especialidades registradas." />}
        actions={[<ButtonCreateNewSpecialty key='button-createNewSpecialty' />]}
        mainContent={ <Suspense fallback={<SpinnerLayout message="Cargando..."/>}>
           <SpecialtiesList specialties ={specialties}/>
          </Suspense>}
       />
    </>

    
  )
}
