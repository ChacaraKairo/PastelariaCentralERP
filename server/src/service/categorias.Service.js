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
