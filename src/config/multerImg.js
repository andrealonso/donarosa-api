const multer = require('multer')
const path = require('path')

module.exports = {
    dest: path.resolve(__dirname, '..', 'public', 'img'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'public', 'img'))
        },
        filename: (req, file, cb) => {
            if (!file) {
                cb(null, nomedoArquivo)
            }
            const { produto_id, lado } = req.body
            file.produto_id = produto_id
            file.lado = lado
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
            const ext = path.extname(file.originalname)
            file.ext = ext
            const arquivo = file.originalname.split(' ').join('_')
            const nomedoArquivo = `${Date.now()}-${produto_id}-${lado}${ext}`
            cb(null, nomedoArquivo)
        }
    }),

    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {

        const tipoPermitidos = [
            // 'application/pdf',
            // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/jpg',
            'image/png'
        ]
        // console.log(file.mimetype);
        if (tipoPermitidos.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Tipo inválido!'))
        }

    }
}