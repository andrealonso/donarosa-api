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
            const fileDuplicado = await prisma.produto.findMany({ where: { id: Number(produto_id), prod_imagem: filename } })
            if (fileDuplicado.length > 0) {
                fileDuplicado.forEach(item => this.delete(item.id))
            }
            const dados = await prisma.produto.update({
                where: { id: Number(produto_id) },
                data: { prod_imagem: filename },
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
            const dados = await prisma.produto.findMany({
                where: { prod_imagem: { not: null } },
                select: { id: true, prod_imagem: true }
            })
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
            const file = await prisma.produto.findUnique({ where: { id } })

            if (!file.prod_imagem) {
                return { erro: true, codigo: code, msg: 'Registro não encontrado no banco.' }
            }
            if (this.excluirArquivo(storage_type, file.prod_imagem)) {
                const dados = await prisma.produto.update({ where: { id }, data: { prod_imagem: null } })
                return { erro: false, dados }
            }
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
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