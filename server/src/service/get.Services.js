import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllData = async (entidade) => {
  try {
    const data = await prisma[entidade].findMany();
    return data;
  } catch (error) {
    console.error(`Erro ao obter dados da entidade "${entidade}":`, error.message);
    throw new Error(`Erro ao obter dados da entidade "${entidade}"`);
  }
};
export const getEntidade = async (entidade) => {
  try {
    const model = await prisma.$queryRawUnsafe(
      `SHOW COLUMNS FROM ${entidade}`,
    );
    return model;
  } catch (error) {
    console.error(`Erro ao obter as colunas da entidade "${entidade}":`, error);
    throw new Error(`Erro ao obter as colunas da entidade "${entidade}"`);
  }
};
export const validaCampo = async (entidade, campo) => {
  try {
    const model = await getEntidade(entidade);
    const coluna = model.find((col) => col.Field === campo);
    if (!coluna) {
      throw new Error(`Campo "${campo}" não encontrado na entidade "${entidade}"`);
    }
    return coluna.Type;
  } catch (error) {
    console.error(`Erro ao obter as colunas da entidade "${entidade}":`, error);
    throw new Error(`Erro ao obter as colunas da entidade "${entidade}"`);
  }
};
export const getDataByField = async (entidade, campo, valor) => {
  try {
    const data = await prisma[entidade].findMany({ where: { [campo]: valor } });
    return data;
  } catch (error) {
    console.error(`Erro ao obter dados da entidade "${entidade}":`, error.message);
    throw new Error(`Erro ao obter dados da entidade "${entidade}"`);
  }
};
