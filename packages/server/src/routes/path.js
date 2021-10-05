import express from 'express'
import { Path, Character, Story, User } from '../models'
import { requireAuth } from '../middleware'

const router = express.Router()

// create path on character by _id
router.post('/create', async (req, res) => {
  const { id, name, description, start, end } = req.body

  try {
    const character = await Character.findOne({ _id: id })
    if (character) {
      const path = new Path({
        name,
        description,
        start,
        end,
      })

      const savedPath = await path.save()
      character.paths = character.paths.concat(savedPath._id)

      await Character.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $push: { paths: savedPath._id },
        },
        {
          new: true,
        }
      )
      res.status(201).send(savedPath)
    }
  } catch (error) {
    res.status(422).send({ error: error })
  }
})

module.exports = router
