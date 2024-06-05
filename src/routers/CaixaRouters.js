const express = require('express')
const router = express.Router()

const CaixaController = require('../controllers/CaixaController')

// Rotas de usuários
router.get('/caixas', CaixaController.listar)
router.get('/caixa/:id', CaixaController.exibir)
router.post('/caixa', CaixaController.criar)
router.post('/caixa/filtrar', CaixaController.criar)
router.put('/caixa/:id', CaixaController.editar)
router.delete('/caixa/:id', CaixaController.deletar)

module.exports = router