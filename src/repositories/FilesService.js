var prisma = require('../services/prisma')
const fs = require('fs/promises')
const path = require('path')
const { promisify } = require('util')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const storage_type = process.env.LOCAL_STORAGE_TYPE

class FilesService {
    async criate(file) {
        try {
            const { filename, produto_id, lado, ext } = file
            const fileDuplicado = await prisma.prod_imgs.findMany({ where: { produto_id: Number(produto_id), lado } })
            if (fileDuplicado.length > 0) {
                fileDuplicado.forEach(item => this.delete(item.id))
            }
            const dados = await prisma.prod_imgs.create({
                data: { nome: filename, produto_id: Number(produto_id), lado, extensao: ext },
            })
            return { erro: false, dados }
        } catch (erro) {
            this.excluirArquivo(storage_type, file.filename)
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getAll(filtro) {
        try {
            const dados = await prisma.prod_imgs.findMany({ where: filtro })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async filtrar(filtro) {
        try {
            const dados = await prisma.prod_imgs.findMany({ where: filtro })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }

    async getById(id) {
        try {
            const dados = await prisma.prod_imgs.findUnique({ where: { id } })
            if (!dados) return { erro: false, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }
    async download(id) {
        try {
            const dados = await prisma.prod_imgs.findUnique({ where: { id } })
            if (!dados) return { erro: true, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async delete(id) {
        try {
            const file = await prisma.prod_imgs.findUnique({ where: { id } })
            if (!file.nome) {
                return { erro: true, codigo: code, msg: 'Registro não encontrado no banco.' }
            }
            const dados = await prisma.prod_imgs.delete({ where: { id } })
            this.excluirArquivo(storage_type, file.nome)
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }
    async excluirArquivo(local, filename) {
        try {
            if (local === 'local')
                await fs.unlink(path.resolve(__dirname, '..', 'public', 'img', filename))
            return true
        } catch (error) {
            console.log(`Erro ao tentar excluir o arquivo ${filename}.`);
            return false
        }
    }
}

module.exports = new FilesService()