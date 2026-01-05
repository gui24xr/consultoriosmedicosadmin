import {
  PrestationDTO,
  PrestationCreateDTO,
  PrestationUpdateDTO,
  PrestationUpdateStatusDTO
} from "@/types";
import { PrestationType } from "@/repositories/prestations.repository";
import { prestationsRepository } from "@/repositories";
import { unstable_cache } from "next/cache";

function getPrestationDTO(prestation: PrestationType): PrestationDTO {
  return {
    id: prestation.id,
    code: prestation.code,
    identifier: prestation.identifier,
    displayName: prestation.displayName || (prestation.specialty.displayName + " - " + prestation.provider.displayName), 
    description: prestation.description || null,
    inService: prestation.inService,
    specialty: {
      id: prestation.specialty.id,
      code: prestation.specialty.code,
      identifier: prestation.specialty.identifier,
      displayName: prestation.specialty.displayName
    },
    providerData: {
      id: prestation.provider.id,
      displayName: prestation.provider.displayName,
      completeName: prestation.provider.memberData?.lastName + " " + prestation.provider.memberData?.firstName,
    },
  };
}

class PrestationsService {
  async createPrestation(data: PrestationCreateDTO): Promise<PrestationDTO> {
    const newPrestation = await prestationsRepository.createPrestation(data);
    return getPrestationDTO(newPrestation);
  }

  async getPrestations(): Promise<PrestationDTO[]> {
    const getPrestationsFromDB = async () => {
      const prestations = await prestationsRepository.getPrestations();
      return prestations.map((prestation) => getPrestationDTO(prestation));
    };
    const cachedPrestations = unstable_cache(
      getPrestationsFromDB,
      ["all-prestations"],
      { tags: ["prestations"], revalidate: 3600 }
    );
    return await cachedPrestations();
  }

  async getPrestationById(id: string): Promise<PrestationDTO> {
    const getPrestationFromDB = async () => {
      const prestation = await prestationsRepository.getPrestationById(id);
      return getPrestationDTO(prestation);
    };
    const cachedPrestation = unstable_cache(
      getPrestationFromDB,
      ["prestation", id],
      { tags: ["prestations"], revalidate: 3600 }
    );
    return await cachedPrestation();
  }

  async updatePrestation(id: string,data: PrestationUpdateDTO): Promise<PrestationDTO> {
    const prestation = await prestationsRepository.updatePrestation(id, data);
    return getPrestationDTO(prestation);
  }

  async changePrestationInServiceStatus(id: string,inService: boolean): Promise<PrestationDTO> {
    const prestation = await prestationsRepository.changePrestationInServiceStatus(id, inService);
    return getPrestationDTO(prestation);
  }

  async deletePrestation(id: string): Promise<PrestationDTO> {
    const prestation = await prestationsRepository.deletePrestation(id);
    return getPrestationDTO(prestation);
  }

  async hardDeletePrestation(id: string): Promise<PrestationDTO> {
    const prestation = await prestationsRepository.hardDeletePrestation(id);
    return getPrestationDTO(prestation);
  }

  async restorePrestation(id: string): Promise<PrestationDTO> {
    const prestation = await prestationsRepository.restorePrestation(id);
    return getPrestationDTO(prestation);
  }
}

const prestationsService = new PrestationsService();
export default prestationsService;
