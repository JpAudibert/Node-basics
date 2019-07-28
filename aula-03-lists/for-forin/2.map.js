const service = require("./service");

const main = async () => {
  try {

    const results = await service.obterPessoas('a');
    // const names = [];

    // console.time("forEach");
    // results.results.forEach(item => {
    //   names.push(item.name);
    // });
    // console.timeEnd("forEach");

    const names = results.results.map( pessoa => pessoa.name );

    console.log('nomes', names);
    
  } catch (error) {
    console.error("erro interno", error);
  }
}

main();