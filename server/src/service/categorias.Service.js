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

  }
  catch (error) {
    console.error('Erro ao criar o cargo:', error);
    throw new Error('Não foi possível criar o cargo. Verifique os dados fornecidos.');
  }
}

export const getCategorias = async () => {
  try {
    const categorias = await prisma.categorias.findMany();
    return categorias;
  }
  catch (error) {
    console.error('Erro ao obter os cargos:', error);
    throw new Error('Não foi possível obter os cargos.');
  }
}

export const getCategoriaById = async (id) => {
  try {
    const categoria = await prisma.categorias.findUnique({
      where: { id: Number(id) },
    });
    return categoria;
  }
  catch (error) {
    console.error('Erro ao obter o cargo:', error);
    throw new Error('Não foi possível obter o cargo.');
  }
}
export const getCargoByName = async (nome) => {
  try {
    const categoria = await prisma.categorias.findUnique({
      where: { nome: nome },
    });
    return categoria;
  }
  catch (error) {
    console.error('Erro ao obter o cargo:', error);
    throw new Error('Não foi possível obter o cargo.');
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
  }
  catch (error) {
    console.error('Erro ao atualizar o cargo:', error);
    throw new Error('Não foi possível atualizar o cargo. Verifique os dados fornecidos.');
  }
}

export const deleteCategoria = async (id) => {
  try {
    const categoria = await prisma.categorias.delete({
      where: { id: Number(id) },
    });
    return categoria;
  }
  catch (error) {
    console.error('Erro ao deletar o cargo:', error);
    throw new Error('Não foi possível deletar o cargo.');
  }
} 