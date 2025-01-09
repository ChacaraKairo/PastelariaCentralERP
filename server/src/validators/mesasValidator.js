import { body, param, validationResult } from 'express-validator';
/**
 * id int AI PK 
numero smallint 
capacidade smallint 
status tinyint(1) 
descricao text 
atualizado_em timestamp
 */

export const mesasValidator_Create = [
  body('numero')
    .notEmpty().withMessage('O número da mesa é obrigatório.')
    .isInt().withMessage('O número da mesa deve ser um número inteiro valido.'),

  body('capacidade')
    .notEmpty().withMessage('A capacidade da mesa é obrigatória.')
    .isInt().withMessage('A capacidade da mesa deve ser um número inteiro valido.'),

  body('status')
    .isInt().withMessage('O status da mesa deve ser 1 ou 0'),

  body('descricao')
    .notEmpty().withMessage('A descrição da mesa é obrigatória.')
];

export const mesasValidator_UpdateStatus = [
  param('id')
    .notEmpty().withMessage('O id da mesa é obrigatório.')
    .isInt().withMessage('O id da mesa deve ser um número inteiro valido.'),

  body('status')
    .notEmpty().withMessage('O status da mesa é obrigatório.')
    .isInt().withMessage('O status da mesa deve ser 1 ou 0')
];
