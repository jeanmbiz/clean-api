import bcrypt from 'bcrypt' // importar manualmente
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('mocked_hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call with correct values', async () => {
    const sallt = 12
    const sut = new BcryptAdapter(sallt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', sallt)
  })

  test('Should return a tash on success', async () => {
    const sallt = 12
    const sut = new BcryptAdapter(sallt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('mocked_hash')
  })
})
