import { badRequest } from '../../../presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../signup/signup-protocols'
import { MissingParamError } from '../../../presentation/errors'

export class LoginController implements Controller {
  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
  }
}
