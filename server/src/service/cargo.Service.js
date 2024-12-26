/**
 * @author Kairo Chácara
 * @since 1.0
 * @version 1.0
 * @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
 */
import { PrismaClient } from '@prisma/client';

// Cria uma instância do cliente Prisma para interagir com o banco de dados
const prisma = new PrismaClient();

/**
 * Função para criar um cargo.
 * 
 * Esta função cria um novo cargo no banco de dados com os dados fornecidos.
 * O campo 'descricao' é opcional e será armazenado como 'null' se não fornecido.
 * O campo 'status' também é opcional e, caso não fornecido, será definido como 'ativo' por padrão.
 * 
 * @param {Object} req - Objeto da requisição contendo os dados do cargo a ser criado.
 * @param {Object} res - Objeto de resposta utilizado para retornar o status e dados do cargo criado.
 * @returns {Object} - Objeto com os dados do cargo recém-criado.
 * @throws {Error} - Lança erro em caso de falha ao criar o cargo.
 */
export const createCargo = async (body) => {
  const { nome, descricao, salarioBase, status } = body;
  try {
    const cargo = await prisma.cargos.create({
      data: {
        nome,
        descricao: descricao || null,  // Garantindo que 'descricao' seja 'null' se não fornecido
        salarioBase,
        status: status || 'ativo',  // Padrão para 'ativo' se 'status' não fornecido
      },
    });
    res.status(201).json(cargo);
  } catch (error) {
    console.error('Erro ao criar cargo:', error);
    res.status(500).json({ message: 'Falha na criação do cargo' });
  }
};

/**
 * Função para obter todos os cargos.
 * 
 * Esta função recupera todos os cargos registrados no banco de dados.
 * 
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta utilizado para retornar os cargos encontrados.
 * @returns {Array} - Lista de objetos representando todos os cargos.
 * @throws {Error} - Lança erro em caso de falha ao obter os cargos.
 */
export const getCargos = async (req, res) => {
  try {
    const cargos = await prisma.cargos.findMany();

    // Verificação adicional para garantir que cargos não seja vazio ou undefined
    if (!cargos || cargos.length === 0) {
      return res.status(404).json({ message: 'Nenhum cargo encontrado' });
    }

    // Verificação de que cada cargo possui um campo status
    cargos.forEach(cargo => {
      if (cargo && !cargo.status) {
        console.warn(`Cargo com ID ${cargo.id} não tem um status definido.`);
      }
    });

    res.status(200).json(cargos);
  } catch (error) {
    console.error('Erro ao obter cargos:', error);
    res.status(500).json({ message: 'Erro ao obter cargos' });
  }
};

/**
 * Função para obter um cargo pelo ID.
 * 
 * Esta função recupera um cargo específico com base no ID fornecido.
 * 
 * @param {Object} req - Objeto da requisição, contendo o parâmetro ID do cargo.
 * @param {Object} res - Objeto de resposta utilizado para retornar o cargo encontrado ou mensagem de erro.
 * @returns {Object} - Objeto representando o cargo encontrado.
 * @throws {Error} - Lança erro caso o cargo não seja encontrado ou em caso de falha.
 */
export const getCargoById = async (req, res) => {
  const { id } = req.params;
  try {
    const cargo = await prisma.cargos.findUnique({
      where: { id: Number(id) },
    });
    if (!cargo) {
      return res.status(404).json({ message: 'Cargo não encontrado' });
    }
    res.status(200).json(cargo);
  } catch (error) {
    console.error('Erro ao obter cargo:', error);
    res.status(500).json({ message: 'Erro ao obter cargo' });
  }
};

/**
 * Função para atualizar um cargo.
 * 
 * Esta função permite atualizar os dados de um cargo existente com base no ID.
 * O campo 'descricao' é opcional e será armazenado como 'null' se não fornecido.
 * O campo 'status' também é opcional e será definido como 'ativo' por padrão.
 * 
 * @param {Object} req - Objeto da requisição contendo o ID do cargo e os dados a serem atualizados.
 * @param {Object} res - Objeto de resposta utilizado para retornar o cargo atualizado ou mensagem de erro.
 * @returns {Object} - Objeto com os dados do cargo atualizado.
 * @throws {Error} - Lança erro em caso de falha ao atualizar o cargo.
 */
export const updateCargo = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, salarioBase, status } = req.body;
  try {
    const cargo = await prisma.cargos.update({
      where: { id: Number(id) },
      data: {
        nome,
        descricao: descricao || null,
        salarioBase,
        status: status || 'ativo',
      },
    });
    res.status(200).json(cargo);
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error);
    res.status(500).json({ message: 'Erro ao atualizar cargo' });
  }
};

/**
 * Função para deletar um cargo.
 * 
 * Esta função remove um cargo do banco de dados com base no ID fornecido.
 * 
 * @param {Object} req - Objeto da requisição contendo o ID do cargo a ser deletado.
 * @param {Object} res - Objeto de resposta utilizado para retornar o cargo deletado ou mensagem de erro.
 * @returns {Object} - Objeto com os dados do cargo deletado.
 * @throws {Error} - Lança erro em caso de falha ao deletar o cargo.
 */
export const deleteCargo = async (req, res) => {
  const { id } = req.params;
  try {
    const cargo = await prisma.cargos.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(cargo);
  } catch (error) {
    console.error('Erro ao deletar cargo:', error);
    res.status(500).json({ message: 'Erro ao deletar cargo' });
  }
};

/**
 * Função para alterar o status de um cargo.
 * 
 * Esta função permite alterar o status de um cargo sem removê-lo.
 * 
 * @param {Object} req - Objeto da requisição contendo o ID do cargo e o novo status.
 * @param {Object} res - Objeto de resposta utilizado para retornar o cargo atualizado ou mensagem de erro.
 * @returns {Object} - Objeto com os dados do cargo atualizado.
 * @throws {Error} - Lança erro em caso de falha ao atualizar o status do cargo.
 */
export const updateCargoStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Verificar se o status foi fornecido
  if (!status) {
    return res.status(400).json({ message: 'Status é obrigatório para atualizar o cargo' });
  }

  try {
    const cargo = await prisma.cargos.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json(cargo);
  } catch (error) {
    console.error('Erro ao atualizar status do cargo:', error);
    res.status(500).json({ message: 'Erro ao atualizar status do cargo' });
  }
};

/**
 * Função para obter cargos por status.
 * 
 * Esta função retorna todos os cargos com o status especificado.
 * 
 * @param {Object} req - Objeto da requisição contendo o parâmetro 'status' na URL.
 * @param {Object} res - Objeto de resposta utilizado para retornar os cargos encontrados ou mensagem de erro.
 * @returns {Array} - Lista de cargos com o status fornecido.
 * @throws {Error} - Lança erro em caso de falha ao obter cargos.
 */
export const getCargosByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const cargos = await prisma.cargos.findMany({
      where: { status },
    });

    // Verificação caso nenhum cargo seja encontrado
    if (!cargos || cargos.length === 0) {
      return res.status(404).json({ message: `Nenhum cargo encontrado com o status: ${status}` });
    }

    res.status(200).json(cargos);
  } catch (error) {
    console.error('Erro ao obter cargos:', error);
    res.status(500).json({ message: 'Erro ao obter cargos' });
  }
};
