import { z } from "zod";
import { ObjectId } from "mongodb";
import { TransactionType } from "@prisma/client";

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
    description: z.string().min(1, 'Descrição obrigatória'),
    amount: z.number().positive('Valor deve ser positivo'),
    date: z.coerce.date().refine(
        (val) => val instanceof Date && !isNaN(val.getTime()),
        { message: 'Data inválida' }
    ),
    categoryId: z.string().refine(isValidObjectId, {
        message: 'ID de categoria inválido',
    }),
    type: z.enum([TransactionType.expense, TransactionType.income], {
        message: 'Tipo de transação inválido'
    }),
});

export const getTransactionSchema = z.object({
    month: z.string().optional(),
    year: z.string().optional(),
    type: z.enum([TransactionType.expense, TransactionType.income], {
        message: 'Tipo de transação inválido'
    }).optional(),
    categoryId: z.string().refine(isValidObjectId, {
        message: 'ID de categoria inválido'}).optional(),
});

export type GetTransactionsQuery = z.infer<typeof getTransactionSchema>;