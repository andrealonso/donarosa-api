const { connect } = require('../services/db')
const { PrismaClient } = require('@prisma/client')
const UserService = require('../repositories/UsuarioService')

class UsuarioController {
    async criar(req, res) {
        try {
            const data = await UserService.create(req.body)
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }

    async listar(req, res) {
        try {
            const data = await UserService.getAll()
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async exibir(req, res) {
        try {
            const data = await UserService.getById(Number(req?.params?.id))
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    }


    async editar(req, res) {
        try {
            const id = Number(req?.params?.id)
            const payload = req.body
            const data = await UserService.update(id, payload)
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }

    async deletar(req, res) {
        try {
            const id = Number(req?.params?.id)
            const data = await UserService.delete(id)
            res.status(200).send(data)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = new UsuarioController()