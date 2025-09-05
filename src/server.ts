import fastify from 'fastify'
import { knexQB } from './database'

// app ou server
const app = fastify()

// Rotas: GET, POST, PUT, PATCH, DELETE

// http://localhost:3333/hello

app.get('/hello', async () => {
  const tables = await knexQB('sqlite_schema').select('*')
  return tables
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
