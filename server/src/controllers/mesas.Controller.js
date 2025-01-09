import * as mesasService from '../service/mesas.Service.js';
import { format } from 'date-fns';
import { id, ptBR } from 'date-fns/locale';

export const createMesa = async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);
    const { numero, capacidade, descricao } = req.body;
    const mesa = await mesasService.createMesa({ numero, capacidade, descricao });
    const mesaFormatada = {
      ...mesa,
      atualizado_em: format(new Date(mesa.atualizado_em), "dd/MM/yyyy HH:mm:ss", { locale: ptBR }),
    };
    res.status(201).json(mesaFormatada);
  } catch (error) {
    console.error("Erro ao criar a mesa:", error);
    res.status(500).json({ error: "Erro interno do servidor. Não foi possível criar a mesa." });
  }
};
export const getMesas = async (req, res) => {
  try {
    const mesas = await mesasService.getMesas();
    const mesasFormatadas = mesas.map(mesa => ({
      ...mesa,
      atualizado_em: format(new Date(mesa.atualizado_em), "dd/MM/yyyy HH:mm:ss", { locale: ptBR }),
    }));

    res.status(200).json(mesasFormatadas);
  } catch (error) {
    console.error('Erro ao obter as mesas:', error);
    res.status(500).json({ error: 'Não foi possível obter as mesas.' });
  }
};
export const getMesaById = async (req, res) => {
  try {
    const { id } = req.params;

    const mesa = await mesasService.getMesaById(Number(id));
    if (!mesa) {
      return res.status(404).json({ error: 'Mesa não encontrada.' });
    }
    const mesaFormatada = {
      ...mesa,
      atualizado_em: format(new Date(mesa.atualizado_em), "dd/MM/yyyy HH:mm:ss", { locale: ptBR }),
    };
    res.status(200).json(mesaFormatada);
  } catch (error) {
    console.error('Erro ao obter a mesa:', error);
    res.status(500).json({ error: 'Não foi possível obter a mesa.' });
  }
};
export const updateMesa = async (req, res) => {
  const { id } = req.params;
  const { numero, status, capacidade, descricao } = req.body; // Desestrutura os dados do corpo da requisição

  try {
    // Chama o serviço para atualizar a mesa com os dados recebidos
    const mesa = await mesasService.updateMesa(Number(id), {
      numero,
      status,
      capacidade,
      descricao,
    });

    // Retorna a mesa atualizada
    res.status(200).json(mesa);
  } catch (error) {
    console.error('Erro ao atualizar a mesa:', error);
    res.status(400).json({ error: error.message });
  }
};
export const getStatusmesa = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtém o status da mesa pelo ID
    const status = await mesasService.getStatusmesa(Number(id));

    // Verifica se a mesa foi encontrada
    if (status === undefined || status === null) {
      return res.status(404).json({ error: 'Mesa não encontrada.' });
    }

    // Retorna o status da mesa
    res.status(200).json({ status });
  } catch (error) {
    console.error('Erro ao obter o status da mesa:', error);
    res.status(500).json({ error: 'Não foi possível obter o status da mesa.' });
  }
};

export const updateStatusMesa = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID foi fornecido e é válido
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID inválido ou não fornecido.' });
    }

    // Atualiza o status da mesa e retorna o novo status
    const mesaAtualizada = await mesasService.updateStatusMesa(Number(id));

    // Verifica se a mesa foi encontrada e atualizada
    if (!mesaAtualizada) {
      return res.status(404).json({ error: 'Mesa não encontrada.' });
    }

    // Retorna o status atualizado da mesa
    res.status(200).json({
      message: 'Status da mesa atualizado com sucesso.',
      mesa: {
        id: mesaAtualizada.id,
        status: mesaAtualizada.status,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar o status da mesa:', error);
    res.status(500).json({ error: 'Não foi possível atualizar o status da mesa.' });
  }
};

export const deleteMesa = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID inválido ou não fornecido.' });
    }

    // Chama o serviço para deletar a mesa e retorna a mesa deletada
    const mesaDeletada = await mesasService.deleteMesa(Number(id));

    // Verifica se a mesa foi encontrada e deletada
    if (!mesaDeletada) {
      return res.status(404).json({ error: 'Mesa não encontrada.' });
    }

    // Retorna uma mensagem de sucesso e os dados da mesa deletada
    res.status(200).json({
      message: 'Mesa deletada com sucesso.',
      mesaDeletada: mesaDeletada, // Retorna os dados da mesa deletada
    });
  } catch (error) {
    console.error('Erro ao deletar a mesa:', error);
    res.status(500).json({ error: 'Não foi possível deletar a mesa.' });
  }
};


