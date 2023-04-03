const { connect } = require('../services/db')
const { PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient()

// async function prismExec(fn){
//     const data =  fn().then(async (data) => {
//         await prisma.$disconnect(); 
//         return data
//       })
//       .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//       })
//     return data
// }

class UsuarioController {
    async listar(req, res) {
        try {
            var busca = req.body
            const data = await prisma.user.findMany({
                where: busca,
                include: { user_nivel: { select: { descricao: true } } }
            })
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send({ error })
        }
    }

    async exibir(req, res) {
        try {
            const { id } = req.params
            const data = await prisma.user.findUnique({
                where: { id: parseInt(id) }
            })
            res.status(200).send(data || {})
        } catch (error) {
            res.status(500).send({ error })
        }
    }

    async criar(req, res) {
        try {
            const payload = req.body
            const data = await prisma.user.create({
                data: payload
            })
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send({ error })
        }
    }

    async editar(req, res) {
        try {
            const { id } = req.params
            const payload = req.body
            const data = await prisma.user.update({
                where: { id: Number(id) },
                data: payload
            })
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send({ error })
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params
            const data = await prisma.user.delete({
                where: { id: parseInt(id) }
            })
            res.status(200).send(data || {})
        } catch (error) {
            res.status(500).send({ error })
        }
    }
}

module.exports = new UsuarioController()