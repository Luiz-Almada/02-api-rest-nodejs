import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { execSync } from 'child_process'
import request from 'supertest'
import { app } from '../app'

describe('Transactions routes', () => {
  console.log(process.env.NODE_ENV) // deve ser 'test'
  beforeAll(async () => {
    await app.ready() // garante que o app está pronto antes de rodar os testes
  })

  afterAll(async () => {
    await app.close() // fecha o app depois dos testes
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all') // desfaz todas as migrations
    execSync('npm run knex -- migrate:latest') // aplica todas as migrations
  })

  // test('user can create a new transaction', async () => {
  // ou
  it('should be able to create a new transaction', async () => {
    // fazer a chamada HTTP para criar uma nova transação
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201) // espero que retorne o status 201
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })

    // Verificação de tipo com operador de coalescência nula
    const cookies = createTransactionResponse.get('Set-Cookie') ?? []

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies) // seta o cookie na requisição
      .expect(200)

    console.log(listTransactionsResponse.body)
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      }),
    ])
  })
})
