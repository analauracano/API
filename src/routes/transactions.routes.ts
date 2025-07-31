import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";

const transactionRoutes = async (fastify: FastifyInstance) => {
    // Criação de transações
    fastify.route({
        method: 'POST',
        url: '/',
        handler: createTransaction,
    });

    // Buscar transações com filtro
    fastify.route({
        method: 'GET',
        url: '/',
        handler: getTransactions
    });
};

export default transactionRoutes;