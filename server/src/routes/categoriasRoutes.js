/**
 * @author Kairo
 * @since 1.0
 * @version 1.0
 * @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
 * 
 * Este arquivo contém as definições das rotas para manipular os recursos relacionados às categorias.
 */

import express from 'express';
import * as categoriaController from '../controllers/categorias.Controller.js';
import {
  categoriaValidator_Create,
  categoriaValidator_Update,
  categoriaValidator_GetById,
  categoriaValidator_GetByName,
  categoriaValidator_Delete,
  handleValidationErrors
} from '../validators/categoriasValidator.js';

// Agora você pode acessar as funções via categoriaController

const router = express.Router();

/**
 * Rota para criar uma nova categoria.
 * @route POST /categorias
 */
router.post(
  '/categorias',
  categoriaValidator_Create,
  handleValidationErrors,
  categoriaController.createCategoria
);

/**
 * Rota para obter todas as categorias.
 * @route GET /categorias
 */
router.get('/categorias', categoriaController.getCategorias);

/**
 * Rota para obter uma categoria específica pelo ID.
 * @route GET /categorias/:id
 */
router.get(
  '/categorias/:id',
  categoriaValidator_GetById,
  handleValidationErrors,
  categoriaController.getCategoriaById
);

/**
 * Rota para obter uma categoria pelo nome.
 * @route GET /categorias/nome/:nome
 */
router.get(
  '/categorias/nome/:nome',
  categoriaValidator_GetByName,
  handleValidationErrors,
  categoriaController.getCategoriaByName
);

/**
 * Rota para atualizar uma categoria pelo ID.
 * @route PUT /categorias/:id
 */
router.put(
  '/categorias/:id',
  categoriaValidator_Update,
  handleValidationErrors,
  categoriaController.updateCategoria
);

/**
 * Rota para deletar uma categoria pelo ID.
 * @route DELETE /categorias/:id
 */
router.delete(
  '/categorias/:id',
  categoriaValidator_Delete,
  handleValidationErrors,
  categoriaController.deleteCategoria
);

// Exporte o router utilizando exportação ES Module
export default router;
