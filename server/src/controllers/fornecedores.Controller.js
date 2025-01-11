import * as fornecedorService from '../service/fornecedores.Service.js';

/**
 * Modelo de Fornecedor:
 * id int AI PK 
 * razaoSocial varchar(255) 
 * cnpj char(14) 
 * representante varchar(255) 
 * telefoneRepresentante char(11) 
 * telefone char(11) 
 * email varchar(255) 
 * cep char(9) 
 * estado char(2) 
 * cidade varchar(255) 
 * bairro varchar(255) 
 * rua varchar(255) 
 * numero smallint 
 * status enum('ativo','inativo')
 */

export const getFornecedores = async (req, res) => {
  try {
    const fornecedores = await fornecedorService.getFornecedores();
    return res.status(200).json(fornecedores);
  } catch (error) {
    console.error('Erro ao obter os fornecedores:', error.message);
    return res.status(500).json({ error: 'Não foi possível obter os fornecedores.' });
  }
};

export const getFornecedorById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido ou não fornecido.' });
  }

  try {
    const fornecedor = await fornecedorService.getFornecedorById(Number(id));
    if (!fornecedor) {
      return res.status(404).json({ error: `Fornecedor com ID ${id} não encontrado.` });
    }
    return res.status(200).json(fornecedor);
  } catch (error) {
    console.error(`Erro ao obter o fornecedor com ID ${id}:`, error.message);
    return res.status(500).json({ error: 'Não foi possível obter o fornecedor.' });
  }
};

export const createFornecedor = async (req, res) => {
  const {
    razaoSocial,
    cnpj,
    representante,
    telefoneRepresentante,
    telefone,
    email,
    cep,
    estado,
    cidade,
    bairro,
    rua,
    numero,
    status,
  } = req.body;

  if (
    !razaoSocial || !cnpj || !representante || !telefoneRepresentante ||
    !telefone || !email || !cep || !estado || !cidade ||
    !bairro || !rua || !numero || !status
  ) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    const fornecedor = await fornecedorService.createFornecedor({
      razaoSocial,
      cnpj,
      representante,
      telefoneRepresentante,
      telefone,
      email,
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      status,
    });
    return res.status(201).json(fornecedor);
  } catch (error) {
    console.error('Erro ao criar o fornecedor:', error.message);
    return res.status(500).json({ error: 'Não foi possível criar o fornecedor.' });
  }
};

export const updateFornecedor = async (req, res) => {
  const { id } = req.params;
  const {
    razaoSocial,
    cnpj,
    representante,
    telefoneRepresentante,
    telefone,
    email,
    cep,
    estado,
    cidade,
    bairro,
    rua,
    numero,
    status,
  } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido ou não fornecido.' });
  }

  if (
    !razaoSocial || !cnpj || !representante || !telefoneRepresentante ||
    !telefone || !email || !cep || !estado || !cidade ||
    !bairro || !rua || !numero || !status
  ) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    const fornecedorAtualizado = await fornecedorService.updateFornecedor(Number(id), {
      razaoSocial,
      cnpj,
      representante,
      telefoneRepresentante,
      telefone,
      email,
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      status,
    });

    if (!fornecedorAtualizado) {
      return res.status(404).json({ error: `Fornecedor com ID ${id} não encontrado.` });
    }

    return res.status(200).json(fornecedorAtualizado);
  } catch (error) {
    console.error(`Erro ao atualizar o fornecedor com ID ${id}:`, error.message);
    return res.status(500).json({ error: 'Não foi possível atualizar o fornecedor.' });
  }
};

export const deleteFornecedor = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido ou não fornecido.' });
  }

  try {
    const fornecedorDeletado = await fornecedorService.deleteFornecedor(Number(id));
    if (!fornecedorDeletado) {
      return res.status(404).json({ error: `Fornecedor com ID ${id} não encontrado.` });
    }

    return res.status(200).json({
      message: 'Fornecedor deletado com sucesso.',
      fornecedor: fornecedorDeletado,
    });
  } catch (error) {
    console.error(`Erro ao deletar o fornecedor com ID ${id}:`, error.message);
    return res.status(500).json({ error: 'Não foi possível deletar o fornecedor.' });
  }
};
