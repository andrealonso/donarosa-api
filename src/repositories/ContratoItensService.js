var prisma = require('../services/prisma')
var moment = require('moment')
class ContratoItensService {
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
            const dados = await prisma.contrato_itens.create({
                data: payload,
                include: {
                    produto: {
                        select: {
                            id: true,
                            cod_barras: true,
                            descricao: true,
                            prod_cor: true,
                            prod_imagem: true,
                            prod_tamanho: true,
                            prod_compri: true,
                            prod_fabrica: true,
                        }
                    }
                }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }

    async getAll() {
        try {
            const dados = await prisma.contrato_itens.findMany({
                include: {
                    produto: {
                        select: {
                            id: true,
                            cod_barras: true,
                            descricao: true,
                            prod_cor: true,
                            prod_imagem: true,
                            prod_tamanho: true,
                            prod_compri: true,
                            prod_fabrica: true,
                        }
                    }
                }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }
    async exibirAgenda(payload) {
        const { dt_ini, dt_fim, campo } = payload
        const contrato = {}
        contrato[campo] = { gte: dt_ini, lte: dt_fim }
        try {
            const dados = await prisma.contrato_itens.findMany({
                where: { AND: [{ contrato }, { deleted_at: null }] },
                include: {
                    contrato: {
                        select: {
                            cliente: {
                                select: { nome: true, tel: true }
                            },
                            id: true,
                            dt_evento: true,
                            dt_prova: true,
                            dt_saida: true,
                            dt_devol: true,
                        }
                    },
                    produto: {
                        select: {
                            id: true,
                            cod_barras: true,
                            descricao: true,
                            prod_cor: true,
                            prod_imagem: true,
                            prod_tamanho: true,
                            prod_compri: true,
                            prod_fabrica: true,
                        }
                    }
                },
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }

    async getById(id) {
        try {
            const selDescricao = { select: { descricao: true } }
            const dados = await prisma.contrato_itens.findUnique({
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
            const dados = await prisma.contrato_itens.update({ where: { id }, data: payload })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }

    async delete(id) {
        try {
            const dados = await prisma.contrato_itens.update({ where: { id }, data: { deleted_at: new Date() } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
}

module.exports = new ContratoItensService()