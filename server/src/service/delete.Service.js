import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteDatasByField = async (entidade, campo, valor) => {
  try {
    const data = await prisma[entidade].deleteMany({ where: { [campo]: valor } });
    return data;
  } catch (error) {
    console.error(`Erro ao excluir dados da entidade "${entidade}":`, error.message);
    throw new Error(`Erro ao excluir dados da entidade "${entidade}"`);
  }
};
export const deleteDataByField = async (entidade, campo, valor) => {
  try {
    const data = await prisma[entidade].delete({ where: { [campo]: valor } });
    return data;
  } catch (error) {
    console.error(`Erro ao excluir dados da entidade "${entidade}":`, error.message);
    throw new Error(`Erro ao excluir dados da entidade "${entidade}"`);
  }
};

export const deleteAllData = async (entidade) => {
  try {
    const data = await prisma[entidade].deleteMany();
    return data;
  } catch (error) {
    console.error(`Erro ao excluir dados da entidade "${entidade}":`, error.message);
    throw new Error(`Erro ao excluir dados da entidade "${entidade}"`);
  }
}



