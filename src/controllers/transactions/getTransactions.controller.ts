import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetTransactionsQuery } from "../../schemas/transaction.schema";
import type { TransactionFilter } from "../../types/transaction.types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import prisma from "../../config/prisma";


export const getTransactions = async(
    request: FastifyRequest<{Querystring: GetTransactionsQuery}>, 
    reply: FastifyReply
): Promise<void> => {
    const userId = 'ANALAURA'

    if(!userId) {
       reply.status(401).send({ error: 'Usuário não autenticado' });
       return;        
    }

    const {month, year, type, categoryId} = request.query;

    const filters: TransactionFilter = { userId };

    if(month && year) {
        const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate();
        const endDate = dayjs.utc(startDate).endOf('month').toDate();
        filters.date = {
            gte: startDate,
            lte: endDate,
        };
    }

    if(type){
        filters.type = type;
    }

    if(categoryId){
        filters.categoryId = categoryId;
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: filters,
            orderBy: { date: 'desc' },
            include: {
                category:{
                    select: {
                        name: true,
                        type: true,
                        color: true,
                    },
                },
            },
        });

        reply.send(transactions);
    } catch (err) {
        request.log.error('Erro ao buscar transações', err);
        reply.status(500).send({ error: 'Erro interno do servidor ao buscar transações' });
    }
}