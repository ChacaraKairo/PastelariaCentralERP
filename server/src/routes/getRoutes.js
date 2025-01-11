import express from 'express';
import * as getController from '../controllers/get.Controller.js';
import * as getValidator from '../validators/getValidator.js';

const router = express.Router();

router.get('/search/:entidade', getValidator.getValidator_GetAll, getController.getAllData);
router.get('/search/:entidade/:campo/:valor', getController.getDataByField);
router.get('/getentidade/:entidade', getController.getEntidade);
router.get('/valida/:entidade/:campo', getController.validaCampo);

export default router;