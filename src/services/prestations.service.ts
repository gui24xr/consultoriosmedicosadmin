import {
  PrestationDTO,
  PrestationCreateDTO,
  PrestationUpdateBasicDataDTO,
} from "@/types";
import { PrestationType } from "@/repositories/prestations.repository";
import { prestationsRepository } from "@/repositories";
import { unstable_cache } from "next/cache";

function getPrestationDTO(prestation: PrestationType): PrestationDTO {
  return {
    id: prestation.id,
    inService: prestation.inService,
    label: prestation.label,
    code: prestation.code,
    description: prestation.description || null,
    specialty: {
      id: prestation.specialty.id,
      name: prestation.specialty.name,
    },
    provider: {
      id: prestation.provider.id,
      completeName:
        prestation.provider.firstName + " " + prestation.provider.lastName,
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

  async updatePrestation(
    id: string,
    data: PrestationUpdateBasicDataDTO
  ): Promise<PrestationDTO> {
    const prestation = await prestationsRepository.updatePrestation(id, data);
    return getPrestationDTO(prestation);
  }

  async changePrestationInServiceStatus(
    id: string,
    inService: boolean
  ): Promise<PrestationDTO> {
    const newData = { inService };
    const prestation = await prestationsRepository.updatePrestation(
      id,
      newData
    );
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
