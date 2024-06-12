const express = require('express')
const router = express.Router()

const EventoController = require('../controllers/EventoController')

// Rotas de usuários
router.get('/eventos', EventoController.listar)
router.get('/evento/:id', EventoController.exibir)
router.post('/evento', EventoController.criar)
router.put('/evento/:id', EventoController.editar)
router.delete('/evento/:id', EventoController.deletar)

module.exports = router