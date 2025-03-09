import { SwapiAdapter } from '../adapters/swapi.adapter';
import { Species, Planet } from '../types/entities.types';
export class SpeciesService {
  private swapiAdapter: SwapiAdapter;

  constructor(swapiAdapter: SwapiAdapter) {
    this.swapiAdapter = swapiAdapter;
  }

  async getSpeciesById(id: string): Promise<Species> {
    const speciesData = await this.swapiAdapter.getSpecies(id);

    if(!speciesData.homeworld) {
      return {
        name: speciesData.name,
        classification: speciesData.classification,
        designation: speciesData.designation,
        average_height: speciesData.average_height,
        skin_colors: speciesData.skin_colors,
        hair_colors: speciesData.hair_colors,
        eye_colors: speciesData.eye_colors,
        average_lifespan: speciesData.average_lifespan,
        homeworld: null,
        language: speciesData.language,
        people: speciesData.people,
        films: speciesData.films,
        created: speciesData.created,
        edited: speciesData.edited,
        url: speciesData.url
      };
    }

    const planetId = this.extractIdFromUrl(speciesData.homeworld);
    const planetData = await this.swapiAdapter.getPlanet(planetId);

    return {
      name: speciesData.name,
      classification: speciesData.classification,
      designation: speciesData.designation,
      average_height: speciesData.average_height,
      skin_colors: speciesData.skin_colors,
      hair_colors: speciesData.hair_colors,
      eye_colors: speciesData.eye_colors,
      average_lifespan: speciesData.average_lifespan,
      homeworld: planetData,
      language: speciesData.language,
      people: speciesData.people,
      films: speciesData.films,
      created: speciesData.created,
      edited: speciesData.edited,
      url: speciesData.url
    };
  }

  private extractIdFromUrl(url: string): string {
    // Remove trailing slash if present
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    // Get the last part of the URL which should be the ID
    return cleanUrl.split('/').pop() || '';
  }
}
