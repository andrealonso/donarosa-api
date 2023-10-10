const express = require('express')
const router = express.Router()
const FilesController = require('../controllers/FilesController')
const multer = require('multer')
const multerConf = require('../config/multerImg')

router.post('/file/img', multer(multerConf).single('file'), FilesController.criar)
router.post('/file/img', FilesController.criar)
router.get('/files/imgs', FilesController.listar)
router.get('/files/img', FilesController.filtrar)
router.get('/file/:id', FilesController.exibir)
router.get('/file/download/:id', FilesController.download)
router.delete('/file/img/:id', FilesController.deletar)
// router.post('/upload', FilesController.criar)

module.exports = router