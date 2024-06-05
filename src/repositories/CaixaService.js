var prisma = require('../services/prisma')
var moment = require('moment')
class CaixaService {
    pausaTeste(tempo) {
        return new Promise((resolve) => {
            setTimeout(resolve, tempo)
        })
    }
    async create(payload) {
        try {
            if (payload.data)
                payload.data = new Date(payload.data)
            const dados = await prisma.caixa_lanc.create({
                data: payload,

            })
            return { erro: false, dados }
        } catch (erro) {
            let msg = 'Erro ao tentar criar o registro no banco.'
            console.log(erro);
            return { erro: true, msg }
        }
    }


    async getAll(skip, take, busca) {
        await this.pausaTeste(0)
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.caixa_lanc.count(),
                prisma.caixa_lanc.findMany({
                    include: {
                        caixa_cate: true,
                        caixa_form_pag: true,
                        caixa_operacao: true,
                        usuario: { select: { login: true } }
                    },
                    where: {
                        data: {
                            gte: new Date(moment.utc().startOf('day')),
                            lte: new Date(moment.utc().endOf('day'))
                        }
                    }
                }),
            ])
            const qtdPaginas = Math.ceil(qtdRegistros / take)
            const dados = { qtdRegistros, qtdPaginas, registros }
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async filtrar(skip, take, busca) {
        await this.pausaTeste(0)
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.caixa_lanc.count(),
                prisma.caixa_lanc.findMany(),
            ])
            const qtdPaginas = Math.ceil(qtdRegistros / take)
            const dados = { qtdRegistros, qtdPaginas, registros }
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async getById(id) {
        try {
            const dados = await prisma.caixa_lanc.findUnique({
                where: { id },
            })
            const categoria = await prisma.caixa_cate.findMany()
            const formapag = await prisma.caixa_form_pag.findMany()
            return { erro: false, dados, categoria, formapag }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async update(id, payload) {
        try {
            if (payload.data)
                payload.data = new Date(payload.data)
            const dados = await prisma.caixa_lanc.update({ where: { id }, data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async delete(id) {
        try {
            const dados = await prisma.caixa_lanc.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }

    }
}

module.exports = new CaixaService()