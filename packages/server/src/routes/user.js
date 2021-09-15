import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'

const router = express.Router()

router
  .route('/:id')
  .get(async (request, response) => {
    const populateQuery = [
      {
        path: 'posts',
        populate: { path: 'author', select: ['username', 'profile_image'] },
      },
    ]

    const user = await User.findOne({ username: request.params.id })
      .populate(populateQuery)
      .exec()
    if (user) {
      response.json(user.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .put(async (request, response) => {
    const { password,storyboard } = request.body
    const { id } = request.params

    const hashedpassword = await bcrypt.hash(password, 12)

    try {
      console.log(password)
       if (password.length<8||password.length>20) {response.status(400).json({message: "password not the right length"})}
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          passwordHash: hashedpassword,
          storyboard:storyboard
        },
        {
          new: true,
          useStrict: false,
        }
      )

      response.json(userUpdate.toJSON())
    } catch (error) {
      response.status(404).end()
    }
  })

module.exports = router
