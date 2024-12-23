/*
* @file v_itens_comanda.sql
* @brief View para exibir os itens de uma comanda, incluindo detalhes sobre o produto, quantidade, subtotal e a mesa associada.
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*
* Descrição: Esta view reúne informações sobre os produtos de um pedido associado a uma comanda,
* incluindo o identificador da comanda, identificador da mesa, nome do produto, quantidade pedida e o subtotal.
* A view faz junções entre as tabelas de pedidos, produtos, comandas e mesas.
*
* Campos da View:
* - id_comanda: Identificador único da comanda.
* - id_mesa: Identificador único da mesa associada à comanda.
* - produto: Descrição do produto.
* - quantidade: Quantidade do produto no pedido.
* - subtotal: Subtotal calculado como quantidade * preço do produto.
*
* Tabelas envolvidas:
* - pedidos_produtos (pp): Contém os itens dos pedidos, com a quantidade e o subtotal.
* - pedidos (p): Tabela de pedidos, com informações sobre o pedido.
* - produtos (p): Tabela de produtos, com informações sobre os produtos vendidos.
* - comandas (c): Tabela de comandas, com informações sobre as comandas, associadas a uma mesa.
* - mesas (m): Tabela de mesas, com informações sobre as mesas do estabelecimento.
*/

CREATE VIEW v_itens_comanda AS
SELECT 
    c.id AS id_comanda, -- ID da comanda
    m.id AS id_mesa, -- ID da mesa
    p.descricao AS produto, -- Nome do produto
    pp.quantidade, -- Quantidade do produto no pedido
    pp.subtotal -- Subtotal do produto
FROM 
    pedidos_produtos pp
JOIN 
    pedidos p ON pp.pedido_id = p.id
JOIN 
    produtos p ON pp.produto_id = p.id
JOIN 
    comandas c ON p.comanda_id = c.id
JOIN 
    mesas m ON c.mesa_id = m.id; -- Relacionamento entre comanda e mesa
