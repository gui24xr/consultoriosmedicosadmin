'use client'
import { LayoutModal } from "@/components/Layout"
import { useState } from "react"
import { Button } from "antd"
import { SpecialtyCreateForm } from "@/components/specialties"

export default function ButtonCreateNewSpecialty() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Button onClick={() => setShowModal(true)} type="primary">Nueva Especialidad</Button>
            {showModal &&
            <LayoutModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                showHeader={true}
                content={<SpecialtyCreateForm />}
            />
        }
        </>
    )
}