import { EntityPageLayout, LayoutTitle, SpinnerLayout } from "@/components/Layout"
import { SpecialtyUpdateForm } from "@/components/specialties"
import { Suspense } from "react"
import { specialtiesService } from "@/services"
import { MinimalLink } from "@/components/Layout"
export default async function SpecialtyEditPage({ params }: { params: { id: string } }) {
    const { id: specialtyId } = await params
    if (!specialtyId) throw new Error('Id is required')
    const specialty = await specialtiesService.getSpecialtyById(specialtyId)

    return (
         <EntityPageLayout
               headerContent={<LayoutTitle title="Especialidades" descripcion="Especialidades registradas." />}
               actions={[
                    <MinimalLink 
                        key='button-back' 
                        href={`/specialties/`}
                        label="< Volver a Especialidades"
                        variant="minimal"
                        />
                ]}
               mainContent={ <Suspense fallback={<SpinnerLayout message="Cargando..."/>}>
                  <SpecialtyUpdateForm specialty ={specialty}/>
                 </Suspense>}
              />
          
    )
}