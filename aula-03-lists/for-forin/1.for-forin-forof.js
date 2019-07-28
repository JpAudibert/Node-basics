const service = require('./service');

const main = async () => {
  try {

    const result = await service.obterPessoas('a');

    const names = [];

    console.time("Tempo com for")
    for (let i = 0; i < result.results.length; i++) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd("Tempo com for");    

    console.time("Tempo com for in");
    for (let i in result.results) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd("Tempo com for in");

    console.time("Tempo com for of")
    for (const pessoa of result.results) {
      names.push(pessoa.name);
    }
    console.timeEnd("Tempo com for of")
    
    console.log(`nomes`, names);

  } catch (error) {
    console.error("erro interno", error);

  }
}

main();