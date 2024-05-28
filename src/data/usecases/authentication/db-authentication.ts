import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import {
  Authentication,
  AuthenticationModel
} from '../../../domain/usecases/authentication'
import { HashComparer } from '../../../data/protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import { UpdateAccessTokenRepository } from '../../../data/protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepositoryStub: UpdateAccessTokenRepository

  constructor (loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepositoryStub: UpdateAccessTokenRepository) {
    this.loadAccountByEmailRepositoryStub = loadAccountByEmailRepositoryStub
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepositoryStub = updateAccessTokenRepositoryStub
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepositoryStub.load(authentication.email)
    if (account) {
      const valid = await this.hashComparer.compare(authentication.password, account.password)
      if (valid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepositoryStub.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
