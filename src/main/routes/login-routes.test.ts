import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('SignUp Routes', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB URL is not defined in environment variables.')
    }
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signUp', () => {
    test('Should return 200 on signUp', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Jean',
          email: 'jeanmbiz@hotmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'Jean',
        email: 'jeanmbiz@hotmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'jeanmbiz@hotmail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'jeanmbiz@hotmail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
