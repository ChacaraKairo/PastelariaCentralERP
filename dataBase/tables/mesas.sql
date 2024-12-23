/*
* @file Mesas.sql
* @brief Tabela de Mesas
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Tabela para armazenar informações das mesas
CREATE TABLE IF NOT EXISTS mesas (
    -- Identificador único da mesa
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Número da mesa
    numero SMALLINT NOT NULL UNIQUE,

    -- Capacidade de pessoas na mesa
    capacidade SMALLINT NOT NULL CHECK (capacidade > 0),

    -- Status da mesa (0 = livre, 1 = ocupada, 2 = reservada)
    `status` TINYINT(1) DEFAULT 0,

    -- Descrição ou observação opcional
    descricao TEXT,

    -- Data e hora do último status atualizado
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
