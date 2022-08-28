import GoogleOAuth2Service from '@services/GoogleOAuth2Service'
import { Request, Response } from 'express'

export default class AuthenticationController {
  static async getGoogleAuthorization(request: Request, response: Response) {
    const url = GoogleOAuth2Service.createAuthUrl()
    return response.json({ url })
  }
}
