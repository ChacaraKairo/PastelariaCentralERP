import { body, param, validationResult } from 'express-validator';

const cargoValidator_Create = [
  body('nome')
    .notEmpty().withMessage('O nome do cargo é obrigatório.')
    .isLength({ min: 1, max: 25 }).withMessage('O nome do cargo deve ter entre 1 e 25 caracteres.'),

  body('descricao')
    .notEmpty().withMessage('A descrição do cargo é obrigatória, para auxiliar, liste as obrigações que o funcionário que ocupa o cargo deve exercer'),

  body('salarioBase')
    .notEmpty().withMessage('O salário base é obrigatório.')
    .isDecimal({ decimal_digits: '2' }).withMessage('O salário base deve ser um número decimal válido com até 2 casas decimais.'),

  body('status')
    .optional()
    .isIn(['ativo', 'inativo']).withMessage('O status deve conter as String "ativo" ou "inativo", pois está configurado para reveber uma das duas palavras.')
];

const cargoValidator_UpdateStatus = [
  body('status')
    .notEmpty().withMessage('O status é obrigatório.')
    .isIn(['ativo', 'inativo']).withMessage('O status deve ser "ativo" ou "inativo".')
];

const cargoValidator_Update = [
  body('nome')
    .optional()
    .isLength({ min: 1, max: 25 }).withMessage('O nome do cargo deve ter entre 1 e 25 caracteres.'),

  body('descricao')
    .optional()
    .isLength({ min: 1, max: 255 }).withMessage('A descrição do cargo deve ter entre 1 e 255 caracteres.'),

  body('salarioBase')
    .optional()
    .isDecimal({ decimal_digits: '2' }).withMessage('O salário base deve ser um número decimal válido com duas casas decimais.')
    .isFloat({ min: 0 }).withMessage('O salário base não pode ser negativo.'),

  body('status')
    .optional()
    .isIn(['ativo', 'inativo']).withMessage('O status deve conter as Strings "ativo" ou "inativo".'),

  param('id')
    .notEmpty().withMessage('O id do cargo é obrigatório.')
    .isInt().withMessage('O id do cargo deve ser um número inteiro válido.')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { cargoValidator_UpdateStatus, cargoValidator_Update, cargoValidator_Create, handleValidationErrors };
