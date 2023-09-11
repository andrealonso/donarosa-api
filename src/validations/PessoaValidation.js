const yup = require("yup")

const PessoaValidation = yup.object({
    nome: yup.string().required(),
    identidade: yup.string().nullable(true),
    cpf: yup.string().required(),
    dt_nasc: yup.date().nullable(true),
    tel: yup.string().nullable(true),
    email: yup.string().email(),
    user_id: yup.number().nullable(true),
    tipo_id: yup.number().nullable(true),
    sexo_id: yup.number().nullable(true),
    enderecos_id: yup.number().nullable(true),
    ativo_status_id: yup.number()
}
)

module.exports = { PessoaValidation }