const { connect } = require('../services/db')
var prisma = require('../services/prisma')
var ClienteService = require("../repositories/ClienteService")
var { PessoaValidation } = require("../validations/PessoaValidation")

function verificarAcesso(user) {
    return true
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    const listaUsuariosAutorizados = [1, 3, 5]
    return listaUsuariosAutorizados.some(item => item == user.user_tipo_id)

}

class ClienteController {
    async criar(req, res) {
        const user = req.user
        // if (!verificarAcesso(user)) {
        //     res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
        //     return
        // }
        const dados = await ClienteService.create(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        const user = req.user
        if (!verificarAcesso(user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const skip = Number(req?.query?.skip) || 0
        const take = Number(req?.query?.take) || 100
        const busca = req?.query?.busca || ""

        const dados = await ClienteService.getAll(skip, take, busca)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        // const user = req.user
        // if (!verificarAcesso(user)) {
        //     res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
        //     return
        // }
        const dados = await ClienteService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async editar(req, res) {
        // const user = req.user
        // if (!verificarAcesso(user)) {
        //     res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
        //     return
        // }
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await ClienteService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        // const user = req.user
        // if (!verificarAcesso(user)) {
        //     res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
        //     return
        // }
        const id = Number(req?.params?.id)
        const dados = await ClienteService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new ClienteController()