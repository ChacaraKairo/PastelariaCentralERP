import express from 'express';
import * as fornecedorController from '../controllers/fornecedores.Controller.js';

const router = express.Router();
// Rota para criar um novo fornecedor
router.post('/fornecedores', fornecedorController.createFornecedor);

// Rota para atualizar um fornecedor pelo ID
router.put('/fornecedores/:id', fornecedorController.updateFornecedor);

// Rota para deletar um fornecedor pelo ID
router.delete('/fornecedores/:id', fornecedorController.deleteFornecedor);

export default router;
