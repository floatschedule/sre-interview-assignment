// src/adapters/swapi.adapter.test.ts
import { SwapiAdapter } from './swapi.adapter';
import { SwapiSpecies, SwapiPlanet } from '../types/swapi.types';

// Mock global fetch
global.fetch = jest.fn();

describe('SwapiAdapter', () => {
  let swapiAdapter: SwapiAdapter;

  beforeEach(() => {
    jest.clearAllMocks();
    swapiAdapter = new SwapiAdapter();
  });

  describe('getSpecies', () => {
    test('should fetch species data successfully', async () => {
      const mockSpecies: SwapiSpecies = {
        name: 'Human',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '180',
        skin_colors: 'caucasian, black, asian, hispanic',
        hair_colors: 'blonde, brown, black, red',
        eye_colors: 'brown, blue, green, hazel, grey, amber',
        average_lifespan: '120',
        homeworld: 'https://swapi.dev/api/planets/9/',
        language: 'Galactic Basic',
        people: ['https://swapi.dev/api/people/1/'],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-10T13:52:11.567000Z',
        edited: '2014-12-20T21:36:42.136000Z',
        url: 'https://swapi.dev/api/species/1/'
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSpecies)
      });

      const result = await swapiAdapter.getSpecies('1');

      expect(result).toEqual(mockSpecies);
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/species/1');
    });

    test('should throw error when species not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      const resultPromise = swapiAdapter.getSpecies('999');

      await expect(resultPromise).rejects.toThrow(/^Species with ID 999 not found$/);
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/species/999');
    });

    test('should throw error for server errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const resultPromise = swapiAdapter.getSpecies('1');

      await expect(resultPromise).rejects.toThrow(/^Error fetching species: Internal Server Error$/);
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/species/1');
    });

    test('should throw error when network fails', async () => {
      const networkError = new Error('Failed to fetch');
      (global.fetch as jest.Mock).mockRejectedValue(networkError);

      const resultPromise = swapiAdapter.getSpecies('1');

      await expect(resultPromise).rejects.toThrow(/^Failed to fetch$/);
    });
  });

  describe('getPlanet', () => {
    test('should fetch planet data successfully', async () => {
      const mockPlanet: SwapiPlanet = {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        residents: ['https://swapi.dev/api/people/1/'],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-09T13:50:49.641000Z',
        edited: '2014-12-20T20:58:18.411000Z',
        url: 'https://swapi.dev/api/planets/1/'
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPlanet)
      });

      const result = await swapiAdapter.getPlanet('1');

      expect(result).toEqual(mockPlanet);
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/1');
    });

    test('should throw error when planet not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      const resultPromise = swapiAdapter.getPlanet('999');

      await expect(resultPromise).rejects.toThrow(/^Planet with ID 999 not found$/);
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/999');
    });

    test('should throw error for server errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const resultPromise = swapiAdapter.getPlanet('1');

      await expect(resultPromise).rejects.toThrow(/^Error fetching planet: Internal Server Error$/);
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/1');
    });

    test('should throw error when network fails', async () => {
      const networkError = new Error('Failed to fetch');
      (global.fetch as jest.Mock).mockRejectedValue(networkError);

      const resultPromise = swapiAdapter.getPlanet('1');

      await expect(resultPromise).rejects.toThrow(/^Failed to fetch$/);
    });
  });
});