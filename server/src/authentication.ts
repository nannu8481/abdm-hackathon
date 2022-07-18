import * as express from 'express'
import { verifyJWT } from './utils/auth'
import { logger } from './shared/logger'

declare global {
  namespace Express {
    interface Request {
      dataPayload: {
        did: string
        accessKey: string
      }
    }
  }
}

function authenticateAccessToken(token: string | string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      if (!token) reject(new Error('No token provided'))
      if (token && !Array.isArray(token)) {
        console.log(token)
        resolve(true)
      } else reject(new Error('Access Token not provided'))
    } catch (err) {
      logger.info(err)
      reject(new Error('Internal Server error'))
    }
  })
}

function authenticateApiKey(token: string | string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      if (!token) reject(new Error('No token provided'))
      if (token && !Array.isArray(token)) {
        verifyJWT(token)
          .then((isValidKey) => {
            if (isValidKey?.payload) resolve(true)
            else reject(new Error('API Key is not valid'))
          })
          .catch((err) => {
            logger.info(err)
            reject(new Error('API Key is not valid'))
          })
      }
    } catch (err) {
      logger.info(err)
      reject(new Error('Internal Server error'))
    }
  })
}

export function expressAuthentication(request: express.Request, securityName: string, scopes: string[]): Promise<any> {
  if (scopes.length) {
    //pass
  }

  if (securityName === 'api-key') {
    let token: string | string[] = ''
    if (request.headers && request.headers['api-key']) {
      token = request.headers['api-key']
    }
    return authenticateApiKey(token)
  }
  if (securityName === 'accessToken') {
    let token: string | string[] = ''
    if (request.headers && request.headers['accesstoken']) {
      token = request.headers['accesstoken']
    }
    return authenticateAccessToken(token)
  }

  return new Promise((_, reject) => {
    reject(new Error('not valid auth method'))
  })
}
