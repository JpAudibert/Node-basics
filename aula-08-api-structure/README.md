## ---- POSTGRES

docker run \
  --name postgres \
  -e POSTGRES_USER=joaopedro \
  -e POSTGRES_PASSWORD=joaopedro \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker ps
docker exec -it postegres /bin/bash

## ---- ADMINER

docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer

## ---- MONGODB
docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
  -d \
  mongo:4

## ---- MONGODB CLIENT
docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient


## ----  MONGO USER
docker exec -it mongodb \
  mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
  --eval "db.getSiblingDB('herois').createUser({user: 'joaopedro', pwd: 'joaopedro', roles: [{role: 'readWrite', db: 'herois'}]})"