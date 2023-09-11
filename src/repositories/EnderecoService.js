var prisma = require('../services/prisma')
class EnderecoService {
    async create(payload) {
        console.log("aqui2");
        const data = await prisma.enderecos.create({ data: payload, select: { id: true } })
        return data
    }
    async getAll() {
        const dados = await prisma.enderecos.findMany({
            include: { pessoa: { select: { id: true, nome: true } } }
        })
        return dados
    }
    async getById(id) {
        const selDescricao = { select: { descricao: true } }
        const dados = await prisma.enderecos.findUnique({
            where: { id },
            include: { pessoa: { select: { id: true, nome: true } } }
        })
        return dados
    }
    async update(id, payload) {
        const dados = await prisma.enderecos.update({ where: { id }, data: payload, select: { id: true } })
        return dados
    }
    async delete(id) {
        const dados = await prisma.enderecos.delete({ where: { id }, select: { id: true } })
        return dados
    }
}

module.exports = new EnderecoService()