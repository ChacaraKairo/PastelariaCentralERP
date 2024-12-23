/*
* @file Produtos.sql
* @brief Tabela de Produtos
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Descrição: Armazena informações sobre os produtos disponíveis para venda.

CREATE TABLE IF NOT EXISTS produtos (
    -- Identificador único do produto
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Descrição detalhada do produto
    descricao TEXT,
    
    -- Preço unitário do produto
    preco DECIMAL(10, 2) NOT NULL CHECK (preco >= 0),
    
    -- Data de cadastro do produto
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Status do produto (ativo ou inativo)
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    
    -- Imagem do produto (caminho ou URL)
    imagem_url VARCHAR(500),

    -- Chave estrangeira para a tabela de categorias
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS salgados (
    -- Identificador único do salgado
    id INT AUTO_INCREMENT PRIMARY KEY,
        
    -- Nome do produto
    nome VARCHAR(255) NOT NULL,

    -- Sabor ao qual é recheado
    recheio VARCHAR(255) NOT NULL,

    -- classiificação do salgado, se é frito ou assado
    classificacao ENUM('frito', 'assado') NOT NULL,''

    
    -- Status do salgado (ativo ou inativo)
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    )


