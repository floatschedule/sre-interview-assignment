import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { SwapiAdapter } from '../../adapters/swapi.adapter';
import { SpeciesService } from '../../services/species.service';
import { PlanetRepository } from '../../repositories/planet.repository';
import { PlanetService } from '../../services/planet.service';

const speciesRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const swapiAdapter = new SwapiAdapter();
  const planetRepository = new PlanetRepository();
  const planetService = new PlanetService(swapiAdapter, planetRepository);
  const speciesService = new SpeciesService(swapiAdapter, planetService);

  fastify.get('/species', async (request, reply) => {
    const { sort, order } = request.query as { sort?: string; order?: 'asc' | 'desc' };
    const species = await speciesService.getAllSpecies(sort, order || 'asc');
    return { species };
  });

  fastify.get('/species/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const species = await speciesService.getSpeciesById(id);
    return { species };
  });
};

export default speciesRoutes;