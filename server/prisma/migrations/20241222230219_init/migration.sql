-- CreateTable
CREATE TABLE `cargos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` TEXT NULL,
    `salarioBase` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `status` ENUM('ativo', 'inativo') NULL DEFAULT 'ativo',

    UNIQUE INDEX `nome`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` TEXT NULL,
    `dataCriacao` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `nome`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comandas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_comanda` VARCHAR(20) NOT NULL,
    `data_abertura` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('aberta', 'fechada', 'cancelada') NULL DEFAULT 'aberta',
    `valor_total` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `mesa_id` INTEGER NULL,

    UNIQUE INDEX `numero_comanda`(`numero_comanda`),
    INDEX `mesa_id`(`mesa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `razaoSocial` VARCHAR(255) NOT NULL,
    `cnpj` CHAR(14) NOT NULL,
    `representante` VARCHAR(255) NOT NULL,
    `telefoneRepresentante` CHAR(11) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cep` CHAR(9) NOT NULL,
    `estado` CHAR(2) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `bairro` VARCHAR(255) NOT NULL,
    `rua` VARCHAR(255) NOT NULL,
    `numero` SMALLINT NOT NULL,
    `status` ENUM('ativo', 'inativo') NULL DEFAULT 'ativo',

    UNIQUE INDEX `cnpj`(`cnpj`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionarios` (
    `id` CHAR(11) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `genero` ENUM('masculino', 'feminino') NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `cep` CHAR(9) NOT NULL,
    `estado` CHAR(2) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `bairro` VARCHAR(255) NOT NULL,
    `rua` VARCHAR(255) NOT NULL,
    `numero` SMALLINT NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `pis` CHAR(11) NOT NULL,
    `dataNascimento` DATE NOT NULL,
    `idCargo` INTEGER NOT NULL,
    `setor` VARCHAR(255) NOT NULL,
    `dataAdmissao` DATE NOT NULL,
    `dataDemissao` DATE NULL,
    `salario` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `senha` VARCHAR(255) NULL,
    `status` ENUM('ativo', 'inativo') NULL DEFAULT 'ativo',

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `cpf`(`cpf`),
    UNIQUE INDEX `pis`(`pis`),
    INDEX `idCargo`(`idCargo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mesas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` SMALLINT NOT NULL,
    `capacidade` SMALLINT NOT NULL,
    `status` BOOLEAN NULL DEFAULT false,
    `descricao` TEXT NULL,
    `atualizado_em` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `numero`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_pedido` VARCHAR(50) NOT NULL,
    `comanda_id` INTEGER NULL,
    `data_hora` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('pendente', 'em_preparo', 'pronto', 'finalizado', 'cancelado') NULL DEFAULT 'pendente',
    `total` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `funcionario_id` CHAR(11) NULL,
    `observacoes` TEXT NULL,

    UNIQUE INDEX `numero_pedido`(`numero_pedido`),
    INDEX `comanda_id`(`comanda_id`),
    INDEX `funcionario_id`(`funcionario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedidos_produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedido_id` INTEGER NOT NULL,
    `produto_id` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `cozinha` BOOLEAN NULL DEFAULT false,

    INDEX `pedido_id`(`pedido_id`),
    INDEX `produto_id`(`produto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria_id` INTEGER NOT NULL,
    `descricao` TEXT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `data_cadastro` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('ativo', 'inativo') NULL DEFAULT 'ativo',
    `imagem_url` VARCHAR(500) NULL,

    INDEX `categoria_id`(`categoria_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `revenda` (
    `id` INTEGER NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `codigo_de_barras` VARCHAR(255) NOT NULL,
    `fornecedor_id` INTEGER NOT NULL,

    UNIQUE INDEX `codigo_de_barras`(`codigo_de_barras`),
    INDEX `fornecedor_id`(`fornecedor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salgados` (
    `id` INTEGER NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `recheio` VARCHAR(255) NOT NULL,
    `classificacao` ENUM('frito', 'assado') NOT NULL,
    `status` ENUM('ativo', 'inativo') NULL DEFAULT 'ativo',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comandas` ADD CONSTRAINT `comandas_ibfk_1` FOREIGN KEY (`mesa_id`) REFERENCES `mesas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`idCargo`) REFERENCES `cargos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios`(`cpf`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`comanda_id`) REFERENCES `comandas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidos_produtos` ADD CONSTRAINT `pedidos_produtos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidos_produtos` ADD CONSTRAINT `pedidos_produtos_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revenda` ADD CONSTRAINT `revenda_ibfk_1` FOREIGN KEY (`id`) REFERENCES `produtos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revenda` ADD CONSTRAINT `revenda_ibfk_2` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salgados` ADD CONSTRAINT `salgados_ibfk_1` FOREIGN KEY (`id`) REFERENCES `produtos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
