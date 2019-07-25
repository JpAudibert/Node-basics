const util = require('util');

const obterUsuarioAsync = util.promisify(obterUsuario)
const obterTelefoneAsync = util.promisify(obterTelefone)
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date(),
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '999102414',
            ddd: '54',
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return callback(null, {
                rua: 'rua dos bobos',
                numero: 0,
            })
        }, 2000)
    })
}
main();
async function main() {
    try {
        console.time()
        const usuario = await obterUsuarioAsync();
        // const telefone = await obterTelefoneAsync(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);
        const resultado = await Promise.all([
            // Um não depende do outro
            obterTelefoneAsync(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `);
        console.timeEnd();
    } catch (error) {
        console.error("DEU RUIM", error)
    }
}