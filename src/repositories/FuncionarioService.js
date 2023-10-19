var prisma = require('../services/prisma')
var moment = require('moment')
class FuncionarioService {
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
                payload.dt_nasc = new Date(payload.dt_nasc)
            }
            const dados = await prisma.funcionario.create({
                data: payload,
                select: { id: true }
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
        var filtro = {
            where: {
                deleted_at: null
            }
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.funcionario.count({ ...filtro }),
                prisma.funcionario.findMany({
                    ...filtro,
                    include: { usuario: { select: { id: true, login: true, user_nivel_id: true, ativo_status_id: true } } },
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
            const dados = await prisma.funcionario.findUnique({
                where: { id },
            })
            if (dados.dt_nasc)
                dados.dt_nasc = moment.utc(dados.dt_nasc).format('YYYY-MM-DD');
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async update(id, payload) {
        try {
            if (payload?.dt_nasc) {
                payload.dt_nasc = new Date(payload.dt_nasc)
            }
            const dados = await prisma.funcionario.update({ where: { id }, data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async delete(id) {
        try {
            const dados = await prisma.funcionario.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }

    }
}

module.exports = new FuncionarioService()