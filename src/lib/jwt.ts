import jwt from 'jsonwebtoken'

function getJWTSecret() {
  return process.env.JWT_SECRET || 'supersecretjwtkey123456789'
}

export function signJWT(payload: string | object | Buffer) {
  return jwt.sign(payload, getJWTSecret(), { expiresIn: '1h' }) // Token expires in 7 days
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, getJWTSecret())
    return decoded
  } catch (err: any) {
    // Token expired or invalid
    console.log('JWT verification failed:', err.message)
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    jwt.verify(token, getJWTSecret())
    return false // Token is valid
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return true // Token expired
    }
    return true // Other errors (invalid token)
  }
}