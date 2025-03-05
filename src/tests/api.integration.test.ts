import { build } from '../server';

const server = build();

describe('general API behaviour', () => {
  describe('invalid route called', () => {
    it('response should return a 404 status code', async () => {
      const response = await server.inject().get('/foo');

      expect(response.statusCode).toBe(404);
    });
  });
});

afterAll(async () => {
  await server.close();
});