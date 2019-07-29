const { deepEqual } = require('assert');
const database = require('./database');

const defaultItemCadastrado = {
  nome: "Flash",
  poder: "Speed",
  id: 1,
}

const defaultItemAtualizar = {
  nome: "Batman",
  poder: "Cinto de Utilidades",
  id: 2
}

describe('Switch de manipulação de Heróis', () => {
  before(async () => {
    await database.cadastrar(defaultItemCadastrado);
    await database.cadastrar(defaultItemAtualizar);
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

  it.only('Deve remover um heroi por id', async () => {
    const expected = true;
    const resultado = await database.remover(defaultItemCadastrado.id);

    deepEqual(resultado, expected);
  });

  it.only('Deve atualizar um heroi por id', async () => {
    const expected = {
      ...defaultItemAtualizar,
      nome: "Mulher Maravilha",
      poder: "Laço"
    };

    const novoDado = {
      nome: "Mulher Maravilha",
      poder: "Laço"
    }

    await database.atualizar(defaultItemAtualizar.id, novoDado);
    const [resultado] = await database.listar(defaultItemAtualizar.id);

    deepEqual(resultado, expected);
  });
})