import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET. Check your .env file.')
}

export function signJWT(payload: string | object | Buffer) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}