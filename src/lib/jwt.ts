import jwt from 'jsonwebtoken'

function getJWTSecret() {
  return process.env.JWT_SECRET || 'supersecretjwtkey123456789'
}

export function signJWT(payload: string | object | Buffer) {
  return jwt.sign(payload, getJWTSecret(), { expiresIn: '7d' })
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, getJWTSecret())
  } catch {
    return null
  }
}