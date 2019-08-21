const Mongoose = require('mongoose')

Mongoose.connect('mongodb://joaopedro:joaopedro@localhost:27017/herois',
  { useNewUrlParser: true })

const connection = Mongoose.connection
connection.once('open', () => {
  console.log('Database rodando!');
})

// setTimeout(() => {
//   const state = connection.readyState
//   console.log('state', state);

// }, 1000);

/**
 * 0 desconectado
 * 1 conectado
 * 2 conectando
 * 3 desconectando
 */

const heroiSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  poder: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: Date.now()
  }
})

const model = Mongoose.model('herois', heroiSchema)

const main = async () => {
  const resultCadastrar = await model.create({
    nome: 'Batman',
    poder: 'Cinto de Utilidades'
  })

  console.log('result cadastrar', resultCadastrar)
  
  const listItems = await model.find()
  console.log('List Items', listItems);
  
}

main()