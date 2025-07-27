import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async() => {
    try {
        await prisma.$connect();
        console.log("✅ DB conectado")
    } catch (err) {
        console.error("❌ Erro ao conectar no DB", err);
    }
}

export default prisma