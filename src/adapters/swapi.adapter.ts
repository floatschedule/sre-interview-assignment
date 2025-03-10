import { SwapiSpecies, SwapiPlanet, SwapiPaginatedResponse } from '../types/swapi.types';

export class SwapiAdapter {
  private baseUrl: string;

  constructor(baseUrl = 'https://swapi.dev/api') {
    this.baseUrl = baseUrl;
  }

  async getSpecies(id: string): Promise<SwapiSpecies> {
    const response = await fetch(`${this.baseUrl}/species/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Species with ID ${id} not found`);
      }
      throw new Error(`Error fetching species: ${response.statusText}`);
    }

    return await response.json() as SwapiSpecies;
  }

  async getSpeciesPage(page: number = 1): Promise<SwapiPaginatedResponse<SwapiSpecies>> {
    const response = await fetch(`${this.baseUrl}/species/?page=${page}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Species page ${page} not found`);
      }
      throw new Error(`Error fetching species page: ${response.statusText}`);
    }

    return await response.json() as SwapiPaginatedResponse<SwapiSpecies>;
  }

  async getPlanet(id: string): Promise<SwapiPlanet> {
    const response = await fetch(`${this.baseUrl}/planets/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Planet with ID ${id} not found`);
      }
      throw new Error(`Error fetching planet: ${response.statusText}`);
    }

    return await response.json() as SwapiPlanet;
  }
}