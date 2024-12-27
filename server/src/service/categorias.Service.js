import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategoria = async ({ nome, descricao }) => {
  try {
    const categoria = await prisma.categorias.create({
      data: {
        nome,
        descricao,
      },
    });
    return categoria;
  } catch (error) {
    console.error('Erro ao criar a categoria:', error);
    throw new Error('Não foi possível criar a categoria. Verifique os dados fornecidos.');
  }
}

export const getCategorias = async () => {
  try {
    const categorias = await prisma.categorias.findMany();
    return categorias;
  } catch (error) {
    console.error('Erro ao obter as categorias:', error);
    throw new Error('Não foi possível obter as categorias.');
  }
}

export const getCategoriaById = async (id) => {
  try {
    const categoria = await prisma.categorias.findUnique({
      where: { id: Number(id) },
    });
    return categoria;
  } catch (error) {
    console.error('Erro ao obter a categoria:', error);
    throw new Error('Não foi possível obter a categoria.');
  }
}

export const getCategoriaByName = async (nome) => {
  try {
    const categoria = await prisma.categorias.findUnique({
      where: { nome: nome },
    });
    return categoria;
  } catch (error) {
    console.error('Erro ao obter a categoria:', error);
    throw new Error('Não foi possível obter a categoria.');
  }
}

export const updateCategoria = async (id, { nome, descricao }) => {
  try {
    const categoria = await prisma.categorias.update({
      where: { id: Number(id) },
      data: {
        nome,
        descricao,
      },
    });
    return categoria;
  } catch (error) {
    console.error('Erro ao atualizar a categoria:', error);
    throw new Error('Não foi possível atualizar a categoria. Verifique os dados fornecidos.');
  }
}

export const deleteCategoria = async (id) => {
  try {
    const categoria = await prisma.categorias.delete({
      where: { id: Number(id) },
    });
    return categoria;
  } catch (error) {
    console.error('Erro ao deletar a categoria:', error);
    throw new Error('Não foi possível deletar a categoria.');
  }
}
