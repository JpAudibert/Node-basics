const { deepEqual } = require('assert');
const Database = require('./database');

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
    await Database.cadastrar(defaultItemCadastrado);
    await Database.cadastrar(defaultItemAtualizar);
  });

  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = defaultItemCadastrado;
    const [resultado] = await Database.listar(expected.id);

    deepEqual(resultado, expected);
  });

  it('Deve cadastrar um heroi, usando arquivos', async () => {
    const expected = defaultItemCadastrado;
    const resultado = await Database.cadastrar(defaultItemCadastrado);
    const [actual] = await Database.listar(defaultItemCadastrado.id);

    deepEqual(actual, expected);
  });

  it.only('Deve remover um heroi por id', async () => {
    const expected = true;
    const resultado = await Database.remover(defaultItemCadastrado.id);

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

    await Database.atualizar(defaultItemAtualizar.id, novoDado);
    const [resultado] = await Database.listar(defaultItemAtualizar.id);

    deepEqual(resultado, expected);
  });
})