import express from 'express'
import { User } from '../models'
import bcrypt from 'bcryptjs'
import keys from '../config/keys'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.send('this is the authorization endpoint')
})

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body
  if (!email || !password || !username) {
    return res.status(422).json({ err: 'please fill out all fields' })
  }

  User.findOne({ email: email }).then((data) => {
    if (data) {
      return res.status(422).json({ error: 'account with email exists!' })
    }
  })

  User.findOne({ username: username }).then((data) => {
    if (data) {
      return res.status(422).json({ err: 'User alright here' })
    }

    const MIN_PASSWORD_LENGTH = 0
    const MAX_PASSWORD_LENGTH = 20
    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      return res
        .status(422)
        .json({ error: 'password is not within 8-20 characters' })
    }

    bcrypt
      .hash(password, 12)
      .then((hashedpassword) => {
        const user = new User({
          username,
          passwordHash: hashedpassword,
          email,
        })

        user
          .save()
          .then((user) => {
            res.json({ message: `${user.username} created!` })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

router.post('/signin', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(422).json({ error: 'missing username or password' })
  }

  const user = await User.findOne({ username: username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, keys.jwt.secret)

  res.status(200).send({
    token,
    username,
    uid: user.id,
    email: user.email,
    storyboard: user.storyboard.map((story) => story.name.toJSON()),
  })
})

module.exports = router
