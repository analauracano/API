import type { FastifyInstance } from 'fastify';

async function routes(fastify: FastifyInstance) {
    fastify.get('/health', async() => {
        return {
            status: 'ok',
            message: 'API is running'
        }
    })
}

export default routes;