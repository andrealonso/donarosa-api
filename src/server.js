var express = require('express')
var app = express()
const cors = require('cors');
app.use(cors({ origin: '*' }));

const UsuarioRoutres = require('./routers/UsuarioRoutres')
const ClienteRouters = require('./routers/ClienteRouters')
const EventoRouters = require('./routers/EventoRouters')
const EnderecoRouters = require('./routers/EnderecoRouters')
const ProdutoRouters = require('./routers/ProdutoRouters')
const ContratoRouters = require('./routers/ContratoRouters')
const ContratoItensRouters = require('./routers/ContratoItensRouters')
const FilesRouters = require('./routers/FilesRouters')
const EstoqueRouters = require('./routers/EstoqueRouters')
const FuncionarioRouters = require('./routers/FuncionarioRouters')
const CaixaRouters = require('./routers/CaixaRouters')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src/public'))

app.use('/', UsuarioRoutres)
app.use('/', ClienteRouters)
app.use('/', EventoRouters)
app.use('/', EnderecoRouters)
app.use('/', ProdutoRouters)
app.use('/', ContratoRouters)
app.use('/', ContratoItensRouters)
app.use('/', FilesRouters)
app.use('/', EstoqueRouters)
app.use('/', FuncionarioRouters)
app.use('/', CaixaRouters)

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
})