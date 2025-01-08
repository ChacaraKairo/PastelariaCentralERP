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
 * Obtém todos os cargos cadastrados no banco de dados.
 * 
 * Esta função consulta todos os cargos existentes no banco de dados e os retorna. 
 * Se não houver cargos cadastrados, será lançado um erro.
 * 
 * @returns {Array} - Uma lista de objetos, cada um representando um cargo no banco de dados.
 * 
 * @throws {Error} - Lança um erro se não for possível recuperar os cargos do banco de dados.
 */
export const getCargos = async () => {
  try {
    // Recupera todos os cargos do banco de dados
    const cargos = await prisma.cargos.findMany();

    // Verifica se não encontrou nenhum cargo
    if (!cargos || cargos.length === 0) {
      throw new Error('Nenhum cargo encontrado');
    }

    // Verifica se cada cargo possui um status definido
    cargos.forEach(cargo => {
      if (cargo && !cargo.status) {
        console.warn(`Cargo com ID ${cargo.id} não tem um status definido.`);
      }
    });

    return cargos;  // Retorna a lista de cargos encontrados
  } catch (error) {
    console.error('Erro ao obter cargos:', error.message);
    throw new Error('Erro ao obter cargos');
  }
};

/**
 * Obtém um cargo específico a partir do ID fornecido.
 * 
 * Esta função busca um cargo no banco de dados com base no ID fornecido como parâmetro. 
 * Se o cargo não for encontrado, um erro será lançado.
 * 
 * @param {number} id - O ID do cargo que se deseja recuperar.
 * 
 * @returns {Object} - O objeto representando o cargo encontrado.
 * 
 * @throws {Error} - Lança um erro se o cargo não for encontrado no banco de dados.
 */
export const getCargoById = async (id) => {
  try {
    // Busca um cargo único pelo ID no banco de dados
    const cargo = await prisma.cargos.findUnique({
      where: { id: Number(id) },
    });

    // Verifica se o cargo foi encontrado
    if (!cargo) {
      throw new Error('Cargo não encontrado');
    }

    return cargo;  // Retorna o cargo encontrado
  } catch (error) {
    console.error('Erro ao obter cargo:', error);
    throw new Error('Erro ao obter cargo');
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
 * Deleta um cargo do banco de dados com base no ID fornecido.
 * 
 * Esta função remove um cargo do banco de dados. Se o cargo não for encontrado ou se ocorrer 
 * algum erro durante a exclusão, um erro será lançado.
 * 
 * @param {number} id - O ID do cargo a ser deletado.
 * 
 * @returns {Object} - O objeto contendo os dados do cargo deletado.
 * 
 * @throws {Error} - Lança um erro se o cargo não for encontrado ou se ocorrer um erro durante a exclusão.
 */
export const deleteCargo = async (id) => {
  try {
    // Deleta o cargo do banco de dados com base no ID fornecido
    const cargo = await prisma.cargos.delete({
      where: { id: Number(id) },
    });
    return cargo;
  } catch (error) {
    console.error('Erro ao deletar cargo:', error);
    throw new Error('Erro ao deletar cargo');
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

/**
 * Obtém todos os cargos com o status especificado.
 * 
 * Esta função consulta todos os cargos no banco de dados que possuem o status fornecido 
 * e os retorna. Se não houver cargos com o status fornecido, um erro será lançado.
 * 
 * @param {string} status - O status dos cargos a serem recuperados.
 * 
 * @returns {Array} - Uma lista de cargos com o status especificado.
 * 
 * @throws {Error} - Lança um erro se não for possível recuperar os cargos com o status fornecido.
 */
export const getCargosByStatus = async (status) => {
  try {
    // Recupera todos os cargos com o status fornecido
    const cargos = await prisma.cargos.findMany({
      where: { status },
    });

    // Verifica se não encontrou nenhum cargo com o status fornecido
    if (!cargos || cargos.length === 0) {
      throw new Error(`Nenhum cargo encontrado com o status: ${status}`);
    }

    return cargos;  // Retorna os cargos encontrados
  } catch (error) {
    console.error('Erro ao obter cargos:', error);
    throw new Error('Erro ao obter cargos');
  }
};
