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
        this.coverteDatas(payload)
        return {}
        const data = await prisma.contrato.create({ data: payload })
        return data
    }
    async getAll() {
        const dados = await prisma.contrato.findMany()
        return dados
    }
    async getById(id) {
        const selDescricao = { select: { descricao: true } }
        const dados = await prisma.contrato.findUnique({
            where: { id }

        })
        console.log(dados.created_at.toLocaleString('pt-br'));
        return dados
    }
    async update(id, payload) {
        if (payload.senha) {
            payload.senha = this.criptSenha(payload.senha)
        }
        const dados = await prisma.contrato.update({ where: { id }, data: payload })
        return dados
    }
    async delete(id) {
        const dados = await prisma.contrato.delete({ where: { id } })
        return dados
    }
}

module.exports = new ContratoService()