import { SpeciesService } from './species.service';
import { SwapiAdapter } from '../adapters/swapi.adapter';

jest.mock('../adapters/swapi.adapter');

describe('SpeciesService', () => {
  let speciesService: SpeciesService;
  let mockSwapiAdapter: jest.Mocked<SwapiAdapter>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSwapiAdapter = new SwapiAdapter() as jest.Mocked<SwapiAdapter>;
    speciesService = new SpeciesService(mockSwapiAdapter);
  });

  describe('getSpeciesById', () => {
    it('should return species with homeworld data when homeworld exists', async () => {
      const mockSpecies = {
        name: 'Human',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '180',
        skin_colors: 'caucasian, black, asian, hispanic',
        hair_colors: 'blonde, brown, black, red',
        eye_colors: 'brown, blue, green, hazel, grey, amber',
        average_lifespan: '120',
        homeworld: 'https://swapi.dev/api/planets/1/',
        language: 'Galactic Basic',
        people: ['https://swapi.dev/api/people/1/'],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-10T13:52:11.567000Z',
        edited: '2014-12-20T21:36:42.136000Z',
        url: 'https://swapi.dev/api/species/1/'
      };

      const mockPlanet = {
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

      mockSwapiAdapter.getSpecies.mockResolvedValue(mockSpecies);
      mockSwapiAdapter.getPlanet.mockResolvedValue(mockPlanet);

      const result = await speciesService.getSpeciesById('1');

      expect(mockSwapiAdapter.getSpecies).toHaveBeenCalledWith('1');
      expect(mockSwapiAdapter.getPlanet).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        name: 'Human',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '180',
        skin_colors: 'caucasian, black, asian, hispanic',
        hair_colors: 'blonde, brown, black, red',
        eye_colors: 'brown, blue, green, hazel, grey, amber',
        average_lifespan: '120',
        homeworld: {
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
          url: 'https://swapi.dev/api/planets/1/',
        },
        language: 'Galactic Basic',
        people: ['https://swapi.dev/api/people/1/'],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-10T13:52:11.567000Z',
        edited: '2014-12-20T21:36:42.136000Z',
        url: 'https://swapi.dev/api/species/1/'
      });
    });

    it('should return species with null homeworld when homeworld does not exist', async () => {
      const mockSpecies = {
        name: 'Droid',
        classification: 'artificial',
        designation: 'sentient',
        average_height: 'n/a',
        skin_colors: 'n/a',
        hair_colors: 'n/a',
        eye_colors: 'n/a',
        average_lifespan: 'indefinite',
        homeworld: null,
        language: 'n/a',
        people: ['https://swapi.dev/api/people/2/'],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-10T15:16:16.259000Z',
        edited: '2014-12-20T21:36:42.139000Z',
        url: 'https://swapi.dev/api/species/2/'
      };

      mockSwapiAdapter.getSpecies.mockResolvedValue(mockSpecies);

      const result = await speciesService.getSpeciesById('2');

      expect(mockSwapiAdapter.getSpecies).toHaveBeenCalledWith('2');
      expect(mockSwapiAdapter.getPlanet).not.toHaveBeenCalled();
      expect(result).toEqual({
        name: 'Droid',
        classification: 'artificial',
        designation: 'sentient',
        average_height: 'n/a',
        skin_colors: 'n/a',
        hair_colors: 'n/a',
        eye_colors: 'n/a',
        average_lifespan: 'indefinite',
        homeworld: null,
        language: 'n/a',
        people: ['https://swapi.dev/api/people/2/'],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-10T15:16:16.259000Z',
        edited: '2014-12-20T21:36:42.139000Z',
        url: 'https://swapi.dev/api/species/2/'
      });
    });
  });
});
