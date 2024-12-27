import { body, param, validationResult } from 'express-validator';

// Validação para a criação de uma categoria
export const categoriaValidator_Create = [
  body('nome')
    .notEmpty().withMessage('O nome da categoria é obrigatório.')
    .isLength({ min: 1, max: 50 }).withMessage('O nome da categoria deve ter entre 1 e 50 caracteres.'),

  body('descricao')
    .notEmpty().withMessage('A descrição da categoria é obrigatória.')
    .isLength({ min: 1, max: 255 }).withMessage('A descrição da categoria deve ter entre 1 e 255 caracteres.')
];

// Validação para atualização de categoria
export const categoriaValidator_Update = [
  param('id')
    .notEmpty().withMessage('O id da categoria é obrigatório.')
    .isInt().withMessage('O id da categoria deve ser um número inteiro válido.'),

  body('nome')
    .optional()
    .isLength({ min: 1, max: 50 }).withMessage('O nome da categoria deve ter entre 1 e 50 caracteres.'),

  body('descricao')
    .optional()
    .isLength({ min: 1, max: 255 }).withMessage('A descrição da categoria deve ter entre 1 e 255 caracteres.')
];

// Validação para obter categoria por ID
export const categoriaValidator_GetById = [
  param('id')
    .notEmpty().withMessage('O id da categoria é obrigatório.')
    .isInt().withMessage('O id da categoria deve ser um número inteiro válido.')
];

// Validação para obter categoria por nome
export const categoriaValidator_GetByName = [
  param('nome')
    .notEmpty().withMessage('O nome da categoria é obrigatório.')
    .isString().withMessage('O nome da categoria deve ser uma string válida.')
    .isLength({ min: 1, max: 50 }).withMessage('O nome da categoria deve ter entre 1 e 50 caracteres.')
];

// Validação para deletar categoria
export const categoriaValidator_Delete = [
  param('id')
    .notEmpty().withMessage('O id da categoria é obrigatório.')
    .isInt().withMessage('O id da categoria deve ser um número inteiro válido.')
];

// Função para manipulação de erros de validação
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
