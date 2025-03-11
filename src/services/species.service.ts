import { SwapiAdapter } from '../adapters/swapi.adapter';
import { Species, Planet, PaginatedResponse } from '../types/entities.types';
import { mapToPlanet } from './mappers/mapToPlanet';
import { mapToSpecies } from './mappers/mapToSpecies';

export class SpeciesService {
  private swapiAdapter: SwapiAdapter;

  constructor(swapiAdapter: SwapiAdapter) {
    this.swapiAdapter = swapiAdapter;
  }

  async getSpeciesById(id: string): Promise<Species> {
    const speciesData = await this.swapiAdapter.getSpecies(id);

    if(!speciesData.homeworld) {
      return mapToSpecies(speciesData, null);
    }

    const planetId = this.extractIdFromUrl(speciesData.homeworld);
    const planetSwapiData = await this.swapiAdapter.getPlanet(planetId);
    const planetData = mapToPlanet(planetSwapiData);

    return mapToSpecies(speciesData, planetData);
  }

  async getSpeciesPage(page: number = 1): Promise<PaginatedResponse<Species>> {
    const response = await this.swapiAdapter.getSpeciesPage(page);

    const enhancedSpecies = await Promise.all(
      response.results.map(async (speciesData) => {
        if (!speciesData.homeworld) {
          return mapToSpecies(speciesData, null);
        }

        const planetId = this.extractIdFromUrl(speciesData.homeworld);
        const planetData = await this.swapiAdapter.getPlanet(planetId);
        const planet = mapToPlanet(planetData);

        return mapToSpecies(speciesData, planet);
      })
    );

    return {
      count: response.count,
      next: response.next,
      previous: response.previous,
      results: enhancedSpecies
    };
  }

   async getAllSpecies(): Promise<Species[]> {
    const allSpeciesData = await this.swapiAdapter.getAllSpecies();

    const enhancedSpecies = await Promise.all(
      allSpeciesData.map(async (speciesData) => {
        if (!speciesData.homeworld) {
          return mapToSpecies(speciesData, null);
        }

        const planetId = this.extractIdFromUrl(speciesData.homeworld);
        const planetData = await this.swapiAdapter.getPlanet(planetId);
        const planet = mapToPlanet(planetData);

        return mapToSpecies(speciesData, planet);
      })
    );

    return enhancedSpecies;
  }


  private extractIdFromUrl(url: string): string {
    // Remove trailing slash if present
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    // Get the last part of the URL which should be the ID
    return cleanUrl.split('/').pop() || '';
  }
}
