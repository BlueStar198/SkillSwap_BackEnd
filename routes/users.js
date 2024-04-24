const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas para manipulação de usuários
router.post('/', userController.createUser);
router.get('/', userController.getUsers);

module.exports = router;
