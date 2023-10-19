const express = require('express')
const router = express.Router()

const FuncionarioController = require('../controllers/FuncionarioController')

// Rotas de usuários
router.get('/funcionarios', FuncionarioController.listar)
router.get('/funcionario/:id', FuncionarioController.exibir)
router.post('/funcionario', FuncionarioController.criar)
router.put('/funcionario/:id', FuncionarioController.editar)
router.delete('/funcionario/:id', FuncionarioController.deletar)

module.exports = router