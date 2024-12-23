/**
 * @author Kairo
 * @since 1.0
 * @version 1.0
 * @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
 * 
 * Este arquivo contém as definições das rotas para manipular os recursos relacionados aos cargos.
 */

import express from 'express';
import * as cargoController from '../controllers/cargo.Controller.js';

// Agora você pode acessar as funções via cargoController


// Importa o controlador de cargos

const router = express.Router();

/**
 * Rota para criar um novo cargo.
 * @route POST /cargos
 */
router.post('/cargos', cargoController.createCargo);

/**
 * Rota para obter todos os cargos.
 * @route GET /cargos
 */
router.get('/cargos', cargoController.getCargos);

/**
 * Rota para obter um cargo específico pelo ID.
 * @route GET /cargos/:id
 */
router.get('/cargos/:id', cargoController.getCargoById);

/**
 * Rota para atualizar um cargo pelo ID.
 * @route PUT /cargos/:id
 */
router.put('/cargos/:id', cargoController.updateCargo);

/**
 * Rota para deletar um cargo pelo ID.
 * @route DELETE /cargos/:id
 */
router.delete('/cargos/:id', cargoController.deleteCargo);

/**
 * Rota para atualizar o status de um cargo pelo ID.
 * @route PATCH /cargos/:id/status
 */
router.patch('/cargos/:id/status', cargoController.updateCargoStatus);

/**
 * Rota para obter cargos pelo status.
 * @route GET /cargos/status/:status
 */
router.get('/cargos/status/:status', cargoController.getCargosByStatus);

// Exporte o router utilizando exportação ES Module
export default router;
