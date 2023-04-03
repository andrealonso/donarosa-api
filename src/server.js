var express = require('express')
var app = express()

const UsuarioRoutres = require('./routers/UsuarioRoutres')
const PessoaRouters = require('./routers/PessoaRouters')

app.use(express.json())

app.use('/',UsuarioRoutres)
app.use('/',PessoaRouters)

app.listen(3000,()=>{
    console.log( 'Servidor ativo na porta 3000');
})