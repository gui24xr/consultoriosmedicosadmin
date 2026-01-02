import {
  SpecialtyCreateDTO,
  SpecialtyDTO,
  SpecialtyUpdateDTO,
} from "@/types";
import { SpecialtyType } from "@/repositories/specialties.repository";
import { specialtiesRepository } from "@/repositories";
import { unstable_cache } from "next/cache";

function getSpecialtyDTO(specialty: SpecialtyType): SpecialtyDTO {
  return {
    id: specialty.id,
    name: specialty.name,
    code: specialty.code,
    updatedAt: specialty.updatedAt,
    prestations:
      specialty.prestations.map((prestation) => ({
        id: prestation.id,
        code: prestation.code,
        label: prestation.label,
      })) || [],
    providers:
      specialty.providers.map((provider) => ({
        id: provider.id,
        completeName: provider.firstName + " " + provider.lastName,
      })) || [],
  };
}
class SpecialtiesService {
  private normalizeSpecialtyName(name: string): string {
    return name.toLowerCase().trim();
  }

  async createSpecialty(data: SpecialtyCreateDTO): Promise<SpecialtyDTO> {
    const newSpecialtyData = {
      name: this.normalizeSpecialtyName(data.name),
    };
    const specialty = await specialtiesRepository.createSpecialty(
      newSpecialtyData
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
    if (data.name)
      updateSpecialtyData.name = this.normalizeSpecialtyName(data.name);
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
}

const specialtiesService = new SpecialtiesService();
export default specialtiesService;
