var prisma = require('../services/prisma')
var moment = require('moment')
class EventoService {
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
            console.log('evento create');
            payload.data = new Date(payload.data)
            console.log(payload);

            const dados = await prisma.evento.create({
                data: payload,
                select: { id: true, descricao: true, evento_tipo_id: true, evento_tipo: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            let msg = 'Erro ao tentar criar o registro no banco.'
            if (erro.meta?.target) {
                const { target } = erro.meta
                if (target === 'eventos_descricao_key') msg = 'Evento já cadastrado.'
            }
            console.log(erro);
            return { erro: true, msg }
        }
    }


    async getAll(skip, take, busca) {
        await this.pausaTeste(0)

        var where = { deleted_at: null }
        if (busca)
            where.data = new Date(busca)
        try {
            const dados = await prisma.evento.findMany({
                where,
                orderBy: [{ descricao: "asc" }],
                include: { evento_tipo: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async getById(id) {
        try {
            const [evento, tipoEvento] = await prisma.$transaction([
                prisma.evento.findUnique({ where: { id } }),
                prisma.evento_tipo.findMany()
            ])
            const dados = { evento, tipoEvento }
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async update(id, payload) {
        try {
            if (payload?.data) {
                payload.data = new Date(payload.data)
            }
            const dados = await prisma.evento.update({ where: { id }, data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async delete(id) {
        try {
            const dados = await prisma.evento.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }

    }
}

module.exports = new EventoService()