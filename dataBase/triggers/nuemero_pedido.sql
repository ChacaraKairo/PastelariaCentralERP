/*
* @file Pedidos_Trigger_Numero_Pedido.sql
* @brief Trigger para gerar o número do pedido automaticamente, com base no último pedido do mesmo dia.
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

DELIMITER $$

CREATE TRIGGER antes_de_inserir_pedido
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    DECLARE numero INT;

    -- Verificar se já existe um pedido no mesmo dia
    SELECT IFNULL(MAX(CAST(SUBSTRING_INDEX(numero_pedido, '-', -1) AS UNSIGNED)), 0) + 1 
    INTO numero
    FROM pedidos
    WHERE DATE(data_hora) = CURDATE();

    -- Definir o número do pedido, caso seja o primeiro do dia, será 1
    SET NEW.numero_pedido = CONCAT(DATE_FORMAT(CURDATE(), '%Y%m%d'), '-', numero);

END $$

DELIMITER ;
