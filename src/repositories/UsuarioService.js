var prisma = require('../services/prisma')
var moment = require('moment')
class UserService {

    async create(payload) {
        const data = await prisma.user.create({ data: payload })
        return data
    }
    async getAll(tipoId) {
        const dados = await prisma.user.findMany({
            select: {
                id: true,
                login: true,
                pessoa: {
                    select: { id: true, nome: true }
                },
                user_nivel: { select: { descricao: true } }
            }

        })
        return dados
    }
    async getById(id) {
        const selDescricao = { select: { descricao: true } }
        const dados = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                login: true,
                user_nivel_id: true
            }

        })
        return dados
    }
    async update(id, payload) {
        if (payload.senha) {
            payload.senha = this.criptSenha(payload.senha)
        }
        const dados = await prisma.user.update({ where: { id }, data: payload })
        return dados
    }
    async delete(id) {
        const dados = await prisma.user.delete({ where: { id } })
        return dados
    }
}

module.exports = new UserService()