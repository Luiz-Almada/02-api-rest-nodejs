import fastify from 'fastify'
import { env } from './env'
import { transactionsRoute } from './routes/transactions'
import cookie from '@fastify/cookie'

// app ou server
const app = fastify()

app.register(cookie)

// exemplo de hook global no Fastify: aqui funciona para todas as rotas registradas
/* app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] ${request.url}`) // Log de requisições
}) */

app.register(transactionsRoute, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
