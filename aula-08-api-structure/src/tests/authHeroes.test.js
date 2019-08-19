const assert = require('assert')
const api = require('./../api')
let app = {}
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilh1eGFEb3NCYWl4aW5ob3MiLCJpZCI6MSwiaWF0IjoxNTY2MTc3MTEyfQ.hnr4rU6ynUmJThMa-tQZtQVRaMezyUqOQA8OEJcN_KM'

describe('Switch de autenticação', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('Deve obter um Token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'XuxaDosBaixinhos',
        password: '123'
      }
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.deepEqual(statusCode, 200)
    assert.ok(dados.token.length > 10)
  })
})