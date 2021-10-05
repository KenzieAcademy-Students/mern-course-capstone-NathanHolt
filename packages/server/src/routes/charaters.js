import express from 'express'
import  Character from '../models'

const router = express.Router()



// retrieve all characters
router.get('/characters/all', async (req, res) => {
  try {
    const character = await Character.find({})

    if (character) res.status(200).json(character)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})


// Create a character
router.post('/create', async (req, res) => {
  const { id, name, description, color } = req.body
  // const { user } = req.body

  try {
    let story = await Story.findOne({ _id: id })
    // if (story && story.author.toString() === user._id) {
    if (story) {
      const character = new Character({
        name,
        description,
        color,
      })

      const savedCharacter = await character.save()
      story.characters = story.characters.concat(savedCharacter._id)

      await Story.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $push: { characters: savedCharacter._id },
        },
        {
          new: true,
        }
      )
      res.status(201).send(savedCharacter)
    }
  } catch (error) {
    res.status(422).send({ error: error })
  }
})




module.exports = router
