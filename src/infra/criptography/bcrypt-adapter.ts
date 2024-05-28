import { Encrypter } from '@/data/protocols/criptography/encrypter'
import bcrypt from 'bcrypt' // importar manualmente

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = bcrypt.hash(value, this.salt)
    return hash
  }
}
