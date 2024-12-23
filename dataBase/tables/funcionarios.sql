/*
* @file funcionários.sql
* @brief Tabela de Funcionários
* @author Kairo Chácara
* @since 1.0
* @version 1.0
* @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
*/

-- Descrição: Armazena informações sobre os funcionários, incluindo dados pessoais, endereço, cargo e informações contratuais.

CREATE TABLE IF NOT EXISTS funcionarios (
  -- Identificador único do funcionário
  id CHAR(11) PRIMARY KEY,
  
  -- Nome completo do funcionário
  nome VARCHAR(255) NOT NULL,

  -- Gênero do funcionário: 0 = Masculino, 1 = Feminino
  genero ENUM('masculino', 'feminino') NOT NULL,
  
  -- Endereço de e-mail único do funcionário
  email VARCHAR(255) NOT NULL UNIQUE,
  
  -- Número de telefone do funcionário
  telefone VARCHAR(15) NOT NULL,
  
  -- Código postal do endereço do funcionário
  cep CHAR(9) NOT NULL,
  
  -- Sigla do estado onde o funcionário reside
  estado CHAR(2) NOT NULL,
  
  -- Cidade onde o funcionário reside
  cidade VARCHAR(255) NOT NULL,
  
  -- Bairro do endereço do funcionário
  bairro VARCHAR(255) NOT NULL,
  
  -- Nome da rua do endereço do funcionário
  rua VARCHAR(255) NOT NULL,
  
  -- Número da residência do funcionário
  numero SMALLINT NOT NULL,
  
  -- CPF único do funcionário
  cpf CHAR(11) NOT NULL UNIQUE,

  -- Número do PisPasep do funcionário
  pis CHAR(11) NOT NULL UNIQUE,
  
  -- Data de nascimento do funcionário
  dataNascimento DATE NOT NULL,
  
  -- Cargo que o funcionário ocupa
  idCargo INT NOT NULL,
  
  -- Setor em que o funcionário trabalha
  setor VARCHAR(255) NOT NULL,
  
  -- Data de admissão do funcionário
  dataAdmissao DATE NOT NULL,
  
  -- Data de demissão do funcionário, se aplicável
  dataDemissao DATE,
  
  -- Salário do funcionário
  salario DECIMAL(10, 2) DEFAULT 0.00,
  
  -- Senha para acesso ao sistema (deve ser armazenada com hashing)
  senha VARCHAR(255),

  -- Status do funcionário
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',

  -- Chave estrangeira para o cargo
  FOREIGN KEY (idCargo) REFERENCES cargos(id)
);
