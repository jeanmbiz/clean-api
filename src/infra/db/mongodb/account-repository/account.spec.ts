import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

let accountCollection: Collection
describe('Account Mongo Repository ', () => {
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

  const makesut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on add success', async () => {
    const sut = makesut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on load by email success', async () => {
    const sut = makesut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@.com',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makesut()
    const account = await sut.loadByEmail('any_email@.com')
    expect(account).toBeFalsy()
  })
})
