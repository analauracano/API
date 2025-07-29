import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
} from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { deleteTransation } from "../controllers/transactions/deleteTransation.controller";

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
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: {
        type: "object",
        properties: {
          month: { type: "string" },
          year: { type: "string" },
      },
      required: ['month', 'year'],
      },
    },
    handler: getTransactions,
  });
  console.log('Query recebida: request.query');

  // Buscar o resumo de transações
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  // Deletar transação

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema)
    },
    handler: deleteTransation
  })
};

export default transactionRoutes;
