import jwt from 'jsonwebtoken'
import keys from '../config/keys'
import { User } from '../models'

module.exports = async (req, res, next) => {
  const auth = req.get('auth')
  if (!auth) {
    return res.status(401).json({ error: 'you must be logged in' })
  }

  const token = auth.replace('Bearer ', '')
  jwt.verify(token, keys.jwt.secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'you must be logged in' })
    }

    const { id } = payload
    User.findById(id).then((userData) => {
      req.user = userData
      next()
    })
  })
}
