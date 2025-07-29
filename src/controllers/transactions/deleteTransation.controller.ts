import type { FastifyReply, FastifyRequest } from "fastify";
import type { DeleteTransactionParams } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";


export const deleteTransation = async( request: FastifyRequest<{Params: DeleteTransactionParams}>, reply: FastifyReply): Promise<void> => {
    const userId = 'ANALAURA'
    const { id } = request.params;

    if(!userId){
        reply.status(401).send({ error: "Usuário não autenticado" });
        return;
    }

    try {

        const transaction = await prisma.transaction.findFirst({
            where: {
                id, 
                userId,
            },
        });

        if(!transaction) {
            reply.status(400).send({ error: "ID da transação inválido ou não encontrado" });
            return;
        }

        await prisma.transaction.delete({ where: { id } });

        reply.status(204).send({message: "Transação deletada com sucesso"});
    } catch(err){
        request.log.error('Erro ao deletar transação', err);
        reply.status(500).send({ error: 'Erro do servidor ao deletar transação' });
    }
}