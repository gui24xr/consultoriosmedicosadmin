
import { SpecialtyOptionDTO } from '@/types';
import { useState, useEffect } from 'react'
import { fetchSpecialties } from '@/actions';

export default function useFormsSpecialtyOptions() {

      const [options, setOptions] = useState<SpecialtyOptionDTO[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchData = async () => {
          try {
             const response = await fetchSpecialties()
             if (!response.success) {
                setError('Error al cargar las especialidades.')
                return
            }
                     
            const {payload: specialties} = response
            if (specialties.length < 1) {
              setError('No existen especialidades meddicas en el sistema.')
            } else {
              const specialtiesOptions = specialties.map((specialty) => ({
                                id: specialty.id,
                                displayName: specialty.displayName
                            }))     
              setOptions(specialtiesOptions)
            }
          } catch(error) {
            console.error('Error fetching specialties:', error)
            setError("Hubo un error intentando preparar el formulario.") 
          } finally {
            setLoading(false)
          }
        }
        
        fetchData()
    }, [])


    return { options, loading, error };
}