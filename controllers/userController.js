const User = require('../entities/user');

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
    try {
        // Verificar se os campos obrigatórios estão presentes na requisição
        if (!req.body.name || !req.body.email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }
        
        // Criar um novo usuário
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        // Log do erro para depuração
        console.error('Error creating user:', error);
        // Responder com erro 500 e mensagem de erro
        res.status(500).json({ message: 'Internal server error' });
    }
};
