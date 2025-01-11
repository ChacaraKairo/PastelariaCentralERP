import { PrismaClient } from '@prisma/client';

/**
 * Campos esperados no modelo:
 * id int AI PK 
 * razaoSocial varchar(255) 
 * cnpj char(14) 
 * representante varchar(255) 
 * telefoneRepresentante char(11) 
 * telefone char(11) 
 * email varchar(255) 
 * cep char(9) 
 * estado char(2) 
 * cidade varchar(255) 
 * bairro varchar(255) 
 * rua varchar(255) 
 * numero smallint 
 * status enum('ativo','inativo')
 */

const prisma = new PrismaClient();
// Função para criar um fornecedor
export const createFornecedor = async ({
  razaoSocial,
  cnpj,
  representante,
  telefoneRepresentante,
  telefone,
  email,
  cep,
  estado,
  cidade,
  bairro,
  rua,
  numero,
  status = 'ativo', // Valor padrão para status
}) => {
  try {
    const fornecedor = await prisma.fornecedores.create({
      data: {
        razaoSocial,
        cnpj,
        representante,
        telefoneRepresentante,
        telefone,
        email,
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        status,
      },
    });
    return fornecedor;
  } catch (error) {
    console.error('Erro ao criar o fornecedor:', error);
    throw new Error('Não foi possível criar o fornecedor.');
  }
};

// Função para atualizar um fornecedor
export const updateFornecedor = async (id, data) => {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('ID inválido ou não fornecido.');
    }

    const existingFornecedor = await prisma.fornecedores.findUnique({
      where: { id: Number(id) },
    });

    if (!existingFornecedor) {
      throw new Error(`Fornecedor com ID ${id} não encontrado.`);
    }

    const fornecedorAtualizado = await prisma.fornecedores.update({
      where: { id: Number(id) },
      data,
    });

    return fornecedorAtualizado;
  } catch (error) {
    console.error('Erro ao atualizar o fornecedor:', error);
    throw new Error('Não foi possível atualizar o fornecedor.');
  }
};

// Função para deletar um fornecedor
export const deleteFornecedor = async (id) => {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('ID inválido ou não fornecido.');
    }

    const existingFornecedor = await prisma.fornecedores.findUnique({
      where: { id: Number(id) },
    });

    if (!existingFornecedor) {
      throw new Error(`Fornecedor com ID ${id} não encontrado.`);
    }

    const fornecedorDeletado = await prisma.fornecedores.delete({
      where: { id: Number(id) },
    });

    return fornecedorDeletado;
  } catch (error) {
    console.error('Erro ao deletar o fornecedor:', error);
    throw new Error('Não foi possível deletar o fornecedor.');
  }
};
