/*
* @file Pedidos.sql
* @brief Tabela de Pedidos
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    -- Identificador único do pedido
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Número do pedido
    numero_pedido VARCHAR(50) NOT NULL UNIQUE,

    -- Identificador da mesa associada ao pedido
    comanda_id INT,

    -- Data e hora do pedido
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Status do pedido
    status ENUM('pendente', 'em_preparo', 'pronto', 'finalizado', 'cancelado') DEFAULT 'pendente',

    -- Total do pedido
    total DECIMAL(10, 2) DEFAULT 0.00,

    -- Garçom que fez o pedido
    funcionario_id CHAR(11),

    -- Observações gerais do pedido
    observacoes TEXT,

    -- Relacionamento com a tabela funcionarios
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(cpf)
        ON DELETE SET NULL ON UPDATE CASCADE,

    -- Relacionamento com a tabela mesas
    FOREIGN KEY (comanda_id) REFERENCES comandas(id)
        ON DELETE SET NULL ON UPDATE CASCADE
);
