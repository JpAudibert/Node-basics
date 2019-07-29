const { obterPessoas } = require('./service');

const main = async () => {
  try {

    const { results } = await obterPessoas('a');

    const alturas = results.map(item => parseInt(item.height));
    console.log('alturas', alturas);
 
    const total = alturas.reduce((anterior, proximo) => {
      return anterior + proximo;
    });

    console.log(`total: ${total/100}m`);

  } catch (error) {
    console.error('DEU RUIM', error);
    
  }
}

main();