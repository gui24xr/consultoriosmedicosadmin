'use client'

import { create } from 'zustand'

type ModalsState = {
  // Medic operations
  medicIdForUpdate: string | null
  showUpdateMedicForm: boolean 
  medicIdForDelete: string | null
  showDeleteMedicForm: boolean

  openUpdateMedicFormModal: (medicId: string) => void
  closeUpdateMedicFormModal: () => void
  openDeleteMedicFormModal: (medicId: string) => void
  closeDeleteMedicFormModal: () => void

  // Specialty operations
  specialtyIdForUpdate: string | null
  showUpdateSpecialtyForm: boolean 
  specialtyIdForDelete: string | null
  showDeleteSpecialtyForm: boolean

  openDeleteSpecialtyFormModal: (specialtyId: string) => void
  closeDeleteSpecialtyFormModal: () => void
  openUpdateSpecialtyFormModal: (specialtyId: string) => void
  closeUpdateSpecialtyFormModal: () => void

  // Patient operations
  patientIdForUpdate: string | null
  showUpdatePatientForm: boolean 
  patientIdForDelete: string | null
  showDeletePatientForm: boolean

  openUpdatePatientFormModal: (patientId: string) => void
  closeUpdatePatientFormModal: () => void
  openDeletePatientFormModal: (patientId: string) => void
  closeDeletePatientFormModal: () => void

  // ConsultationService operations
  consultationServiceIdForUpdate: string | null
  showUpdateConsultationServiceForm: boolean 
  consultationServiceIdForDelete: string | null
  showDeleteConsultationServiceForm: boolean

  openUpdateConsultationServiceFormModal: (consultationServiceId: string) => void
  closeUpdateConsultationServiceFormModal: () => void
  openDeleteConsultationServiceFormModal: (consultationServiceId: string) => void
  closeDeleteConsultationServiceFormModal: () => void
}

const useModalsStore = create<ModalsState>((set) => ({
  // Medic state
  medicIdForUpdate: null,
  showUpdateMedicForm: false,
  medicIdForDelete: null,
  showDeleteMedicForm: false,

  // Specialty state  
  specialtyIdForUpdate: null,
  showUpdateSpecialtyForm: false,
  specialtyIdForDelete: null,
  showDeleteSpecialtyForm: false,

  // Patient state
  patientIdForUpdate: null,
  showUpdatePatientForm: false,
  patientIdForDelete: null,
  showDeletePatientForm: false,

  // ConsultationService state
  consultationServiceIdForUpdate: null,
  showUpdateConsultationServiceForm: false,
  consultationServiceIdForDelete: null,
  showDeleteConsultationServiceForm: false,

  // Medic actions
  openUpdateMedicFormModal: (medicId) =>
    set({
      showUpdateMedicForm: true,
      medicIdForUpdate: medicId,
    }),

  closeUpdateMedicFormModal: () =>
    set({
      showUpdateMedicForm: false,
      medicIdForUpdate: null,
    }),

  openDeleteMedicFormModal: (medicId) =>
    set({
      showDeleteMedicForm: true,
      medicIdForDelete: medicId,
    }),

  closeDeleteMedicFormModal: () =>
    set({
      showDeleteMedicForm: false,
      medicIdForDelete: null,
    }),

  // Specialty actions
  openUpdateSpecialtyFormModal: (specialtyId) =>
    set({
      showUpdateSpecialtyForm: true,
      specialtyIdForUpdate: specialtyId,
    }),

  closeUpdateSpecialtyFormModal: () =>
    set({
      showUpdateSpecialtyForm: false,
      specialtyIdForUpdate: null,
    }),

  openDeleteSpecialtyFormModal: (specialtyId) =>
    set({
      showDeleteSpecialtyForm: true,
      specialtyIdForDelete: specialtyId,
    }),

  closeDeleteSpecialtyFormModal: () =>
    set({
      showDeleteSpecialtyForm: false,
      specialtyIdForDelete: null,
    }),

  // Patient actions
  openUpdatePatientFormModal: (patientId) =>
    set({
      showUpdatePatientForm: true,
      patientIdForUpdate: patientId,
    }),

  closeUpdatePatientFormModal: () =>
    set({
      showUpdatePatientForm: false,
      patientIdForUpdate: null,
    }),

  openDeletePatientFormModal: (patientId) =>
    set({
      showDeletePatientForm: true,
      patientIdForDelete: patientId,
    }),

  closeDeletePatientFormModal: () =>
    set({
      showDeletePatientForm: false,
      patientIdForDelete: null,
    }),

  // ConsultationService actions
  openUpdateConsultationServiceFormModal: (consultationServiceId) =>
    set({
      showUpdateConsultationServiceForm: true,
      consultationServiceIdForUpdate: consultationServiceId,
    }),

  closeUpdateConsultationServiceFormModal: () =>
    set({
      showUpdateConsultationServiceForm: false,
      consultationServiceIdForUpdate: null,
    }),

  openDeleteConsultationServiceFormModal: (consultationServiceId) =>
    set({
      showDeleteConsultationServiceForm: true,
      consultationServiceIdForDelete: consultationServiceId,
    }),

  closeDeleteConsultationServiceFormModal: () =>
    set({
      showDeleteConsultationServiceForm: false,
      consultationServiceIdForDelete: null,
    }),
}))

export default useModalsStore