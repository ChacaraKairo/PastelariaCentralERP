// src/controllers/cargo.Controller.js
/**
 * @author Kairo Chácara
 * @since 1.0
 * @version 1.0
 * @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
 * 
 * Este arquivo contém os controladores para manipulação das rotas relacionadas aos cargos.
 * Cada função aqui interage com o serviço de cargos (`cargoService`) para realizar
 * operações como criar, obter, atualizar e deletar cargos.
 */

import * as cargoService from '../service/cargo.Service.js';

/**
 * Controlador para criar um cargo.
 * 
 * Recebe os dados do cargo no corpo da requisição e os envia para o serviço para serem salvos.
 * Em caso de sucesso, retorna o cargo criado com status 201 (Created).
 * 
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} req.body - Corpo da requisição contendo os dados do cargo.
 * @param {Object} res - Objeto de resposta do Express.
 * @returns {Object} - Cargo criado ou mensagem de erro.
 */
export const createCargo = async (req, res) => {
  try {
    // Log para verificar os dados recebidos
    console.log('Dados recebidos:', req.body);

    const { nome, descricao, salarioBase, status } = req.body;
    if (!nome || !salarioBase) {
      return res.status(400).json({ message: 'Salário e nome são obrigatórios' });
    }

    const cargo = await cargoService.createCargo({ nome, descricao, salarioBase, status });

    res.status(201).json(cargo);
  } catch (error) {
    console.error('Erro ao criar cargo:', error.message);
    res.status(500).json({ message: 'Erro ao criar cargo' });
  }
};

/**
 * Controlador para obter todos os cargos.
 * 
 * Recupera todos os cargos do banco de dados através do serviço.
 * Em caso de sucesso, retorna a lista de cargos com status 200 (OK).
 * 
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @returns {Array} - Lista de cargos ou mensagem de erro.
 */
export const getCargos = async (req, res) => {
  try {
    const cargos = await cargoService.getCargos(); // Aguarda a resolução da Promise
    res.status(200).json(cargos); // Retorna todos os cargos com status 200 (OK)
  } catch (error) {
    console.error('Erro ao obter cargos:', error.message);
    res.status(500).json({ message: 'Erro ao obter cargos' });
  }
};


/**
 * Controlador para obter um cargo pelo ID.
 * 
 * Busca um cargo específico com base no ID fornecido nos parâmetros da requisição.
 * Caso o cargo não seja encontrado, retorna status 404 (Not Found).
 * 
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} req.params - Parâmetros da requisição contendo o ID do cargo.
 * @param {Object} res - Objeto de resposta do Express.
 * @returns {Object} - Cargo encontrado ou mensagem de erro.
 */
export const getCargoById = async (req, res) => {
  try {
    const { id } = req.params;
    const cargo = await cargoService.getCargoById(Number(id));
    if (!cargo) {
      return res.status(404).json({ message: 'Cargo não encontrado' }); // Caso o cargo não exista
    }
    res.status(200).json(cargo); // Retorna o cargo com status 200 (OK)
  } catch (error) {
    console.error('Erro ao obter cargo:', error.message);
    res.status(500).json({ message: 'Erro ao obter cargo' });
  }
};

/**
 * Controlador para atualizar um cargo.
 * 
 * Atualiza os dados de um cargo existente com base no ID fornecido nos parâmetros da requisição.
 * Em caso de sucesso, retorna o cargo atualizado com status 200 (OK).
 * 
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} req.params - Parâmetros da requisição contendo o ID do cargo.
 * @param {Object} req.body - Corpo da requisição contendo os dados atualizados do cargo.
 * @param {Object} res - Objeto de resposta do Express.
 * @returns {Object} - Cargo atualizado ou mensagem de erro.
 */
export const updateCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const cargo = await cargoService.updateCargo(Number(id), data);
    res.status(200).json(cargo); // Retorna o cargo atualizado com status 200 (OK)
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar cargo' });
  }
};

/**
 * Controlador para deletar um cargo.
 * 
 * Remove um cargo do banco de dados com base no ID fornecido nos parâmetros da requisição.
 * Em caso de sucesso, retorna status 204 (No Content).
 * 
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} req.params - Parâmetros da requisição contendo o ID do cargo.
 * @param {Object} res - Objeto de resposta do Express.
 * @returns {void} - Resposta sem conteúdo em caso de sucesso ou mensagem de erro.
 */
export const deleteCargo = async (req, res) => {
  const { id } = req.params;
  try {
    const cargo = await cargoService.deleteCargo(Number(id));
    res.status(200).json({ message: 'Cargo deletado com sucesso.', cargo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Controlador para alterar o status de um cargo.
 * 
 * Altera o status de um cargo com base no ID fornecido nos parâmetros da requisição.
 * Em caso de sucesso, retorna o cargo alterado com status 200 (OK).
 *  
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} req.params - Parâmetros da requisição contendo o ID do cargo.
 * @param {Object} req.body - Corpo da requisição contendo o novo status do cargo.
 * @param {Object} res - Objeto de resposta do Express.
 * @returns {Object} - Cargo alterado ou mensagem de erro.
 */
export const updateCargoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Verifica se o status fornecido é válido
    if (!status || (status !== 'ativo' && status !== 'inativo')) {
      return res.status(400).json({ message: 'Status inválido. Use "ativo" ou "inativo".' });
    }

    // Verifica se o cargo existe
    const cargoExistente = await cargoService.getCargoById(Number(id));
    if (!cargoExistente) {
      return res.status(404).json({ message: 'Cargo não encontrado.' });
    }

    // Atualiza o status do cargo
    const cargo = await cargoService.updateCargoStatus(Number(id), status);
    res.status(200).json(cargo); // Retorna o cargo alterado com status 200 (OK)
  } catch (error) {
    console.error('Erro ao atualizar status do cargo:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar status do cargo' });
  }
};

/**
 * Rota para obter cargos com base no status.
 * @route GET /cargos/status/:status
 */
export const getCargosByStatus = async (req, res) => {
  try {
    const { status } = req.params; // Obtendo o status do parâmetro da URL
    const cargos = await cargoService.getCargosByStatus(status);

    if (cargos.length === 0) {
      return res.status(404).json({ message: 'Nenhum cargo encontrado com esse status.' });
    }

    res.status(200).json(cargos);
  } catch (error) {
    console.error('Erro ao obter cargos:', error);
    res.status(500).json({ message: 'Erro ao obter cargos' });
  }
};
