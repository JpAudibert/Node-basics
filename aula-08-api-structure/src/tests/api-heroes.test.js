const assert = require('assert')
const api = require('./../api')
let app = {}

describe('Teste da API Heroes', function () {
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

    assert.deepEqual(result.payload, 'Erro interno no servidor')

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
})