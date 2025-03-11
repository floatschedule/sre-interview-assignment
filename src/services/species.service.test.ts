import { SpeciesService } from './species.service';
import { SwapiAdapter } from '../adapters/swapi.adapter';
import { SwapiPaginatedResponse } from '../types/swapi.types';

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

  describe('getSpeciesPage', () => {
    it('should return a page of species with homeworld data', async () => {
      const mockSpecies1 = {
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

      const mockSpecies2 = {
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

      const mockPaginatedResponse: SwapiPaginatedResponse<any> = {
        count: 2,
        next: null,
        previous: null,
        results: [mockSpecies1, mockSpecies2]
      };

      mockSwapiAdapter.getSpeciesPage.mockResolvedValue(mockPaginatedResponse);
      mockSwapiAdapter.getPlanet.mockResolvedValue(mockPlanet);

      const result = await speciesService.getSpeciesPage();

      expect(mockSwapiAdapter.getSpeciesPage).toHaveBeenCalledWith(1);
      expect(mockSwapiAdapter.getPlanet).toHaveBeenCalledWith('1');
      expect(mockSwapiAdapter.getPlanet).toHaveBeenCalledTimes(1);

      expect(result.count).toBe(2);
      expect(result.next).toBeNull();
      expect(result.previous).toBeNull();
      expect(result.results).toHaveLength(2);

      expect(result.results[0]).toEqual({
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

      expect(result.results[1]).toEqual({
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

  describe('getAllSpecies', () => {
    it('should return all species with homeworld data', async () => {
      const mockSpeciesData = [
        {
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
          people: [],
          films: [],
          created: '',
          edited: '',
          url: ''
        },
        {
          name: 'Droid',
          classification: 'artificial',
          designation: 'sentient',
          average_height: 'n/a',
          homeworld: null,
          language: 'n/a',
          skin_colors: '',
          hair_colors: '',
          eye_colors: '',
          average_lifespan: '',
          people: [],
          films: [],
          created: '',
          edited: '',
          url: ''
        }
      ];

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
        residents: [],
        films: [],
        created: '',
        edited: '',
        url: ''
      };

      mockSwapiAdapter.getAllSpecies.mockResolvedValue(mockSpeciesData);
      mockSwapiAdapter.getPlanet.mockResolvedValue(mockPlanet);

      const result = await speciesService.getAllSpecies();

      expect(mockSwapiAdapter.getAllSpecies).toHaveBeenCalled();
      expect(mockSwapiAdapter.getPlanet).toHaveBeenCalledWith('1');
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Human');
      expect(result[0].homeworld).toEqual(expect.objectContaining({
        name: 'Tatooine'
      }));
      expect(result[1].name).toBe('Droid');
      expect(result[1].homeworld).toBeNull();
    });

    it('should sort species by average_height when sort parameter is provided', async () => {
      const mockSpeciesData = [
        {
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
          people: [],
          films: [],
          created: '',
          edited: '',
          url: ''
        },
        {
          name: 'Wookie',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '210',
          skin_colors: 'gray',
          hair_colors: 'black, brown',
          eye_colors: 'blue, green',
          average_lifespan: '400',
          homeworld: 'https://swapi.dev/api/planets/2/',
          language: 'Shyriiwook',
          people: [],
          films: [],
          created: '',
          edited: '',
          url: ''
        }
      ];

      const mockPlanet1 = {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        residents: [],
        films: [],
        created: '',
        edited: '',
        url: ''
      };

      const mockPlanet2 = {
        name: 'Kashyyyk',
        rotation_period: '26',
        orbital_period: '381',
        diameter: '12765',
        climate: 'tropical',
        gravity: '1 standard',
        terrain: 'jungle, forests, lakes, rivers',
        surface_water: '60',
        population: '45000000',
        residents: [],
        films: [],
        created: '',
        edited: '',
        url: ''
      };

      mockSwapiAdapter.getAllSpecies.mockResolvedValue(mockSpeciesData);
      mockSwapiAdapter.getPlanet.mockImplementation((id) => {
        if (id === '1') return Promise.resolve(mockPlanet1);
        if (id === '2') return Promise.resolve(mockPlanet2);
        return Promise.reject(new Error('Planet not found'));
      });

      const resultAsc = await speciesService.getAllSpecies('average_height', 'asc');
      expect(resultAsc[0].name).toBe('Human');
      expect(resultAsc[1].name).toBe('Wookie');

      const resultAscDefault = await speciesService.getAllSpecies('average_height');
      expect(resultAscDefault[0].name).toBe('Human');
      expect(resultAscDefault[1].name).toBe('Wookie');

      const resultDesc = await speciesService.getAllSpecies('average_height', 'desc');
      expect(resultDesc[0].name).toBe('Wookie');
      expect(resultDesc[1].name).toBe('Human');
    });
  });

  describe('sortSpeciesByAverageHeight', () => {
    it('should sort species by average height in ascending order', () => {
      const mockSpecies = [
        {
          name: 'Human',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '180',
          skin_colors: 'caucasian, black, asian, hispanic',
          hair_colors: 'blonde, brown, black, red',
          eye_colors: 'brown, blue, green, hazel, grey, amber',
          average_lifespan: '120',
          homeworld: null,
          language: 'Galactic Basic',
          people: ['https://swapi.dev/api/people/1/'],
          films: ['https://swapi.dev/api/films/1/'],
          created: '2014-12-10T13:52:11.567000Z',
          edited: '2014-12-20T21:36:42.136000Z',
          url: 'https://swapi.dev/api/species/1/'
        },
        {
          name: 'Wookie',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '210',
          skin_colors: 'gray',
          hair_colors: 'black, brown',
          eye_colors: 'blue, green',
          average_lifespan: '400',
          homeworld: null,
          language: 'Shyriiwook',
          people: ['https://swapi.dev/api/people/13/'],
          films: ['https://swapi.dev/api/films/1/'],
          created: '2014-12-10T16:44:31.486000Z',
          edited: '2014-12-20T21:36:42.142000Z',
          url: 'https://swapi.dev/api/species/3/'
        },
        {
          name: 'Ewok',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '100',
          skin_colors: 'brown',
          hair_colors: 'white, brown, black',
          eye_colors: 'orange, brown',
          average_lifespan: 'unknown',
          homeworld: null,
          language: 'Ewokese',
          people: [],
          films: ['https://swapi.dev/api/films/3/'],
          created: '2014-12-18T11:22:00.285000Z',
          edited: '2014-12-20T21:36:42.155000Z',
          url: 'https://swapi.dev/api/species/9/'
        }
      ];

      const result = speciesService.sortSpeciesByAverageHeight(mockSpecies, 'asc');

      expect(result[0].name).toBe('Ewok');
      expect(result[1].name).toBe('Human');
      expect(result[2].name).toBe('Wookie');
    });

    it('should sort species by average height in descending order', () => {
      const mockSpecies = [
        {
          name: 'Human',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '180',
          skin_colors: 'caucasian, black, asian, hispanic',
          hair_colors: 'blonde, brown, black, red',
          eye_colors: 'brown, blue, green, hazel, grey, amber',
          average_lifespan: '120',
          homeworld: null,
          language: 'Galactic Basic',
          people: ['https://swapi.dev/api/people/1/'],
          films: ['https://swapi.dev/api/films/1/'],
          created: '2014-12-10T13:52:11.567000Z',
          edited: '2014-12-20T21:36:42.136000Z',
          url: 'https://swapi.dev/api/species/1/'
        },
        {
          name: 'Wookie',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '210',
          skin_colors: 'gray',
          hair_colors: 'black, brown',
          eye_colors: 'blue, green',
          average_lifespan: '400',
          homeworld: null,
          language: 'Shyriiwook',
          people: ['https://swapi.dev/api/people/13/'],
          films: ['https://swapi.dev/api/films/1/'],
          created: '2014-12-10T16:44:31.486000Z',
          edited: '2014-12-20T21:36:42.142000Z',
          url: 'https://swapi.dev/api/species/3/'
        },
        {
          name: 'Ewok',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '100',
          skin_colors: 'brown',
          hair_colors: 'white, brown, black',
          eye_colors: 'orange, brown',
          average_lifespan: 'unknown',
          homeworld: null,
          language: 'Ewokese',
          people: [],
          films: ['https://swapi.dev/api/films/3/'],
          created: '2014-12-18T11:22:00.285000Z',
          edited: '2014-12-20T21:36:42.155000Z',
          url: 'https://swapi.dev/api/species/9/'
        }
      ];

      const result = speciesService.sortSpeciesByAverageHeight(mockSpecies, 'desc');

      expect(result[0].name).toBe('Wookie');
      expect(result[1].name).toBe('Human');
      expect(result[2].name).toBe('Ewok');
    });

    it('should handle non-numeric height values by placing them at the end of the sort regardless of sort order', () => {
      const mockSpecies = [
        {
          name: 'Human',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '180',
          skin_colors: 'caucasian, black, asian, hispanic',
          hair_colors: 'blonde, brown, black, red',
          eye_colors: 'brown, blue, green, hazel, grey, amber',
          average_lifespan: '120',
          homeworld: null,
          language: 'Galactic Basic',
          people: ['https://swapi.dev/api/people/1/'],
          films: ['https://swapi.dev/api/films/1/'],
          created: '2014-12-10T13:52:11.567000Z',
          edited: '2014-12-20T21:36:42.136000Z',
          url: 'https://swapi.dev/api/species/1/'
        },
        {
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
        },
        {
          name: 'Ewok',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '100',
          skin_colors: 'brown',
          hair_colors: 'white, brown, black',
          eye_colors: 'orange, brown',
          average_lifespan: 'unknown',
          homeworld: null,
          language: 'Ewokese',
          people: [],
          films: ['https://swapi.dev/api/films/3/'],
          created: '2014-12-18T11:22:00.285000Z',
          edited: '2014-12-20T21:36:42.155000Z',
          url: 'https://swapi.dev/api/species/9/'
        }
      ];

      const resultDesc = speciesService.sortSpeciesByAverageHeight(mockSpecies, 'desc');

      expect(resultDesc[0].name).toBe('Human');
      expect(resultDesc[1].name).toBe('Ewok');
      expect(resultDesc[2].name).toBe('Droid');

      const resultAsc = speciesService.sortSpeciesByAverageHeight(mockSpecies, 'asc');

      expect(resultAsc[0].name).toBe('Ewok');
      expect(resultAsc[1].name).toBe('Human');
      expect(resultAsc[2].name).toBe('Droid');
    });
  });
});
