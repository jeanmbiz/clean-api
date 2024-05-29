
import { Hasher } from '../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt' // importar manualmente

export class BcryptAdapter implements Hasher {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = bcrypt.hash(value, this.salt)
    return hash
  }
}
