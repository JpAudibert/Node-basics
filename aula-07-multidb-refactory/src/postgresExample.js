// yarn add sequelize pg-hstore pg

const main = async () => {
  
  await Herois.create({
    nome: 'Lanterna Verde',
    poder: 'Anel'
  })

  const result = await Herois.findAll({ raw: true, attributes: ['nome'] })
  console.log('result', result)

}

main()