import fastify from 'fastify'

// app ou server
const app = fastify()

// Rotas: GET, POST, PUT, PATCH, DELETE

// http://localhost:3333/hello

app.get('/hello', () => {
  return 'Hello World'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
