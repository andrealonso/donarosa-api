const { connect } = require('../services/db')
var prisma = require('../services/prisma')
var ProdutoService = require("../repositories/ProdutoService")

class ProdutoController {
    async criar(req, res) {
        const dados = await ProdutoService.create(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async listar(req, res) {

        const dados = await ProdutoService.getAll()

        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {

        const dados = await ProdutoService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }


    async editar(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await ProdutoService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const id = Number(req?.params?.id)
        const dados = await ProdutoService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new ProdutoController()