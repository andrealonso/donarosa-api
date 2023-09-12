var prisma = require('../services/prisma')
var moment = require('moment')
class ContratoService {
    coverteDatas(payload) {
        if (payload.dt_prova) {
            payload.dt_prova = new Date(payload.dt_prova)
            payload.dt_saida = new Date(payload.dt_saida)
            payload.dt_devol = new Date(payload.dt_devol)
        }
        console.log(payload.created_at);
    }

    async create(payload) {
        try {
            this.coverteDatas(payload)
            const dados = await prisma.contrato.create({ data: payload })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }

    async getAll() {
        try {
            const dados = await prisma.contrato.findMany()
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }
    async getById(id) {
        try {
            const selDescricao = { select: { descricao: true } }
            const dados = await prisma.contrato.findUnique({
                where: { id }

            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }


    }
    async update(id, payload) {
        try {
            if (payload.senha) {
                payload.senha = this.criptSenha(payload.senha)
            }
            const dados = await prisma.contrato.update({ where: { id }, data: payload })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }
    async delete(id) {
        try {
            const dados = await prisma.contrato.delete({ where: { id } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }
}

module.exports = new ContratoService()