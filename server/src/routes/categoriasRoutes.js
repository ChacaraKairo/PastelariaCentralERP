import express from 'express';
import * as categoriaController from '../controllers/categorias.Controller.js';
import {
  categoriaValidator_Create,
  categoriaValidator_Update,
  categoriaValidator_Delete,
  handleValidationErrors
} from '../validators/categoriasValidator.js';

const router = express.Router();

router.post(
  '/categorias',
  categoriaValidator_Create,
  handleValidationErrors,
  categoriaController.createCategoria
);

router.put(
  '/categorias/:id',
  categoriaValidator_Update,
  handleValidationErrors,
  categoriaController.updateCategoria
);

router.delete(
  '/categorias/:id',
  categoriaValidator_Delete,
  handleValidationErrors,
  categoriaController.deleteCategoria
);

export default router;
