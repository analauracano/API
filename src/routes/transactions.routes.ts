import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";

// Criação de transações
const transactionRoutes = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: createTransaction,
    });
};

// Buscar transações com filtro

export default transactionRoutes;