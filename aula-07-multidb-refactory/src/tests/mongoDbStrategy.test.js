const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb/mongodb')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
const Context = require('./../db/strategies/base/contextStrategy')

let context = {}

const MOCK_HEROI_CADASTRAR = {
  nome: 'Mulher Maravilha',
  poder: 'Laço'
}

const MOCK_HEROI_DEFAULT = {
  nome: `Homem Aranha - ${Date.now()}`,
  poder: 'Teia'
}

const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino`,
  poder: 'Velocidade'
}

const MOCK_HEROI_ATUALIZAR2 = {
  nome: `Patolino`,
  poder: 'Velocidade'
}

let MOCK_HEROI_ID = ''

describe('MongoDB strategy', function () {
  this.beforeAll(async () => {
    const connection = MongoDB.connect()
    context = new Context (new MongoDB(connection, HeroiSchema))

    await context.create(MOCK_HEROI_DEFAULT)
    const result = await context.create(MOCK_HEROI_ATUALIZAR)
    MOCK_HEROI_ID = result._id
  })

  it('Verificar conexão', async () => {
    const result = await context.isConnected()
    const expected = 1
    assert.deepEqual(result, expected)
  })

  it('Cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
  })

  it('Listar', async () => {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
    assert.deepEqual({ nome, poder }, MOCK_HEROI_DEFAULT)
  })

  it('Atualizar', async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: 'Perna Longa',
    })
    assert.deepEqual(result.nModified, 1)
  })

  it('Delete', async () => {
    const result = await context.delete(MOCK_HEROI_ID)
    assert.deepEqual(result.n, 1)
  })
})