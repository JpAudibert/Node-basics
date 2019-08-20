const assert = require('assert')
const PasswordHelper = require('./../helpers/passwordHelper')

const PASSWORD = 'JoaoPedro1605'
const HASH = '$2b$04$/69KoCPKqhs5Kwa/DRkay.X11TJMIDZRsZs7OLnnTMhYIJadl5DKe'

describe('User Helper', function () {
  // this.beforeAll({})

  it('Deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(PASSWORD)
    
    assert.ok(result.length > 10)
  })

  it('Deve validar a senha', async () => {
    const result = await PasswordHelper.comparePassword(PASSWORD, HASH)
    
    assert.ok(result)
  })
})