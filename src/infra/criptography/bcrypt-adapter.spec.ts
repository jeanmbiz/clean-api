import bcrypt from 'bcrypt' // importar manualmente
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('mocked_hash'))
  }
}))

const sallt = 12
const makesut = (): BcryptAdapter => {
  return new BcryptAdapter(sallt)
}

describe('Bcrypt Adapter', () => {
  test('Should call with correct values', async () => {
    const sut = makesut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', sallt)
  })

  test('Should return a tash on success', async () => {
    const sut = makesut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('mocked_hash')
  })
})
