import { z } from 'zod';
import { ObjectId} from 'mongodb';
import { TransactionType } from '@prisma/client';

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id)

export const createTransactionSchema = z.object({
    description: z.string().min(1, "Descrição é obrigatória"),
    amount: z.number().positive("Valor deve ser positivo"),
    date: z.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida"
    }),
    categoryId: z.string().refine(isValidObjectId, {
        message: "Categoria inválida",
    }),
    type: z.enum([TransactionType.expense, TransactionType.income], {
        message: "Tipo de transação inválido",
    }),
});

export const getTransactionsSchema = z.object({
    month: z.string().optional(),
    year: z.string().optional(),
    type: z.enum([TransactionType.expense, TransactionType.income], {
        message: "Tipo de transação inválido",
    }).optional(),
    categoryId: z.string().refine(isValidObjectId, {
        message: "Categoria inválida",
    }).optional(),
});

export const getTransactionsSummarySchema = z.object({
    month: z.string({message: "Mês é obrigatório"}),
    year: z.string({message: "Ano é obrigatório"}),
})

export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>;
export type getTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>;