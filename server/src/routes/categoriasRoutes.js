/**
 * @author Kairo
 * @since 1.0
 * @version 1.0
 * @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
 * 
 * Este arquivo contém as definições das rotas para manipular os recursos relacionados às categorias.
 */

import express from 'express';
import * as categoriaService from '../service/categorias.Service.js'; // Supondo que a lógica do serviço esteja no arquivo categoriaService.js

const router = express.Router();

/**
 * Rota para criar uma nova categoria.
 * @route POST /categorias
 */
router.post('/categorias', async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    const categoria = await categoriaService.createCategoria({ nome, descricao });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Rota para obter todas as categorias.
 * @route GET /categorias
 */
router.get('/categorias', async (req, res) => {
  try {
    const categorias = await categoriaService.getCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Rota para obter uma categoria específica pelo ID.
 * @route GET /categorias/:id
 */
router.get('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.getCategoriaById(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Rota para obter uma categoria pelo nome.
 * @route GET /categorias/nome/:nome
 */
router.get('/categorias/nome/:nome', async (req, res) => {
  const { nome } = req.params;
  try {
    const categoria = await categoriaService.getCategoriaByName(nome);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Rota para atualizar uma categoria pelo ID.
 * @route PUT /categorias/:id
 */
router.put('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  try {
    const categoria = await categoriaService.updateCategoria(id, { nome, descricao });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Rota para deletar uma categoria pelo ID.
 * @route DELETE /categorias/:id
 */
router.delete('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.deleteCategoria(id);
    res.status(200).json({ message: 'Categoria deletada com sucesso.', categoria });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Exporte o router utilizando exportação ES Module
export default router;
