const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const HeroiSchema = require('./../db/strategies/postgres/schemas/HeroiSchema')
const Context = require('./../db/strategies/base/contextStrategy')

let context = {}

const MOCK_HEROI_CADASTRAR = {
  nome: 'Gavião Negro',
  poder: 'Flechas'
}

const MOCK_HEROI_ATUALIZAR = {
  nome: 'Batman',
  poder: 'Cinto de utilidades'
}

describe('Postgres Strategy', function () {
  this.timeout(Infinity)
  this.beforeAll(async () => {
    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, HeroiSchema)
    context = new Context(new Postgres(connection, model))
    await context.delete()
    await context.create(MOCK_HEROI_ATUALIZAR)
  })


  it('PostgreSQL Connection', async () => {
    const result = await context.isConnected()

    assert.equal(result, true)
  })

  it('Cadastrar', async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR)
    delete result.id

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })

  it('Listar', async function () {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
    delete result.id

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })

  it('Atualizar', async function () {
    const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR, //nivela tudo
      nome: 'Homem Aranha',
      poder: 'Teia',
    }
    const [result] = await context.update(itemAtualizar.id, novoItem)

    const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
    delete itemAtualizado.id

    assert.deepEqual(result, 1)
    assert.deepEqual(itemAtualizado, novoItem)
  })

  it('Remover por ID', async function () {
    const [item] = await context.read({})
    const result = await context.delete(item.id)

    assert.deepEqual(result, 1)
  })
})