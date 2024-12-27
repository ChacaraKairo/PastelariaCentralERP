cargoscargoscargos/*
* @file Categorias.sql
* @brief Tabela de Categorias de Produtos
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Descrição: Armazena as categorias dos produtos, permitindo a classificação dos itens para facilitar a busca e organização no sistema.

CREATE TABLE IF NOT EXISTS categorias (
  -- Identificador único da categoria
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Nome da categoria, utilizado para identificação do tipo de produto
  nome VARCHAR(255) NOT NULL UNIQUE,
  
  -- Descrição adicional da categoria, se necessário
  descricao TEXT,

  -- Data de criação da categoria
  dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
