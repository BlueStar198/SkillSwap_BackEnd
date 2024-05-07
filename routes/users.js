const express = require('express');
const router = express.Router();
const User = require('../entities/user');
const mongoose = require('mongoose');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de usuários.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Busca todos os usuários no banco de dados
    res.status(200).json(users); // Retorna os usuários encontrados
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retorna os detalhes de um usuário pelo ID
 *     description: Retorna os detalhes de um usuário específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário a ser recuperado.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna os detalhes do usuário.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verifica se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    // Busca o usuário pelo ID no banco de dados
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user); // Retorna os detalhes do usuário encontrado
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com base nos dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Sucesso. Retorna os detalhes do usuário criado.
 *       400:
 *         description: Solicitação inválida. Verifique os dados fornecidos.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', async (req, res) => {
    try {
      // Verificar se já existe um usuário com o mesmo endereço de e-mail
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Criar um novo usuário com base nos dados da requisição
      const newUser = await User.create(req.body);
      res.status(201).json(newUser); // Retorna os detalhes do usuário criado
    } catch (error) {
      // Verificar se o erro é devido a uma violação da restrição de chave única
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        return res.status(400).json({ message: 'Duplicate key error: email already exists' });
      }
  
      // Caso contrário, trata-se de um erro interno do servidor
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
    

module.exports = router;
