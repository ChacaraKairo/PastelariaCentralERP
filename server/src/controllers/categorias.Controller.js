import * as categoriaService from '../service/categorias.Service.js'; // Importação do serviço

// Criar uma nova categoria
export const createCategoria = async (req, res) => {
  try {
    console.log("dados recebidos:", req.body);
    const { nome, descricao } = req.body;
    if (!nome || !descricao) {
      return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
    }
    const categoria = await categoriaService.createCategoria({ nome, descricao });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todas as categorias
export const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter uma categoria pelo ID
export const getCategoriaById = async (req, res) => {
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
};

// Obter uma categoria pelo nome
export const getCategoriaByName = async (req, res) => {
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
};

// Atualizar uma categoria
export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  try {
    const categoria = await categoriaService.updateCategoria(id, { nome, descricao });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar uma categoria
export const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaService.deleteCategoria(id);
    res.status(200).json({ message: 'Categoria deletada com sucesso.', categoria });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
