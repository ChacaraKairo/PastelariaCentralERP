import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteDataByField = async (entidade, campo, valor) => {
  try {
    const data = await prisma[entidade].deleteMany({ where: { [campo]: valor } });
    return data;
  } catch (error) {
    console.error(`Erro ao excluir dados da entidade "${entidade}":`, error.message);
    throw new Error(`Erro ao excluir dados da entidade "${entidade}"`);
  }
};


