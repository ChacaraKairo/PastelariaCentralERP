/*
* @file Pedidos_Produtos.sql
* @brief Tabela de Pedidos_Produtos (itens dos pedidos)
* @author Kairo Chácara
* @since 1.0
* @version 1.1
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Tabela de Pedidos_Produtos (itens dos pedidos)

-- Atualize a tabela pedidos_produtos
CREATE TABLE IF NOT EXISTS pedidos_produtos (
    -- Identificador único do item no pedido
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Chave estrangeira para o pedido
    pedido_id INT NOT NULL,

    -- Chave estrangeira para o produto
    produto_id INT NOT NULL,

    -- Quantidade do produto no pedido
    quantidade INT NOT NULL CHECK (quantidade > 0),

    -- Subtotal do produto
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),

    -- Campo cozinha: true para itens preparados na hora
    cozinha BOOLEAN DEFAULT 0,

    -- Restrição para validar o campo cozinha somente para produtos salgados
    CHECK (cozinha IN (0, 1)),

    -- Relacionamento com a tabela pedidos
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    -- Relacionamento com a tabela produtos
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);