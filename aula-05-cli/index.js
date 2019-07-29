const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');


const main = async () => {
  Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Herói")
    .option('-p, --poder [value]', "Poder do Herói")
    .option('-i, --id [value]', "ID do Herói")

    .option('-c, --cadastrar', "Cadastrar um Herói")
    .option('-l, --listar', "Listar um Herói")
    .option('-r, --remover', "Remover um Herói por id")
    .option('-a, --atualizar [value]', "Atualizar um Herói por id")

    .parse(process.argv)
  const heroi = new Heroi(Commander);

  try {

    if (Commander.cadastrar) {
      delete heroi.id;
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) {
        console.error('Heroi não foi cadastrado');
        return
      }
      console.log('Heroi cadastrado com sucesso');

    }

    if (Commander.listar) {
      const resultado = await Database.listar(heroi.id)
      console.log(resultado);
      return;
    }

    if (Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar);
      delete heroi.id;
      // remover todas as chaves undefined | null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);

      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
      if (!resultado) {
        console.error("Não foi possível atualizar o heroi");
        return;
      }

      console.log("Heroi atualizado com sucesso");
    }

    if (Commander.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error("Não foi possível remover o Herói");
        return;
      }
      console.log("Heroi removido com sucesso");

    }

  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();