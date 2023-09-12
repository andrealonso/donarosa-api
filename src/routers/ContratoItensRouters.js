const express = require('express')
const router = express.Router()

const ContratoItensController = require('../controllers/ContratoItensController')

// Rotas de usuários
router.get('/contrato-itens', ContratoItensController.listar)
router.get('/contrato-item/:id', ContratoItensController.exibir)
router.post('/contrato-item', ContratoItensController.criar)
router.put('/contrato-item/:id', ContratoItensController.editar)
router.delete('/contrato-item/:id', ContratoItensController.deletar)

module.exports = router