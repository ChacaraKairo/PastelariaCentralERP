/*
* @file Comandas.sql
* @brief Tabela de Comandas
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Descrição: A tabela de comandas é utilizada para registrar e controlar pedidos em andamento, geralmente associados a mesas ou clientes.

CREATE TABLE IF NOT EXISTS comandas (
    -- Identificador único da comanda
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Número da comanda (identificador físico utilizado)
    numero_comanda VARCHAR(20) NOT NULL UNIQUE,

    -- Data e hora de abertura da comanda
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Status da comanda (aberta, fechada, cancelada)
    status ENUM('aberta', 'fechada', 'cancelada') DEFAULT 'aberta',

    -- Valor total da comanda (calculado com base nos pedidos)
    valor_total DECIMAL(10, 2) DEFAULT 0.00,

    -- Relacionamento opcional com a mesa (se aplicável)
    mesa_id INT,
    FOREIGN KEY (mesa_id) REFERENCES mesas(id)
        ON DELETE SET NULL ON UPDATE CASCADE
);
