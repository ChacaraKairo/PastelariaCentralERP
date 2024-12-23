/*
* @file Produtos.sql
* @brief Tabelas de Produtos, Salgados e Revenda
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Tabela de produtos contendo os dados básicos de todos os produtos
CREATE TABLE IF NOT EXISTS produtos (
    -- Identificador único do produto
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Chave estrangeira para a tabela de categorias
    categoria_id INT NOT NULL,

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

    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabela de salgados contendo dados complementares
CREATE TABLE IF NOT EXISTS salgados (
    -- Identificador único do salgado vinculado ao produto
    id INT PRIMARY KEY,

    -- Nome do salgado
    nome VARCHAR(255) NOT NULL,

    -- Sabor do salgado
    recheio VARCHAR(255) NOT NULL,

    -- Classificação do salgado: frito ou assado
    classificacao ENUM('frito', 'assado') NOT NULL,

    -- Status do salgado (ativo ou inativo)
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',

    FOREIGN KEY (id) REFERENCES produtos(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela de revenda contendo dados complementares
CREATE TABLE IF NOT EXISTS revenda (
    -- Identificador único da revenda vinculado ao produto
    id INT PRIMARY KEY,

    -- Nome do produto de revenda
    nome VARCHAR(255) NOT NULL,

    -- Código de barras do produto (deve ser único)
    codigo_de_barras VARCHAR(255) NOT NULL UNIQUE,

    -- id do fornecedor
    fornecedor_id INT NOT NULL,

    FOREIGN KEY (id) REFERENCES produtos(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
git@github.com:ChacaraKairo/PastelariaCentralERP.git