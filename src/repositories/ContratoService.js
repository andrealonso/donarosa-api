var prisma = require('../services/prisma')
var moment = require('moment')

const includPadrao = {

    caixa_lanc: {
        where: { deleted_at: null },
        include: {
            caixa_cate: true,
            caixa_form_pag: true
        },
        orderBy: { data: 'desc' }
    },
    itens: {
        where: { deleted_at: null },
        include: {
            produto: {
                select: {
                    id: true,
                    cod_barras: true,
                    descricao: true,
                    qtd_estoque: true,
                    vl_aluguel: true,
                    prod_cor: true,
                    prod_tamanho: true,
                    prod_compri: true,
                    prod_fabrica: true,
                    prod_categoria: true,
                    prod_imagem: true
                }
            }
        }
    }

}

class ContratoService {
    coverteDatas(payload) {
        if (payload.dt_prova) {
            payload.dt_prova = new Date(payload.dt_prova)
            payload.dt_saida = new Date(payload.dt_saida)
            payload.dt_devol = new Date(payload.dt_devol)
            payload.dt_evento = new Date(payload.dt_evento)
        }
        // console.log(payload.created_at);
    }
    log_backend(erro, msg, metodo) {
        console.log({ erro, msg, rota: 'contratos', metodo })
    }

    async create(payload) {
        if (payload?.contrato_status_id)
            payload.contrato_status_id = Number(payload.contrato_status_id)
        console.log(payload);
        // const { itens } = payload
        // let cont_itens = null
        // delete payload.itens
        // console.log(itens); return
        // if (itens) {
        //     payload.itens = {
        //         create: itens
        //     }

        // } else {
        //     this.log_backend(true, 'Não foi encontrado itens.', 'post')
        //     return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        // }
        try {
            // this.coverteDatas(payload)
            // console.log(payload);
            const dados = await prisma.contrato.create({
                data: { ...payload }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }

    async getAll() {
        try {
            const dados = await prisma.contrato.findMany({
                where: { deleted_at: null },

                include: {
                    cliente: { select: { nome: true, tel: true } },
                    contrato_status: true,
                    caixa_lanc: { select: { id: true, caixa_cate: true, data: true, valor: true } }
                }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }
    async getById(id) {
        try {
            const [contrato, listaStatus] = await prisma.$transaction([
                prisma.contrato.findUnique({
                    where: { id },
                    include: { ...includPadrao }
                }),
                prisma.contrato_status.findMany()
            ])
            return { erro: false, dados: { contrato, listaStatus } }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }


    }
    async update(id, payload) {
        try {
            const dados = await prisma.contrato.update({ where: { id }, data: payload, include: includPadrao })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }
    async addProd(id, payload) {
        try {
            const dados = await prisma.contrato.update({
                where: { id },
                data: { itens: { create: payload } }, include: includPadrao
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }
    async delete(id) {
        try {
            const dados = await prisma.contrato.delete({ where: { id }, include: includPadrao })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

    }
    async addPag(id, payload) {
        try {
            const { valor } = payload
            var totalPago = 0
            const contrato = await prisma.contrato.findUnique({
                where: { id },
                include: includPadrao
            })
            let { caixa_lanc, vl_total, vl_sinal, vl_rest } = contrato
            if (caixa_lanc.length) {
                totalPago = caixa_lanc.map(item => item.valor).reduce((acc, vl) => acc + vl)
            }
            vl_sinal = Number((totalPago + valor).toFixed(2))
            vl_rest = Number((vl_total - vl_sinal).toFixed(2))

            const dados = await prisma.contrato.update({
                where: { id },
                data: {
                    vl_sinal,
                    vl_rest,
                    caixa_lanc: { create: payload }
                },
                include: includPadrao

            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async delPag(id, payload) {
        try {
            const { id: caixaId, valor } = payload
            var totalPago = 0

            const contrato = await prisma.contrato.findUnique({
                where: { id },
                include: includPadrao
            })

            let { caixa_lanc, vl_total, vl_sinal, vl_rest } = contrato

            if (caixa_lanc.length) {
                totalPago = caixa_lanc.map(item => item.valor).reduce((acc, vl) => acc + vl)
            }
            vl_sinal = Number((totalPago - valor).toFixed(2))
            vl_rest = Number((vl_total - vl_sinal).toFixed(2))

            const dados = await prisma.contrato.update({
                where: { id },
                data: {
                    vl_sinal,
                    vl_rest,
                    caixa_lanc: { update: { where: { id: caixaId }, data: { deleted_at: new Date() } } }
                },
                include: includPadrao
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
}

module.exports = new ContratoService()