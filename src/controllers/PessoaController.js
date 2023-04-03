const { connect } = require('../services/db')
var prisma = require('../services/prisma')

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
            let busca = req.query
            const data = await prisma.pessoa.findMany({
                where: {
                    OR: [{ id: Number(busca.text) || {} }, { nome: { contains: busca?.text } }]
                }
            })
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send({ error })
        }
    }

    async exibir(req, res) {
        try {
            const { id } = req.params
            const user = { select: { id: true, nome: true, user_nivel_id: true } }
            const data = await prisma.pessoa.findUnique({
                where: { id: Number(id) },
                include: { tipo_desc: true, user, enderecos: true, sexo_des: true },
            })
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send({ error })
        }
    }

    async criar(req, res) {
        try {
            const payload = req.body
            const data = await prisma.pessoa.create({
                data: { ...payload }
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
            const data = await prisma.pessoa.update({
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
            let data = { msg: 'Usuários deletado com sucesso', id }
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send({ error })
        }
    }
}

module.exports = new UsuarioController()