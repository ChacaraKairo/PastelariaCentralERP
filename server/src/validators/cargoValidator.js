/**
 * @file cargoValidator.js
 * 
 * Módulo responsável pela validação de dados relacionados ao cargo na aplicação.
 * Utiliza o express-validator para garantir que os dados enviados pelas requisições estejam no formato esperado e sejam válidos antes de serem processados ou armazenados.
 * 
 * O módulo exporta duas funcionalidades principais:
 * 1. `cargoValidator`: Array de validações a serem aplicadas aos dados da requisição.
 * 2. `handleValidationErrors`: Função middleware para tratar erros de validação e retorná-los ao cliente.
 * 
 * @module cargoValidator
 */

import { body, validationResult } from 'express-validator';

/**
 * Validações para os dados de um cargo.
 * As validações são aplicadas aos campos nome, descrição, salárioBase e status.
 * 
 * - **nome**: Não pode estar vazio e deve ter no máximo 255 caracteres.
 * - **descricao**: Não pode estar vazio.
 * - **salarioBase**: Deve ser um número decimal válido com até 2 casas decimais.
 * - **status**: Deve ser "ativo" ou "inativo".
 * 
 * @const {Array} cargoValidator
 * @example
 * const cargoValidator = [
 *   body('nome').notEmpty().withMessage('O nome do cargo é obrigatório.')
 *     .isLength({ max: 255 }).withMessage('O nome do cargo deve ter no máximo 255 caracteres.'),
 *   body('descricao').notEmpty().withMessage('A descrição do cargo é obrigatória.'),
 *   body('salarioBase').notEmpty().withMessage('O salário base é obrigatório.')
 *     .isDecimal({ decimal_digits: '2' }).withMessage('O salário base deve ser um número decimal válido com até 2 casas decimais.'),
 *   body('status').notEmpty().withMessage('O status é obrigatório.')
 *     .isIn(['ativo', 'inativo']).withMessage('O status deve ser "ativo" ou "inativo".')
 * ];
 */
const cargoValidator = [
  // Validação para o campo 'nome'
  body('nome')
    .notEmpty().withMessage('O nome do cargo é obrigatório.')  // Verifica se o nome não está vazio
    .isLength({ min: 1, max: 25 }).withMessage('O nome do cargo deve ter entre 1 e 25 caracteres.'), // Limita o comprimento do nome de 1 a 25 caracteres

  // Validação para o campo 'descricao'
  body('descricao')
    .notEmpty().withMessage('A descrição do cargo é obrigatória.'),  // Verifica se a descrição não está vazia

  // Validação para o campo 'salarioBase'
  body('salarioBase')
    .notEmpty().withMessage('O salário base é obrigatório.') // Verifica se o salário base não está vazio
    .isDecimal({ decimal_digits: '2' }).withMessage('O salário base deve ser um número decimal válido com até 2 casas decimais.'), // Verifica se é um número decimal válido com até 2 casas decimais

  // Validação para o campo 'status'
  body('status')
    .notEmpty().withMessage('O status é obrigatório.') // Verifica se o status não está vazio
    .isIn(['ativo', 'inativo']).withMessage('O status deve ser "ativo" ou "inativo".') // Verifica se o status é "ativo" ou "inativo"
];

/**
 * Middleware para verificar erros de validação.
 * Após a execução do `cargoValidator`, esta função verifica se há erros nas validações.
 * Se houver erros, a resposta HTTP será retornada com status 400 e os erros detalhados em formato JSON.
 * Caso contrário, a execução do código continuará para o próximo middleware ou função de controle.
 * 
 * @param {Object} req - Objeto da requisição Express.
 * @param {Object} res - Objeto da resposta Express.
 * @param {Function} next - Função para passar o controle para o próximo middleware.
 * @returns {Object|undefined} Retorna uma resposta JSON com os erros ou continua para o próximo middleware.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Caso existam erros de validação, retorna o erro em formato JSON com status 400
    return res.status(400).json({ errors: errors.array() });
  }
  // Se não houver erros, chama o próximo middleware ou função de controle
  next();
};

// Exporta os validadores e a função de verificação de erros
export { cargoValidator, handleValidationErrors };
