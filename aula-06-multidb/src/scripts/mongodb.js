// docker ps
// docker exec -it af869b5750c2  mongo -u joaopedro -p Jp16052001 --authenticationDatabase herois

// Create
db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNasc: '2001-05-16'
})

// Read
db.herois.read()

// Update
db.herois.update({_id: 'ObjectId("??ID??")'}, { $set: {nome: 'Mulher Maravilha'}})

// Delete
db.herois.remove({nome: 'Mulher Maravilha'}) //remove({}) remove toda a base