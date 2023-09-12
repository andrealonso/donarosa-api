var express = require('express')
var app = express()
const cors = require('cors');
app.use(cors({ origin: '*' }));

const UsuarioRoutres = require('./routers/UsuarioRoutres')
const ClienteRouters = require('./routers/ClienteRouters')
const EnderecoRouters = require('./routers/EnderecoRouters')
const ProdutoRouters = require('./routers/ProdutoRouters')
const ContratoRouters = require('./routers/ContratoRouters')
const ContratoItensRouters = require('./routers/ContratoItensRouters')

app.use(express.json())

app.use('/', UsuarioRoutres)
app.use('/', ClienteRouters)
app.use('/', EnderecoRouters)
app.use('/', ProdutoRouters)
app.use('/', ContratoRouters)
app.use('/', ContratoItensRouters)

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
})