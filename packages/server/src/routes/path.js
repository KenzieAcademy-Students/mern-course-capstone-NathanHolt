import express from 'express'
import { Path, Character } from '../models'

const router = express.Router()

router
  // retrieve all paths
  .get('/all', async (req, res) => {
    try {
      const path = await Path.find({})

      if (path) res.status(200).json(path)
    } catch (error) {
      res.status(404).send({ error: error })
    }
  })
  // create a path on character by _id
  .post('/create', async (req, res) => {
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
          { _id: id },
          { $push: { paths: savedPath._id } },
          { new: true }
        )
        res.status(201).send(savedPath)
      }
    } catch (error) {
      res.status(422).send({ error: error })
    }
  })
  // edit existing path by _id
  .put('/:id', async (req, res) => {
    const { name, description, start, end } = req.body
    const { id } = req.params

    try {
      const pathUpdate = await Path.findByIdAndUpdate(
        { _id: id },
        { name, description, start, end },
        { new: true }
      )
      res.status(202).send(pathUpdate)
    } catch (error) {
      res.status(404).send({ error: error })
    }
  })
  // delete a path on a character
  .delete('/:id', async (req, res) => {
    const PathId = req.params.id
    const { user, CharId } = req.body

    const path = await Path.findOne({ _id: PathId })
    if (!path) return res.status(422).json({ error: 'Cannot find path' })

    // if (path.author.toString() === user._id)
    try {
      const removedStory = await path.remove()

      await Character.updateOne({ _id: CharId }, { $pull: { paths: PathId } })

      res.status(202).send(removedStory)
    } catch (err) {
      res.status(404).send({ error: error })
    }
  })

module.exports = router
