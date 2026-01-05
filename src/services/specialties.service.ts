import {
  SpecialtyCreateDTO,
  SpecialtyDTO,
  SpecialtyUpdateDTO,
  SpecialtyOptionDTO
} from "@/types";
import { SpecialtyType } from "@/repositories/specialties.repository";
import { specialtiesRepository } from "@/repositories";
import { unstable_cache } from "next/cache";

function getSpecialtyDTO(specialty: SpecialtyType): SpecialtyDTO {
  return {
    id: specialty.id,
    identifier: specialty.identifier,
    displayName: specialty.displayName,
    code: specialty.code,
    updatedAt: specialty.updatedAt,
    prestationsData: specialty.prestations.map((prestation) => ({
      id: prestation.id,
      displayName: prestation.displayName || (specialty.displayName + " - " + specialty.displayName),
      code: prestation.code,
    })),
    providersData: specialty.providers.map((provider) => ({
      id: provider.id,
      displayName: provider.displayName,
      completeName: provider.memberData?.lastName + " " + provider.memberData?.firstName,
    })),
   
   
  };
}
class SpecialtiesService {
  private normalizeSpecialtyIdentifier(identifier: string): string {
    return identifier.toUpperCase().trim();
  }

  async createSpecialty(data: SpecialtyCreateDTO): Promise<SpecialtyDTO> {
    const newSpecialtyData = {
      identifier: this.normalizeSpecialtyIdentifier(data.identifier),
      displayName: data.displayName,
    };
   
    const specialty = await specialtiesRepository.createSpecialty(
      newSpecialtyData,
    );
    return getSpecialtyDTO(specialty);
  }

  async getSpecialties(): Promise<SpecialtyDTO[]> {
    const getSpecialtiesFromDB = async () => {
      const specialties = await specialtiesRepository.getSpecialties();
      return specialties.map((specialty) => getSpecialtyDTO(specialty));
    };
    const cachedSpecialties = unstable_cache(
      getSpecialtiesFromDB,
      ["all-specialties"],
      { tags: ["specialties"], revalidate: 3600 }
    );
    return await cachedSpecialties();
  }

  async getSpecialtyById(id: string): Promise<SpecialtyDTO> {
    const getSpecialtyFromDB = async () => {
      const specialty = await specialtiesRepository.getSpecialty(id);
      return getSpecialtyDTO(specialty);
    };

    const cachedSpecialty = unstable_cache(
      getSpecialtyFromDB,
      ["specialty", id],
      { tags: ["specialties"], revalidate: 3600 }
    );
    return await cachedSpecialty();
  }

  async updateSpecialty(
    id: string,
    data: SpecialtyUpdateDTO
  ): Promise<SpecialtyDTO> {
    const updateSpecialtyData = { ...data };
    if (data.identifier)
      updateSpecialtyData.identifier = this.normalizeSpecialtyIdentifier(data.identifier);
    const updatedSpecialty = await specialtiesRepository.updateSpecialty(
      id,
      updateSpecialtyData
    );
    return getSpecialtyDTO(updatedSpecialty);
  }

  async deleteSpecialty(id: string): Promise<SpecialtyDTO> {
    const deletedSpecialty = await specialtiesRepository.deleteSpecialty(id);
    return getSpecialtyDTO(deletedSpecialty);
  }

  async hardDeleteSpecialty(id: string): Promise<SpecialtyDTO> {
    const deletedSpecialty = await specialtiesRepository.hardDeleteSpecialty(
      id
    );
    return getSpecialtyDTO(deletedSpecialty);
  }

  async restoreSpecialty(id: string): Promise<SpecialtyDTO> {
    const restoredSpecialty = await specialtiesRepository.restoreSpecialty(id);
    return getSpecialtyDTO(restoredSpecialty);
  }

  async getSpecialtiesOptions(): Promise<SpecialtyOptionDTO[]> {
    const specialties = await this.getSpecialties(); 
    return specialties.map(specialty => ({ 
        id: specialty.id, 
        displayName: specialty.displayName 
    }));
}
}

const specialtiesService = new SpecialtiesService();
export default specialtiesService;
