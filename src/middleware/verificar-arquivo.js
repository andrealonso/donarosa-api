const multer = require('multer')
module.exports = {
    haveFile(req, res, next) {
        console.log(req.h);
        res.status(500).send({ error: 'erros' })
        // next()
    }
}