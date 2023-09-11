const express = require('express')
const router = express.Router()

const ClienteController = require('../controllers/ClienteController')

// Rotas de usuários
router.get('/clientes', ClienteController.listar)
router.get('/cliente/:id', ClienteController.exibir)
router.post('/cliente', ClienteController.criar)
router.put('/cliente/:id', ClienteController.editar)
router.delete('/cliente/:id', ClienteController.deletar)

module.exports = router