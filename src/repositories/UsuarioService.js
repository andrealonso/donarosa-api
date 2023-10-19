var prisma = require('../services/prisma')
var moment = require('moment')
var bcrypt = require('bcryptjs')

class UserService {
    async encryptarSenha(senha) {
        return await bcrypt.hash(senha, 10)
    }

    async create(payload) {
        try {
            payload.senha = await this.encryptarSenha(payload.senha)
            const dados = await prisma.user.create({ data: payload, select: { id: true, login: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getAll(tipoId) {
        try {
            const dados = await prisma.user.findMany({ select: { id: true, login: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getById(id) {
        try {
            const usuario = await prisma.user.findUnique({
                where: { id },
                include: {
                    funcionario: { select: { id: true, nome: true } },
                    user_nivel: true
                }
            })
            const listaNivel = await prisma.user_Nivel.findMany()
            delete usuario.senha
            const dados = usuario
            return { erro: false, dados, listaNivel }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async update(id, payload) {
        try {
            if (payload?.senha)
                payload.senha = await this.encryptarSenha(payload.senha)
            else
                delete payload.senha

            const dados = await prisma.user.update({ where: { id }, data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar alterar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.user.delete({ where: { id } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }


}

module.exports = new UserService()