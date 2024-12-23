DELIMITER $$

CREATE TRIGGER trg_check_cozinha
BEFORE INSERT ON pedidos_produtos
FOR EACH ROW
BEGIN
    -- Valida se o campo `cozinha` é true e se o produto não é da classificação 'salgado'
    IF NEW.cozinha = 1 THEN
        IF NOT EXISTS (SELECT 1 FROM salgados WHERE id = NEW.produto_id) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'O campo cozinha só pode ser verdadeiro para produtos da classificação "salgado".';
        END IF;
    END IF;
END$$

DELIMITER ;
