/**
 * @author Kairo Chácara
 * @since 1.0
 * @version 1.0
 * @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
 * @date 2024-12-26
 */
import { PrismaClient } from '@prisma/client';

// Criação de uma instância do Prisma Client para se conectar ao banco de dados
const prisma = new PrismaClient();


/**
 * Cria um novo cargo no banco de dados.
 * 
 * Esta função recebe os dados de um novo cargo e o insere no banco de dados. 
 * Caso não seja fornecida uma descrição ou um status, o valor padrão será 'null' para a descrição 
 * e 'ativo' para o status.
 * 
 * @param {Object} params - O objeto contendo os dados do cargo a ser criado.
 * @param {string} params.nome - O nome do cargo.
 * @param {string} [params.descricao=null] - A descrição do cargo (opcional).
 * @param {number} params.salarioBase - O salário base do cargo.
 * @param {string} [params.status='ativo'] - O status do cargo, que pode ser 'ativo' ou outro (opcional).
 * 
 * @returns {Object} - O objeto contendo os dados do cargo recém-criado no banco de dados.
 * 
 * @throws {Error} - Lança um erro se houver um problema ao tentar criar o cargo no banco de dados.
 */
export const createCargo = async ({ nome, descricao, salarioBase, status }) => {
  try {
    // Cria um cargo no banco de dados utilizando os dados fornecidos
    const cargo = await prisma.cargos.create({
      data: {
        nome,
        descricao: descricao || null, // Se a descrição não for fornecida, será armazenada como null
        salarioBase,
        status: status || 'ativo', // Se o status não for fornecido, será armazenado como 'ativo'
      },
    });
    return cargo;  // Retorna o cargo criado
  } catch (error) {
    console.error('Erro ao criar o cargo:', error);
    throw new Error('Não foi possível criar o cargo. Verifique os dados fornecidos.');
  }
};

/**
 * Atualiza os dados de um cargo existente com base no ID fornecido.
 * 
 * Esta função permite atualizar os dados de um cargo, incluindo nome, descrição, salário base 
 * e status. Se a descrição ou status não forem fornecidos, eles receberão valores padrão.
 * 
 * @param {number} id - O ID do cargo a ser atualizado.
 * @param {Object} params - O objeto contendo os dados atualizados do cargo.
 * @param {string} params.nome - O nome do cargo a ser atualizado.
 * @param {string} [params.descricao=null] - A nova descrição do cargo (opcional).
 * @param {number} params.salarioBase - O novo salário base do cargo.
 * @param {string} [params.status='ativo'] - O novo status do cargo, que pode ser 'ativo' ou outro (opcional).
 * 
 * @returns {Object} - O objeto contendo os dados do cargo atualizado.
 * 
 * @throws {Error} - Lança um erro se houver um problema ao tentar atualizar o cargo no banco de dados.
 */
export const updateCargo = async (id, { nome, descricao, salarioBase, status }) => {
  try {
    // Atualiza o cargo no banco de dados com os dados fornecidos
    const cargo = await prisma.cargos.update({
      where: { id: Number(id) },
      data: {
        nome,
        descricao: descricao || null,
        salarioBase,
        status: status || 'ativo',
      },
    });
    return cargo;  // Retorna o cargo atualizado
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error);
    throw new Error('Erro ao atualizar cargo');
  }
};
/**
 * Atualiza o status de um cargo sem removê-lo.
 * 
 * Esta função permite alterar o status de um cargo existente com base no ID fornecido. 
 * Se o status não for fornecido, será lançado um erro.
 * 
 * @param {number} id - O ID do cargo a ter o status alterado.
 * @param {string} status - O novo status do cargo, que pode ser 'ativo', 'inativo', etc.
 * 
 * @returns {Object} - O objeto contendo os dados do cargo atualizado.
 * 
 * @throws {Error} - Lança um erro se o status não for fornecido ou se ocorrer um erro ao atualizar o cargo.
 */
export const updateCargoStatus = async (id, status) => {
  if (!status) {
    throw new Error('Status é obrigatório para atualizar o cargo');
  }

  try {
    // Atualiza o status do cargo no banco de dados
    const cargo = await prisma.cargos.update({
      where: { id: Number(id) },
      data: { status },
    });
    return cargo;  // Retorna o cargo atualizado
  } catch (error) {
    console.error('Erro ao atualizar status do cargo:', error);
    throw new Error('Erro ao atualizar status do cargo');
  }
};

