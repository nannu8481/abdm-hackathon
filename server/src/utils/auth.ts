import jwt from 'jsonwebtoken'

import { logger } from '../shared/logger'

const privateKey = process.env.JWT_PRIVATE_KEY || 'shhhh'

interface ITokenResponse {
  jwtToken: string | null
  error: string | null
}

/**
 * @description This function creates jwt token for session
 * @param data  pass data which needs to be in JWT payload
 * @returns  jwt token and error as null if successfully able to create else jwtToken=null and error message
 */

export async function createJWT(payload: any): Promise<ITokenResponse> {
  try {
    logger.info('inside create JWT function', payload)
    const jwtToken = jwt.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: '1d' })

    return {
      jwtToken,
      error: null,
    }
  } catch (err) {
    logger.error(err)
    return {
      jwtToken: null,
      error: 'Internal server Error',
    }
  }
}

/**
 *
 * @param token pass jwt token to decrypt
 * @returns payload .it would return payload if jwt is valid else null. non-valid- expired token,wrong jwt,wrong secret key etc.
 */

export async function verifyJWT(token: string): Promise<any> {
  try {
    const payload = jwt.verify(token, privateKey)

    return {
      payload,
      error: null,
    }
  } catch (err) {
    logger.error(err)
    return {
      payload: null,
      error: 'Invalid Token',
    }
  }
}
