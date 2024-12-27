/**
 * @author Kairo Chácara
 * @since 1.0
 * @version 1.0
 * @see https://github.com/ChacaraKairo/PastelariaCentralERP.git
 * 
 * Este arquivo configura o servidor Express, inicializa middlewares e habilita rotas para o funcionamento da aplicação.
 * O servidor será configurado para escutar na porta especificada no arquivo de variáveis de ambiente (.env) ou na porta 3000 por padrão.
 * 
 * Bibliotecas utilizadas:
 * - `express`: Framework web para construir APIs e aplicativos server-side.
 * - `cors`: Middleware para habilitar CORS (Cross-Origin Resource Sharing), permitindo requisições de diferentes origens.
 * - `morgan`: Middleware para logar as requisições HTTP realizadas no servidor.
 * - `dotenv`: Carrega variáveis de ambiente do arquivo `.env` para uso na configuração da aplicação.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv'; // Carrega variáveis de ambiente do arquivo .env

// Importando as rotas
import cargoRoutes from './routes/cargoRoutes.js';  // Importa o arquivo de rotas de cargos
import categoriasRoutes from './routes/categoriasRoutes.js';  // Importa o arquivo de rotas de categorias

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000; // Porta do servidor, obtida das variáveis de ambiente ou 3000 como fallback

// Middleware
app.use(cors()); // Habilita CORS para todas as rotas, permitindo requisições de diferentes origens
app.use(express.json()); // Permite o recebimento de dados em formato JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Permite o recebimento de dados no formato x-www-form-urlencoded
app.use(morgan('dev')); // Utiliza o morgan para logar as requisições HTTP no formato 'dev'
// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro no servidor. Tente novamente mais tarde.' });
});


// Definindo as rotas
app.use('/api', cargoRoutes); // Prefixando as rotas de cargos com /api/cargos

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo ao aplicativo Pastelaria Central ERP!'); // Resposta simples na raiz
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Informa no console a porta onde o servidor está rodando
});

export default app; // Exporta o app para ser usado em outros arquivos (ex: testes ou configuração de rotas)
