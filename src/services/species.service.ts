import { SwapiAdapter } from '../adapters/swapi.adapter';
import { Species, Planet } from '../types/entities.types';
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
  private extractIdFromUrl(url: string): string {
    // Remove trailing slash if present
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    // Get the last part of the URL which should be the ID
    return cleanUrl.split('/').pop() || '';
  }
}
