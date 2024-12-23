/*
* @file Fornecedores.sql
* @brief Tabela de Fornecedores
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Descrição: Armazena informações sobre os fornecedores que fornecem produtos ou serviços para a empresa.

CREATE TABLE IF NOT EXISTS fornecedores (
  -- Identificador único do fornecedor
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- Nome da empresa ou razão social do fornecedor
  razaoSocial VARCHAR(255) NOT NULL,

  -- CNPJ único do fornecedor
  cnpj CHAR(14) NOT NULL UNIQUE,

  -- Nome do representante
  representante VARCHAR(255) NOT NULL,

  -- Telefone do representante
  telefoneRepresentante CHAR(11) NOT NULL,

  -- Telefone para contato
  telefone CHAR(11) NOT NULL,

  -- Endereço de e-mail do fornecedor
  email VARCHAR(255) NOT NULL UNIQUE,

  -- Código postal do endereço do fornecedor
  cep CHAR(9) NOT NULL,

  -- Estado onde o fornecedor está localizado
  estado CHAR(2) NOT NULL,

  -- Cidade onde o fornecedor está localizado
  cidade VARCHAR(255) NOT NULL,

  -- Bairro do endereço do fornecedor
  bairro VARCHAR(255) NOT NULL,

  -- Rua do endereço do fornecedor
  rua VARCHAR(255) NOT NULL,

  -- Número do endereço do fornecedor
  numero SMALLINT NOT NULL,

  -- Status do fornecedor (ativo/inativo)
  status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);
