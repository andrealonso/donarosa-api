var prisma = require('../services/prisma')

class EstoqueService {
    async create(payload) {
        try {
            if (payload.qtd) payload.qtd = Number(payload.qtd)
            if (payload.estoque_oper_id) payload.estoque_oper_id = Number(payload.estoque_oper_id)
            if (payload.produto_id) payload.produto_id = Number(payload.produto_id)
            if (payload.data) payload.data = new Date(payload.data)

            let [estoque, dados] = await prisma.$transaction([
                prisma.estoque_lanc.create({ data: payload }),
                prisma.produto.update({
                    where: { id: payload.produto_id },
                    select: { id: true, qtd_estoque: true },
                    data: { qtd_estoque: { increment: payload.qtd } }
                }),
            ])
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }

    async getAll(skip, take, busca) {
        var filtro = {
            where: {
                deleted_at: null,
                descricao: {
                    contains: busca
                }
            },
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.estoque_lanc.count({ ...filtro, orderBy: { data: 'desc' } }),
                prisma.$queryRaw`
                select e.id,op.descricao as operacao,e.qtd,e.data,e.descricao, 
                concat_ws(' ',p.cod_barras,p.descricao,cr.descricao,t.descricao,cp.descricao) as produto
                from estoque_lanc e
                left join estoque_oper op on op.id = e.estoque_oper_id  
                left join produtos p on e.produto_id = p.id
                left join prod_tamanho t on p.prod_tamanho_id = t.id
                left join prod_compri cp on p.prod_compri_id = cp.id
                left join prod_cor cr on p.prod_cor_id = cr.id
                order by e.id
                `
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
        const selDescricao = { select: { descricao: true } }
        try {
            const dados = await prisma.estoque_lanc.findUnique({ where: { id } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }

    async update(id, payload) {
        try {
            return {}
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async delete(id) {
        try {
            const est = await prisma.estoque_lanc.findUnique({ where: { id } })
            if (!est.id) return { erro: true, msg: 'Estoque não encontrado!' }

            let [updateQtd, dados] = await prisma.$transaction([
                prisma.produto.update({
                    where: { id: est.produto_id },
                    data: { qtd_estoque: { increment: (est.qtd * -1) } }
                }),
                prisma.estoque_lanc.delete({ where: { id } }),
            ])
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
}

module.exports = new EstoqueService()