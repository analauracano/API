import type { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";
import dayjs from 'dayjs';
import z from "zod";

const createTransaction = async(request: FastifyRequest<{ Body: z.infer<typeof createTransactionSchema> }>, reply: FastifyReply): Promise<void> => {
    const userId = 'ANALAURA'; // Substitua por lógica de autenticação real

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado" });
        return;
    }

    const result = createTransactionSchema.safeParse(request.body);

    if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "Validação inválida";
        reply.status(400).send({ error: errorMessage });
        return;
    }

    const transaction = result.data;

    try {
        const category = await prisma.category.findFirst({
            where: {
                id: transaction.categoryId,
                type: transaction.type,
            },
        });

        if (!category) {
            reply.status(400).send({ error: "Categoria inválida" });
            return;
        }

        const parseDate = dayjs(transaction.date).toDate();
        const newTransaction = await prisma.transaction.create({
            data: {
                ...transaction,
                date: parseDate,
                userId,
            },
        });

        reply.status(201).send(newTransaction);
    } catch (error) {
        console.error('Erro ao criar transação:', error); // Log do erro
        reply.status(500).send({ error: "Erro interno do servidor" });
    }
};

export default createTransaction;