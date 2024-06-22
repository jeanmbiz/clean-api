import { UpdateAccessTokenRepository, LoadAccountByEmailRepository, HashComparer, Encrypter, AuthenticationModel, Authentication } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepositoryStub: UpdateAccessTokenRepository) {
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepositoryStub.loadByEmail(authentication.email)
    if (account) {
      const valid = await this.hashComparer.compare(authentication.password, account.password)
      if (valid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepositoryStub.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
