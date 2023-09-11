const prisma = require("../src/services/prisma")

var tabelasOk = []
var tabelasErro = []

prisma.ativo_status
const seeds = {
    user_Nivel: [
        { id: 1, descricao: "Administrador" },
        { id: 2, descricao: "Balconista" },
    ],

    pessoa_tipo: [
        { id: 1, descricao: "Funcionário" },
        { id: 2, descricao: "Cliente" },
        { id: 3, descricao: "Fornecedor" },
    ],
    ativo_status: [
        { id: 1, descricao: "ATIVO" },
        { id: 2, descricao: "INATIVO" }
    ],
    sexo: [
        { id: 1, descricao: "Masculino" },
        { id: 2, descricao: "Feminino" }
    ],
    prod_tamanho: [
        { id: 1, descricao: "PP" },
        { id: 2, descricao: "P" },
        { id: 3, descricao: "M" },
        { id: 4, descricao: "G" },
        { id: 5, descricao: "XG" },
        { id: 6, descricao: "GG" },
        { id: 7, descricao: "PS" },
    ],
    prod_compri: [
        { id: 1, descricao: "CURTO" },
        { id: 2, descricao: "LONGO" }
    ],
    contrato_status: [
        { id: 1, descricao: "Novo" },
        { id: 2, descricao: "Aguardando Prova" },
        { id: 3, descricao: "Aguardando Retirada" },
        { id: 4, descricao: "Aguardando Devolução" },
        { id: 5, descricao: "Finalizado" },
        { id: 6, descricao: "Cancelado" },
        { id: 7, descricao: "Suspenso" },
    ],
    caixa_form_pag: [
        { id: 1, descricao: "Dinheiro" },
        { id: 2, descricao: "Cartão Cred." },
        { id: 3, descricao: "Cartão Debt." },
        { id: 4, descricao: "Cheque" },
        { id: 5, descricao: "PIX" },
        { id: 6, descricao: "Boleto" },
        { id: 7, descricao: "TED/DOC" },
        { id: 1000, descricao: "Estorno" }
    ],
    caixa_cate: [
        { id: 1, descricao: "Aluguel" },
        { id: 2, descricao: "Venda" },
        { id: 3, descricao: "Diversos" },

    ],
    caixa_operacao: [
        { id: 1, descricao: "Entrada" },
        { id: 2, descricao: "Saída" },
        { id: 3, descricao: "Entrada/Saída" }
    ],
    evento_tipo: [
        { id: 1, descricao: "Outros" },
        { id: 2, descricao: "Casamento" },
        { id: 3, descricao: "Formatura" },
        { id: 4, descricao: "Festa 15 anos" },
        { id: 5, descricao: "Aniversário" },
    ],
    prod_cor: [
        { id: 1, descricao: "VERMELHO" },
        { id: 2, descricao: "PRETO" },
        { id: 3, descricao: "BRANCO" },
    ],
    prod_fabrica: [
        { id: 1, descricao: "Fabrica4" },
        { id: 2, descricao: "Fabrica2" },
        { id: 3, descricao: "Fabrica3" },
    ],
    prod_categoria: [
        { id: 1, descricao: "Vestidos" },
        { id: 2, descricao: "Ternos" },
        { id: 3, descricao: "Bolças" },
    ]
}

async function main() {
    async function aplicarSeeds(tabela) {
        try {
            await prisma[tabela].deleteMany()
            await prisma[tabela].createMany({
                data: seeds[tabela]
            })
            tabelasOk.push(tabela)
        } catch (error) {
            console.log(error);
            tabelasErro.push(tabela)
        }
    }

    // Aplicar todas as tabelas
    Object.keys(seeds).forEach(async (iten) => await aplicarSeeds(`${iten}`))

    // Aplicar apenas uma tabela
    // aplicarSeeds(`caixa_cate`)

    console.log("Tabelas criadas: " + tabelasOk)
    console.log("Tabelas com erro: " + tabelasErro)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })