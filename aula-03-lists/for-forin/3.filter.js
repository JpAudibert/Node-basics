const { obterPessoas } = require("./service");

const main = async () => {
  try {

    const { results } = await obterPessoas(`a`);

    const familiaLars = results.filter(item => {
      const result = item.name.toLowerCase().indexOf('lars') !== -1;
      return result;
    });

    const names = familiaLars.map(pessoa => pessoa.name);

    console.log(names);

  } catch (error) {
    console.error('DEU RUIM', error);

  }
}

main();