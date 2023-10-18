const express = require('express')
const router = express.Router()

const EstoqueController = require('../controllers/EstoqueController')

// Rotas de usuários
router.get('/estoques', EstoqueController.listar)
router.get('/estoque/:id', EstoqueController.exibir)
router.post('/estoque', EstoqueController.criar)
router.put('/estoque/:id', EstoqueController.editar)
router.delete('/estoque/:id', EstoqueController.deletar)

module.exports = router