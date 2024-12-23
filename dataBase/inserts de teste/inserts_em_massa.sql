INSERT INTO cargos (nome, descricao, salarioBase, status)
VALUES
    ('Garçom', 'Responsável pelo atendimento aos clientes, anotando pedidos e entregando as comandas.', 1500.00, 'ativo'),
    ('Cozinheiro', 'Responsável pelo preparo de alimentos, seguindo as receitas e mantendo a qualidade.', 1800.00, 'ativo'),
    ('Recepcionista', 'Responsável pelo atendimento inicial aos clientes, controle de reservas e organização da fila de espera.', 1200.00, 'ativo'),
    ('Gerente', 'Responsável pela gestão da operação do estabelecimento, controle de equipe e recursos.', 3500.00, 'ativo'),
    ('Supervisor', 'Responsável por supervisionar o trabalho da equipe, garantindo o cumprimento das normas e qualidade no atendimento.', 2200.00, 'ativo');

-- Inserir cargo inativo (para demonstrar o uso do status)
INSERT INTO cargos (nome, descricao, salarioBase, status)
VALUES
    ('Auxiliar de Cozinha', 'Responsável por auxiliar na preparação dos alimentos e organização da cozinha.', 1100.00, 'inativo');

INSERT INTO funcionarios (id, nome, genero, email, telefone, cep, estado, cidade, bairro, rua, numero, cpf, pis, dataNascimento, idCargo, setor, dataAdmissao, salario, senha, status)
VALUES
    ('12345678901', 'João Silva', 'masculino', 'joao.silva@email.com', '11987654321', '12345678', 'SP', 'São Paulo', 'Centro', 'Rua A', 10, '12345678901', '12345678901', '1990-05-10', 1, 'Atendimento', '2023-03-15', 1500.00, 'senha123', 'ativo'),
    ('23456789012', 'Maria Oliveira', 'feminino', 'maria.oliveira@email.com', '11912345678', '87654321', 'RJ', 'Rio de Janeiro', 'Botafogo', 'Rua B', 20, '23456789012', '23456789012', '1985-07-22', 2, 'Cozinha', '2022-11-01', 1800.00, 'senha456', 'ativo'),
    ('34567890123', 'Carlos Souza', 'masculino', 'carlos.souza@email.com', '11345678901', '11223344', 'MG', 'Belo Horizonte', 'Savassi', 'Rua C', 30, '34567890123', '34567890123', '1982-03-14', 3, 'Gestão', '2021-06-10', 3500.00, 'senha789', 'inativo'),
    ('45678901234', 'Fernanda Costa', 'feminino', 'fernanda.costa@email.com', '11876543210', '22334455', 'PR', 'Curitiba', 'Centro', 'Rua D', 40, '45678901234', '45678901234', '1993-12-05', 4, 'Recepção', '2023-01-01', 1300.00, 'senha101', 'ativo');

