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
import { cargoValidator_Create, cargoValidator_Update, cargoValidator_UpdateStatus } from '../validators/cargoValidator.js';

const router = express.Router();

// Rota para criar um novo cargo
router.post('/cargos', cargoValidator_Create, cargoController.createCargo);
// Rota para atualizar um cargo pelo ID
router.put('/cargos/:id', cargoValidator_Update, cargoController.updateCargo);
// Rota para deletar um cargo pelo ID
router.delete('/cargos/:id', cargoController.deleteCargo);
// Rota para atualizar o status de um cargo pelo ID
router.patch('/cargos/:id/status', cargoValidator_UpdateStatus, cargoController.updateCargoStatus);
export default router;
