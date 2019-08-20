const ICrud = require('../interfaces/interfaceCrud')
const Mongoose = require('mongoose')

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super()
    this._schema = schema
    this._connection = connection
  }

  async isConnected() {
    const state = this._connection.readyState
    if (state !== 2) return state

    await new Promise(resolve => setTimeout(resolve, 1000))

    return this._connection.readyState
  }

  static connect() {
    Mongoose.connect(process.env.MONGODB_CONNECTION,
      { useNewUrlParser: true })
      .then(() => console.log("Conectou fei"))
      .catch(() => console.log("Deu ruim fei"))

    const connection = Mongoose.connection
    
    connection.once('open', () => { console.log('Database rodando!') })

    return connection
  }

  create(item) {
    return this._schema.create(item)
  }

  read(item, skip = 0, limit = 10) {
    return this._schema.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item })
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id })
  }
}

module.exports = MongoDB