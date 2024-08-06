const { PrismaClient } = require('@prisma/client')
const ContratoService = require('../repositories/ContratoService')

class ContratoController {
    async criar(req, res) {
        const dados = await ContratoService.create(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }


    async listar(req, res) {
        const dados = await ContratoService.getAll()
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        const dados = await ContratoService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async editar(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await ContratoService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async addProd(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await ContratoService.addProd(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async addPag(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await ContratoService.addPag(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async delPag(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await ContratoService.delPag(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const id = Number(req?.params?.id)
        const dados = await ContratoService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new ContratoController()