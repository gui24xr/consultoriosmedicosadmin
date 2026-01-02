'use client'
import { RapidActionButton } from "@/components/Layout";
import { useRouter } from "next/navigation";

export default function ButtonUpdateSpecialty({ specialtyId}: {specialtyId: string}) {
    
    const router = useRouter();
    return (
        <>
           <RapidActionButton 
            onClick={() => router.push(`/specialties/${specialtyId}/edit`)} 
            iconType="SPECIALTY_EDIT" 
            />
          
        </> 
    )
}