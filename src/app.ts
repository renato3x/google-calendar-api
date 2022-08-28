import express from 'express'
import cors from 'cors'
import authenticationRouter from '@routers/authentication.router'
import GoogleOAuth2Service from '@services/GoogleOAuth2Service'
import { google } from 'googleapis'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(authenticationRouter)

app.get('/app', async (request, response) => {
  const { code } = request.query
  
  if (!code) {
    return response.status(400).json({
      status: 400,
      type: 'Bad Request',
      message: 'Code is required'
    })
  }

  await GoogleOAuth2Service.loadToken(code as string)
  const calendar = google.calendar('v3')

  return await calendar.calendarList.list({
    auth: GoogleOAuth2Service.oAuth2Client,
    maxResults: 1
  }).then(({ data: calendarList }) => {
    return response.status(200).json(calendarList.items || [])
  })
})

export default app
