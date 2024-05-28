import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import {
  Authentication,
  AuthenticationModel
} from '../../../domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository

  constructor (loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepositoryStub = loadAccountByEmailRepositoryStub
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepositoryStub.load(authentication.email)
    return null
  }
}
