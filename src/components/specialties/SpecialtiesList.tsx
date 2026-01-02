'use client'
import { useMemo, useState } from 'react'
import { InputSearch } from '@/components/Layout'
import { List } from 'antd'
import { SpecialtyDTO } from "@/types"
import { SpecialtyCard } from '@/components/specialties'


export default function SpecialtiesList({specialties}: {specialties: SpecialtyDTO[]}) {
  
const [searchQuery, setSearchQuery] = useState('')

 const filteredData = useMemo(() => {
  if (!searchQuery.trim()) return specialties;
  
  return specialties.filter(
    specialty =>
      specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialty.providers.some(medic =>
        medic.completeName.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      specialty.prestations.some(prestation =>
        prestation.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
}, [specialties, searchQuery]);


  return (
    <div>
        <div className='p-2'>
            <InputSearch
                placeholder="Buscar especialidad"
                value={searchQuery} // Pasar el value
                onChangeFunction={setSearchQuery} // Simplificar
            />
        </div>
        <hr className="my-8"></hr>
         <List
            grid={{
                gutter: 16, // Espaciado entre elementos
                xs: 1, // 1 columna en mobile
                sm: 1, // 1 columna en tablet pequeño
                md: 1, // 2 columnas en tablet
                lg: 1, // 3 columnas en desktop
                xl: 1, // 3 columnas en desktop grande
                xxl: 1, // 4 columnas en pantallas muy grandes
            }}
            dataSource={filteredData}
            locale={{ emptyText: 'No se encontraron especialidades para la busqueda solicitada.' }}
            pagination={{
                pageSize: 8,
                showSizeChanger: true,
            }}
            renderItem={specialty => (
                <List.Item key={specialty.id}>
                    <SpecialtyCard specialty={specialty} showActionsBar />
                </List.Item>
            )}
            />
      </div>
  )
}
