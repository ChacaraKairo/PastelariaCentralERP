# ERP Pastelaria - Versão 1.0

Bem-vindo ao **ERP Pastelaria**, um sistema de gestão desenvolvido para simplificar e automatizar as operações de uma pastelaria. Esta é a primeira versão do sistema, focada no **Cadastro de Pedidos** e no **Gerenciamento de Mesas**, utilizando as tecnologias **Node.js**, **Electron.js** e **TypeORM**.

---

## 🚀 Objetivo
Esta aplicação tem como objetivo facilitar o dia a dia de uma pastelaria, oferecendo uma interface intuitiva para:
- Gerenciar o status das mesas.
- Registrar e organizar pedidos.
- Monitorar o fluxo de preparo e entrega de produtos.

---

## 🎯 Funcionalidades
### **Versão 1.0**
1. **Gerenciamento de Mesas**:
   - Cadastro de mesas com número e status.
   - Atualização do status das mesas (disponível/ocupada).

2. **Gestão de Pedidos**:
   - Registro de pedidos associados às mesas.
   - Adição de itens ao pedido com cálculo automático do total.
   - Atualização do status do pedido (pendente, em preparo, pronto, entregue).

3. **Visualização em Tempo Real**:
   - Painel para monitorar o status das mesas e pedidos.

---

## 🛠 Tecnologias Utilizadas
- **Node.js**: Backend para APIs RESTful.
- **Electron.js**: Interface desktop multiplataforma.
- **TypeORM**: Gerenciamento de banco de dados relacional.
- **TypeScript**: Desenvolvimento seguro e tipado.
- **Banco de Dados**: MySQL (ou PostgreSQL).

---

## 📂 Estrutura do Projeto
O projeto está estruturado para permitir fácil expansão em versões futuras, que incluirão controle de estoque, produção, finanças e questões jurídicas. A arquitetura modular facilita a implementação de novas funcionalidades sem impactar as existentes.

src/ ├── controllers/ # Controladores das APIs ├── entities/ # Definições das tabelas no banco de dados ├── migrations/ # Migrações para versionamento do banco de dados ├── repositories/ # Repositórios para acesso ao banco de dados ├── services/ # Lógica de negócios ├── routes/ # Rotas das APIs └── index.ts # Arquivo principal

---

## 🗓 Próximas Versões
- **Versão 2.0**: Controle de Estoque e Produção.
- **Versão 3.0**: Controle de Finanças.
- **Versão 4.0**: Questões Jurídicas e Relatórios Fiscais.

---

## ⚙️ Como Executar
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/erp-pastelaria.git
   cd erp-pastelaria
