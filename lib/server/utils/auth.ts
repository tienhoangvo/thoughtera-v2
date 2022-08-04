import { jwtVerify, SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { ACCESS_TOKEN_SECRET } from './constants'

type User = {
  _id: string
  email: string
  name: string
  username: string
  avatar: string
  isVerified: boolean
}

export type UserSession = User & {
  jti: string
  iat: number
  sub: string
  exp: number
}

export class AuthError extends Error {}

export const verifyAuth = async (accessToken: string) => {
  try {
    const verified = await jwtVerify(
      accessToken,
      new TextEncoder().encode(ACCESS_TOKEN_SECRET)
    )

    return verified.payload as UserSession
  } catch (error) {
    throw new AuthError('Your token has expired')
  }
}

export const generateAccessToken = async (user: User) => {
  const token = await new SignJWT({
    sub: user._id,
    ...user,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(ACCESS_TOKEN_SECRET))

  return token
}
