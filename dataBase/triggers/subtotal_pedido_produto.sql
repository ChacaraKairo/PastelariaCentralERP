
/*

@file Trigger_Subtotal_Pedido_Produto.sql
@brief Trigger para calcular o subtotal em pedidos_produtos
@author Kairo Chácara
@since 1.0
@version 1.0
@see https://github.com/ChacaraKairo/PastelariaCentralERP.git */
/* Descrição: Esta trigger calcula automaticamente o subtotal do produto no pedido antes de inserir -- um registro na tabela 'pedidos_produtos'. O cálculo é feito buscando o preço unitário na tabela -- 'produtos' e multiplicando pela quantidade informada.*/
DELIMITER $$
CREATE TRIGGER subtotal_pedido_produto
BEFORE INSERT ON pedidos_produtos
FOR EACH ROW
BEGIN
    -- Variável para armazenar o preço unitário do produto
    DECLARE preco_unitario DECIMAL(10, 2);

    -- Buscar o preço unitário do produto na tabela produtos
    SELECT preco INTO preco_unitario 
    FROM produtos 
    WHERE id = NEW.produto_id;

    -- Calcular o subtotal e atribuir ao novo registro
    SET NEW.subtotal = preco_unitario * NEW.quantidade;
END$$
DELIMITER ;
