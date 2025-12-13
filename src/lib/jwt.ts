import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''

if (!JWT_SECRET) {
  console.warn('⚠️ JWT_SECRET is not set')
}

export function signJWT(payload: any) {
  return jwt.sign(payload, JWT_SECRET || 'fallback', { expiresIn: '7d' })
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET || 'fallback')
  } catch {
    return null
  }
}