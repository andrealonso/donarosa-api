const express = require('express')
const router = express.Router()

const ContratoController = require('../controllers/ContratoController')

// Rotas de usuários
router.get('/contratos', ContratoController.listar)
router.get('/contrato/:id', ContratoController.exibir)
router.post('/contrato', ContratoController.criar)
router.put('/contrato/:id', ContratoController.editar)
router.put('/contrato-addprod/:id', ContratoController.addProd)
router.put('/contrato-addpag/:id', ContratoController.addPag)
router.put('/contrato-delpag/:id', ContratoController.delPag)
router.delete('/contrato/:id', ContratoController.deletar)

module.exports = router