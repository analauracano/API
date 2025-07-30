import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";

const transactionRoutes = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: {
                type: 'object',
                required: ['description', 'amount', 'categoryId', 'date', 'type'],
                properties: {
                    description: { type: 'string' },
                    amount: { type: 'number' },
                    categoryId: { type: 'string' },
                    date: { type: 'string', format: 'date-time' },
                    type: { type: 'string', enum: ['expense', 'income'] },
                },
            },
        },
        handler: createTransaction,
    });
};

export default transactionRoutes;