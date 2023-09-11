var prisma = require('../services/prisma')
var moment = require('moment')
class ClienteService {
    formatData(data) {
        if (!data) return null
        if (moment(data, 'YYYY-MM-DD', true).isValid())
            return moment(data).format('YYYY-MM-DD')
    }

    pausaTeste(tempo) {
        return new Promise((resolve) => {
            setTimeout(resolve, tempo)
        })
    }
    async create(payload) {
        try {
            if (payload.dt_nasc) {
                payload.dt_nasc = new Date(payload.dt_nasc + '00:00:00')
            }
            const dados = await prisma.cliente.create({
                data: payload,
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }


    async getAll(skip, take, busca) {
        await this.pausaTeste(0)
        var filtro = {
            where: {
                deleted_at: null
            }
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.cliente.count({ ...filtro }),
                prisma.cliente.findMany({
                    ...filtro,
                    orderBy: { nome: "asc" },

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
    async getById(id) {
        try {
            const dados = await prisma.cliente.findUnique({
                where: { id },


            })
            if (!dados) return { erro: false, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro no banco.' }
        }
    }
    async update(id, payload) {
        if (payload?.dt_nasc) {
            payload.dt_nasc = new Date(payload.dt_nasc + 'T00:00:00-03:00')
        }
        const dados = await prisma.cliente.update({ where: { id }, data: payload, select: { id: true } })
        return dados
    }
    async delete(id) {
        const dados = await prisma.cliente.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
        return dados
    }
}

module.exports = new ClienteService()