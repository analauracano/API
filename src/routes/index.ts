import type { FastifyInstance } from 'fastify';
import categoryRoutes from './category.routes';
import transactionRoutes from './transactions.routes';

async function routes(fastify: FastifyInstance): Promise<void>{
    fastify.get('/health', async() => {
        return {
            status: 'ok',
            message: 'API rodando normalmente'
        };
    });

    fastify.register(categoryRoutes, { prefrix: '/categories' });
    fastify.register(transactionRoutes, { prefix: '/transactions' });
}

export default routes;