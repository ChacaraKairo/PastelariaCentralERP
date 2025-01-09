import express from 'express';
import * as mesasController from '../controllers/mesas.Controller.js';

const router = express.Router();

router.post('/mesas', mesasController.createMesa);
router.get('/mesas', mesasController.getMesas);
router.get('/mesas/:id', mesasController.getMesaById);
router.put('/mesas/:id', mesasController.updateMesa);
router.put('/mesas/status/:id', mesasController.updateStatusMesa);
router.get('/mesas/status/:id', mesasController.getStatusmesa);
router.delete('/mesas/:id', mesasController.deleteMesa)
export default router;
