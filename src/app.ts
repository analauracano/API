import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import routes from './routes';

const app = Fastify()

app.register(routes)

export default app;