import type { FastifyInstance } from 'fastify';
import categoryRoutes from './category.routes';

async function routes(fastify: FastifyInstance): Promise<void>{
    fastify.get('/health', async() => {
        return {
            status: 'ok',
            message: 'API rodando normalmente'
        };
    });

    fastify.register(categoryRoutes, { prefrix: '/categories' });
}

export default routes;