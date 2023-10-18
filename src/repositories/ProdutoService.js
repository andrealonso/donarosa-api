var prisma = require('../services/prisma')
class ProdutoService {
    async create(payload) {
        try {
            if (payload.qtd_estoque) payload.qtd_estoque = parseFloat(payload.qtd_estoque)

            const dados = await prisma.produto.create({ data: payload, select: { id: true } })
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
            }
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([

                prisma.produto.count({ ...filtro }),
                prisma.produto.findMany({
                    ...filtro,
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
                        prod_categoria: true

                    },
                    orderBy: { descricao: "asc" },
                    skip,
                    take
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
        const selDescricao = { select: { descricao: true } }
        try {
            const [produto, cores, tamanhos, comprimentos, fabricas, categorias] = await prisma.$transaction([
                prisma.produto.findUnique({ where: { id } }),
                prisma.prod_cor.findMany(),
                prisma.prod_tamanho.findMany(),
                prisma.prod_compri.findMany(),
                prisma.prod_fabrica.findMany(),
                prisma.prod_categoria.findMany()
            ])
            const dados = { produto, cores, tamanhos, comprimentos, fabricas, categorias }
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }

    async update(id, payload) {
        try {
            if (payload.qtd_estoque) payload.qtd_estoque = parseFloat(payload.qtd_estoque)
            const dados = await prisma.produto.update({ where: { id }, data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async delete(id) {
        try {
            const dados = await prisma.produto.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }

    }
}

module.exports = new ProdutoService()