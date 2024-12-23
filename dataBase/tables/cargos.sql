/*
* @file cargos.sql
* @brief Tabela de Cargos
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Descrição: Armazena informações sobre os cargos disponíveis na empresa, incluindo nome, descrição e salário-base.

CREATE TABLE IF NOT EXISTS cargos (
  -- Identificador único do cargo
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- Nome do cargo
  nome VARCHAR(255) NOT NULL UNIQUE,

  -- Descrição do cargo
  descricao TEXT,

  -- Salário base do cargo
  salarioBase DECIMAL(10, 2) DEFAULT 0.00,

  -- Status do cargo (ativo/inativo)
  status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);
