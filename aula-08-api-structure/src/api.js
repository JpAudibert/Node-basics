const Hapi = require('hapi')
const Mongo = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const Context = require('./db/strategies/base/contextStrategy')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const Postgres = require('./db/strategies/postgres/postgres')
const UsuarioSchema = require('./db/strategies/postgres/schemas/UsuarioSchema')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'SEGREDOZAO_123'

const app = new Hapi.Server({
  port: 5000
})

const mapRoutes = (instance, methods) => {
  return methods.map(method => instance[method]())
}

const main = async () => {
  const connection = await Mongo.connect()
  const context = new Context(new Mongo(connection, HeroiSchema))

  const connectionPostgres = await Postgres.connect()
  const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
  const contextPostgres = new Context(new Postgres(connectionPostgres, model))

  const swaggerOptions = {
    info: {
      title: 'API Herois',
      version: 'v1.0'
    },
  }
  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: async (dado, request) => {
      const [result] = await contextPostgres.read({
        username: dado.username.toLowerCase()
      })
      if (!result) {
        return {
          isValid: false
        }
      }
      //Verifica se o usuário continua ativo/ pagando

      return {
        isValid: true // false
      }
    }
  })

  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
  ])


  await app.start()
  console.log('Servidor rodando na porta', app.info.port);

  return app
}

module.exports = main()