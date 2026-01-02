import { EntityCard, ListCard } from "../Layout"
import { SpecialtyDTO } from "@/types"
import { SpecialtyActionBar } from "@/components/specialties"
export default function SpecialtyCard({specialty, expanded = false, showActionsBar = false}: {specialty: SpecialtyDTO, expanded?: boolean, showActionsBar?: boolean}) {
    const SpecialtyMedicsListCard = () => {
        return <ListCard 
            title='Medicos que atienden esta especialidad:'
            emptyMessage="Aun no existen medicos para esta especialidad."
            layout="column"
            items={specialty.providers.map(provider => provider.completeName)}
            />
    }

    const SpecialtyConsultationServicesList = () => {
        return <ListCard 
            title='Servicios de consulta para esta especialidad:'
            emptyMessage="Aun no existen servicios."
            items={specialty.prestations.map
            (prestation => prestation.label)}
            itemStyle="badge"
            layout="column"
            />
    }
    
    const sectionsArray = []
    sectionsArray.push(<SpecialtyMedicsListCard />)
    sectionsArray.push(<SpecialtyConsultationServicesList />)
    if (showActionsBar) {
        sectionsArray.push(<SpecialtyActionBar specialtyId={specialty.id} />)
    }
    return <EntityCard 
        title={specialty.name}
        subtitle={specialty.code}
        sections={sectionsArray}
        expanded={expanded}
        
        />
}