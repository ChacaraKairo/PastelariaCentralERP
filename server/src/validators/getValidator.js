import { body, param, validationResult } from 'express-validator';
export const getValidator_GetAll = [
  param('entidade')
    .notEmpty().withMessage('É obrigatorio a passagem do nome da entidade na rota.')
    .isString().withMessage('O nome da entidade deve ser uma string válida.')
];
export const getValidator_GetById = [
  param('entidade')
    .notEmpty().withMessage('É obrigatório passar o nome da entidade na rota.')
    .isString().withMessage('O nome da entidade deve ser uma string válida.'),
  param('id')
    .notEmpty().withMessage('O id é obrigatório.')
    .isInt().withMessage('O id deve ser um número inteiro válido.')
    .toInt()
];


