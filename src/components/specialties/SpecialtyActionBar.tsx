'use client'
import { ButtonDeleteSpecialty, ButtonUpdateSpecialty } from "@/components/specialties";

export default function SpecialtyActionBar({
    specialtyId,
    showUpdateButton = true,
    showDeleteButton = true

}: {specialtyId: string, showUpdateButton?: boolean, showDeleteButton?: boolean}) {
    
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            {showUpdateButton && <ButtonUpdateSpecialty specialtyId={specialtyId} />}
            {showDeleteButton && <ButtonDeleteSpecialty specialtyId={specialtyId}  />}
        </div>
       
    )
}