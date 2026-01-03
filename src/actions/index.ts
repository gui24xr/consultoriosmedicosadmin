import { createSpecialty, fetchSpecialties, updateSpecialty, deleteSpecialty } from "./specialties.actions";

import { 
  createProvider,
  fetchProviders,
  fetchProviderDetails,
  updateProvider,
  changeProviderInServiceStatus,
  deleteProvider } from "./providers.actions";

  import {
     createPrestation, 
    fetchPrestations,
    updatePrestations, 
    changePrestationInServiceStatus,
    deletePrestations 
  } from "./prestations.actions";
  

  export {
  createSpecialty,
  fetchSpecialties,
  updateSpecialty,
  deleteSpecialty,

  createProvider,
  fetchProviders,
  fetchProviderDetails,
  updateProvider,
  changeProviderInServiceStatus,
  deleteProvider,

 createPrestation, 
  fetchPrestations,
  updatePrestations, 
  changePrestationInServiceStatus,
  deletePrestations 
  }