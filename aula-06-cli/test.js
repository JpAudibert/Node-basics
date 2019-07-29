const { deepEqual, ok } = require('assert');
const database = require('./database');

const defaultItemCadastrado = {
  nome: "Flash",
  poder: "Speed",
  id: 1,
}

describe('Switch de manipulação de Heróis', () => {
  before(async () => {
    await database.cadastrar(defaultItemCadastrado);
  });

  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = defaultItemCadastrado;
    const [resultado] = await database.listar(expected.id);

    deepEqual(resultado, expected);
  });

  it('Deve cadastrar um heroi, usando arquivos', async () => {
    const expected = defaultItemCadastrado;
    const resultado = await database.cadastrar(defaultItemCadastrado);
    const [actual] = await database.listar(defaultItemCadastrado.id);

    deepEqual(actual, expected);
  });

  it.only('Deve remover um heroi por id', async() => {
    const expected = true;
    const resultado = await database.remover(defaultItemCadastrado.id);
    
    deepEqual(resultado, expected);
  })
})