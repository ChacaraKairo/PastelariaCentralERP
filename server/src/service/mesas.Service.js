import { PrismaClient } from '@prisma/client';
import create from 'prompt-sync';

const prisma = new PrismaClient();

/**
 * numero smallint 
capacidade smallint 
status tinyint(1) 
descricao text 
 */

export const createMesa = async ({ numero, capacidade, descricao }) => {
  try {
    const mesa = await prisma.mesas.create({
      data: {
        numero,
        capacidade,
        descricao,
      },
    });
    return mesa;
  } catch (error) {
    console.error('Erro ao criar a mesa:', error);
    throw new Error('Não foi possível criar a mesa.');
  }
};

export const getMesas = async () => {
  try {
    const mesas = await prisma.mesas.findMany();
    return mesas;
  } catch (error) {
    console.error('Erro ao obter as mesas:', error);
    throw new Error('Não foi possível obter as mesas.');
  }
};

export const getMesaById = async (id) => {
  try {
    const mesa = await prisma.mesas.findUnique({
      where: { id: Number(id) },
    });
    return mesa;
  } catch (error) {
    console.error('Erro ao obter a mesa:', error);
    throw new Error('Não foi possível obter a mesa.');
  }
};

export const updateMesa = async (id, { numero, status, capacidade, descricao }) => {
  try {
    const mesa = await prisma.mesas.update({
      where: { id: Number(id) },
      data: {
        numero,
        status,
        capacidade,
        descricao,
      }
    });
    return mesa;
  }
  catch (error) {
    console.error('Erro ao atualizar mesa', error);
    throw new Error('não foi possível atualizar a mesa');

  }
};
// Função para verificar se a mesa existe
const getMesa = async (id) => {
  try {
    const mesa = await prisma.mesas.findUnique({
      where: { id: Number(id) },
    });
    return mesa;
  } catch (error) {
    console.error("Erro ao buscar a mesa:", error);
    throw error;
  }
};

// Função para obter o status da mesa
export const getStatusmesa = async (id) => {
  try {
    const mesa = await getMesa(id);

    if (!mesa) {
      throw new Error(`Mesa com ID ${id} não encontrada.`);
    }

    return mesa.status;
  } catch (error) {
    console.error("Erro ao buscar o status da mesa:", error);
    throw error;
  }
};

// Função para atualizar o status da mesa
export const updateStatusMesa = async (id) => {
  try {
    const mesa = await getMesa(id);

    if (!mesa) {
      throw new Error(`Mesa com ID ${id} não encontrada.`);
    }

    // Alterna o status (true -> false ou false -> true)
    const status = !mesa.status;

    // Atualiza no banco de dados
    await prisma.mesas.update({
      where: { id: Number(id) },
      data: { status },
    });

    console.log(`Status da mesa ${id} atualizado para: ${status}`);
    return { id, status };
  } catch (error) {
    console.error("Erro ao atualizar o status da mesa:", error);
    throw new Error('Não foi possível atualizar o status da mesa.');
  }
};


export const deleteMesa = async (id) => {
  try {
    const mesa = await prisma.mesas.delete({
      where: { id: Number(id) },
    });

    console.log(`Mesa com ID ${id} foi deletada com sucesso.`);
    return mesa; // Retorna a mesa deletada, caso necessário
  } catch (error) {
    console.error(`Erro ao deletar a mesa com ID ${id}:`, error);
    throw error; // Lança o erro para o chamador
  }
};

