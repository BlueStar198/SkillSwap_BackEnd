const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { specs, swaggerUi } = require('./swagger');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Conexão com o banco de dados MongoDB (MongoDB Atlas)
const mongoURI = 'mongodb+srv://skillswap2024:fabrica2024@skillswap.luedgej.mongodb.net/myapp?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => console.log('Conexão bem-sucedida com o MongoDB'));

// Rotas para manipulação de usuários
app.use('/users', userRoutes);

// Rota para a documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
