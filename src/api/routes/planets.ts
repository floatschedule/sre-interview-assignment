import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { SwapiAdapter } from '../../adapters/swapi.adapter';
import { PlanetService } from '../../services/planet.service';
import { PlanetRepository } from '../../repositories/planet.repository';

const planetRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const swapiAdapter = new SwapiAdapter();
  const planetRepository = new PlanetRepository();
  const planetService = new PlanetService(swapiAdapter, planetRepository);

  fastify.put('/planets/:id/destruction', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { destroyed } = request.body as { destroyed: boolean };

    if (typeof destroyed !== 'boolean') {
      reply.code(400);
      return { error: 'The "destroyed" field must be a boolean value' };
    }

    const planet = await planetService.upsertPlanetDestructionStatus(id, destroyed);
    return { planet };
  });
};

export default planetRoutes;