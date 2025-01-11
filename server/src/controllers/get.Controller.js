import * as getService from '../service/get.Services.js';
import { Prisma } from '@prisma/client';

export const getAllData = async (req, res) => {
  try {
    const { entidade } = req.params;
    const data = await getService.getAllData(entidade);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getEntidade = async (req, res) => {
  try {
    const { entidade } = req.params;
    const data = await getService.getEntidade(entidade);

    // Filtrar apenas os campos 'Field' e 'Type'
    const filteredData = data.map(coluna => ({
      nome: coluna.Field,
      tipo: coluna.Type
    }));

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const validaCampo = async (req, res) => {
  try {
    const { entidade, campo } = req.params;
    const data = await getService.validaCampo(entidade, campo);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getDataByField = async (req, res) => {
  try {
    let { entidade, campo, valor } = req.params;
    const tipo = await getService.validaCampo(entidade, campo);
    console.log(tipo);
    if (tipo) {
      if (tipo.includes('tinyint(1)')) {
        valor = valor === '1' || valor === true;
      }
      else if (tipo.includes('int') || tipo.includes('smallint') || tipo.includes('tinyint')) {
        valor = parseInt(valor, 10);
        if (isNaN(valor)) {
          return res.status(400).json({ error: `O campo "${campo}" deve ser um número válido.` });
        }
      } else if (tipo.includes('varchar') || tipo.includes('text') || tipo.includes('char')) {
      } else if (tipo.includes('timestamp') || tipo.includes('date')) {
        valor = new Date(valor);
        if (isNaN(valor.getTime())) {
          return res.status(400).json({ error: `O campo "${campo}" deve ser uma data válida.` });
        }
      }
    }
    const data = await getService.getDataByField(entidade, campo, valor);
    if (data.length === 0) {
      return res.status(404).json({ error: `Nenhum dado encontrado para o campo "${campo}" com o valor "${valor}".` });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(`Erro ao buscar dados para a entidade "${req.params.entidade}" e campo "${req.params.campo}":`, error.message);
    res.status(500).json({ error: 'Erro ao buscar dados. Tente novamente mais tarde.' });
  }
};







