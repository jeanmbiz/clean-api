import bcrypt from 'bcrypt' // importar manualmente
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should call with correct values', async () => {
    const sallt = 12
    const sut = new BcryptAdapter(sallt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', sallt)
  })
})
