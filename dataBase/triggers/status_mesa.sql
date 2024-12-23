/*
* @file Trigger_Status_Mesa_Comanda.sql
* @brief Trigger para atualizar o status da mesa quando uma comanda ativa for aberta
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Descrição: Esta trigger atualiza o status da mesa para 'TRUE' (ocupada) quando uma comanda ativa (status 'aberta') é associada a essa mesa.

DELIMITER $$

CREATE TRIGGER status_mesa
AFTER INSERT ON comandas
FOR EACH ROW
BEGIN
    -- Verifica se a comanda inserida está com status 'aberta'
    IF NEW.status = 'aberta' THEN
        -- Atualiza o status da mesa associada para 'TRUE' (ocupada)
        UPDATE mesas
        SET status = TRUE
        WHERE id = NEW.mesa_id;
    END IF;
END$$

DELIMITER ;
