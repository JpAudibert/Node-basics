const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

class MongoDB extends ICrud {
  constructor() {
    super()
    this._herois = null
    this._driver = null
  }

  async isConnected() {
    const state = this._driver.readyState
    if (state !== 2) return state

    await new Promise(resolve => setTimeout(resolve, 1000))

    return this._driver.readyState
  }

  defineModel() {
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

    this._herois = Mongoose.model('herois', heroiSchema)
  }

  connect() {
    Mongoose.connect('mongodb://joaopedro:joaopedro@localhost:27017/herois',
      { useNewUrlParser: true })
      .then(() => console.log("Conectou fei"))
      .catch(() => console.log("Deu ruim fei"))

    const connection = Mongoose.connection
    this._driver = connection
    this.defineModel()
    // connection.once('open', () => { console.log('Database rodando!') })

  }

  create(item) {
    return this._herois.create(item)
  }

  read(item, skip = 0, limit = 10) {
    return this._herois.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    return this._herois.updateOne({ _id: id }, { $set: item })
  }

  delete(id) {
    return this._herois.deleteOne({ _id: id })
  }
}

module.exports = MongoDB