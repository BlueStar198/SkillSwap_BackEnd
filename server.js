const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();

// Middleware para processar o corpo da requisição no formato JSON
app.use(express.json());

// URL de conexão com o MongoDB Atlas
const mongoURI = 'mongodb+srv://skillswap2024:fabrica2024@skillswap.luedgej.mongodb.net/myapp?retryWrites=true&w=majority';

// Conexão com o banco de dados MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

// Rotas para usuários
app.use('/api/users', userRoutes);

// Porta em que o servidor irá escutar as requisições
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
