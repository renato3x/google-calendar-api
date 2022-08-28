
import { Router } from 'express'
import AuthenticationController from '@controllers/AuthenticationController';

const router = Router()

router.get('/auth', AuthenticationController.getGoogleAuthorization)

export default router
