import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  createTransactionSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
} from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";

const transactionRoutes = async (fastify: FastifyInstance) => {
  // Criar transação
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  // Buscar transações com filtro
  const getTransactionsJsonSchema = zodToJsonSchema(getTransactionsSchema) as any;
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: {
        type: "object",
        properties: getTransactionsJsonSchema.properties,
        required: [], // ou ['month', 'year'] se quiser obrigatórios
      },
    },
    handler: getTransactions,
  });

  // Buscar o resumo de transações
  const getSummaryJsonSchema = zodToJsonSchema(getTransactionsSummarySchema) as any;
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: {
        type: "object",
        properties: getSummaryJsonSchema.properties,
        required: ["month", "year"],
      },
    },
    handler: getTransactionsSummary,
  });
};

export default transactionRoutes;
