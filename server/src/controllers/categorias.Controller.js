import express from 'express';
import * as categoriaService from '../service/categorias.Service.js'; // Supondo que a lógica do serviço esteja no arquivo categoriaService.js

const router = express.Router();

// Criar uma nova categoria
router.post('/categorias', async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    const categoria = await createCategoria({ nome, descricao });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obter todas as categorias
router.get('/categorias', async (req, res) => {
  try {
    const categorias = await getCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter uma categoria pelo ID
router.get('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await getCategoriaById(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter uma categoria pelo nome
router.get('/categorias/nome/:nome', async (req, res) => {
  const { nome } = req.params;
  try {
    const categoria = await getCategoriaByName(nome);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma categoria
router.put('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  try {
    const categoria = await updateCategoria(id, { nome, descricao });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar uma categoria
router.delete('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await deleteCategoria(id);
    res.status(200).json({ message: 'Categoria deletada com sucesso.', categoria });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
