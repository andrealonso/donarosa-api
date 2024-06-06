const FilesService = require('../repositories/FilesService')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const storage_type = process.env.LOCAL_STORAGE_TYPE

function definirBusca(payload) {
    let { representantes_id, proprietarios_id, propriedades_id, agenda_id } = payload
    let obj = {}
    representantes_id ? obj.representantes_id = Number(representantes_id) : null
    propriedades_id ? obj.propriedades_id = Number(propriedades_id) : null
    proprietarios_id ? obj.proprietarios_id = Number(proprietarios_id) : null
    agenda_id ? obj.agenda_id = Number(agenda_id) : null
    return obj
}
class FilesController {
    async criar(req, res) {
        if (req.file) {
            const { prod_id, lado } = req.body
            // const destinoDocs = definirBusca(req.body)
            // const { filename, ext } = req.file
            const dados = await FilesService.criate(req.file)

            if (!dados?.erro) {
                res.status(200).send(dados)
            } else {
                res.status(400).send(dados)
            }
        } else {
            res.status(400).send({ erro: true, msg: 'Nenhum arquivo encontrado!' })
        }
    }

    async listar(req, res) {
        // if (!verificarAcesso(req.user)) {
        //     res.json({ erro: true, msg: 'Acesso não autorizado' })
        //     return
        // }
        const filtro = req.query
        // filtro.produto_id = Number(filtro.produto_id)
        const dados = await FilesService.getAll(filtro)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async filtrar(req, res) {
        const filtro = definirBusca(req.query)
        const dados = await FilesService.filtrar(filtro)

        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        // if (!verificarAcesso(req.user)) {
        //     res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
        //     return
        // }

        const dados = await FilesService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async download(req, res) {
        // if (!verificarAcesso(req.user)) {
        //     res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
        //     return
        // }
        const dados = await FilesService.download(Number(req?.params?.id))
        if (!dados.erro) {
            res.status(200).download(path.resolve(__dirname, '..', 'uploads', dados.nome))
        } else {
            res.status(400).send({ erro: true, msg: 'Registro ou arquivo não encontrado.' })
        }
    }

    async editar(req, res) {
        if (!verificarAcesso(req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await FilesService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        // if (!verificarAcesso(req.user)) {
        //     res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
        //     return
        // }
        const id = Number(req?.params?.id)
        const dados = await FilesService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new FilesController()