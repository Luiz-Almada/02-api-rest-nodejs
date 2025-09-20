import { app } from './app'
import { env } from './env'

app
  .listen({
    // Config para o Render
    host: '0.0.0.0', // IMPORTANTE: escutar em 0.0.0.0, não localhost
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
