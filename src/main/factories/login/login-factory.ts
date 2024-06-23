import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { makeLoginValidation } from './login-validation-factory'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter'
import env from '../../../main/config/env'

export const makeLoginController = (): Controller => {
  const salt = 12

  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  const dbAuthenthication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)

  const loginController = new LoginController(dbAuthenthication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
