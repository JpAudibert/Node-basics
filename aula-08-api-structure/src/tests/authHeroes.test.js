const assert = require('assert')
const api = require('./../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/UsuarioSchema')

let app = {}

const USER = {
  username: 'XuxaDosBaixinhos',
  password: '123'
}

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: '$2b$04$HPN2MsjnzYa3QzTJSrH4GubS5W9n4ZjN9lFvxc2PODgXxac1Omskm'
}

describe('Switch de autenticação', function () {
  this.beforeAll(async () => {
    app = await api
    const connectionPostgres = await Postgres.connect()
    const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const postgres = new Context(new Postgres(connectionPostgres, model))
    await postgres.update(null, USER_DB, true)
  })

  it('Deve obter um Token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)
    
    assert.deepEqual(statusCode, 200)
    assert.ok(dados.token.length > 10)
  })

})