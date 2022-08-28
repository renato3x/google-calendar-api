import { Auth, google } from 'googleapis'
import { calendarApi } from '@config/googleapis.json'

export default class GoogleOAuth2Service {
  static readonly oAuth2Client: Auth.OAuth2Client = new google.auth.OAuth2({
    clientId: calendarApi.web.client_id,
    clientSecret: calendarApi.web.client_secret,
    redirectUri: calendarApi.web.redirect_uris[0]
  })

  static createAuthUrl(): string {
    return this.oAuth2Client.generateAuthUrl({
      scope: calendarApi.web.scopes,
      access_type: 'offline'
    })
  }

  static async loadToken(code: string): Promise<Auth.Credentials> {
    return this.oAuth2Client.getToken(code)
    .then(({ tokens }) => {
      this.oAuth2Client.setCredentials(tokens)
      return tokens
    })
  }
}
