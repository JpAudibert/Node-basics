const assert = require('assert')
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Biônica'
}

describe.only('Teste da API Heroes', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('Listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10'
    })

    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
  })

  it('Listar /herois - deve retornar um erro com limit incorreto', async () => {
    const TAMANHO_LIMITE = 'AEee'
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })

    const errorResult = {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "child \"limit\" fails because [\"limit\" must be a number]",
      "validation": {
        "source": "query",
        "keys": ["limit"]
      }
    }

    assert.deepEqual(result.statusCode, 400)
    assert.deepEqual(result.payload, JSON.stringify(errorResult))

  })

  it('Listar /herois - deve filtrar 1 item', async () => {
    const TAMANHO_LIMITE = 1000
    const NAME = `Homem Aranha - 1566010552951`
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(dados[0].nome === NAME)

  })

  it('Cadastrar POST - /herois', async () => {
    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
    })

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.notStrictEqual(_id, undefined)
    assert.deepEqual(message, 'Heroi cadastrado com sucesso!')

  })
})