import express from 'express'
import { Character, Story, User } from '../models'
import { requireAuth } from '../middleware'
import chalk from 'chalk'
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.send('this is the story endpoint')
})

// find a given users storyboard
router.get('/:username', async (req, res, next) => {
  const populateQuery = [
    {
      path: 'storyboard',
      select: ['name', 'createdAt', 'updatedAt'],
      populate: [
        // in case we want to make them global
        { path: 'author', select: ['username'] },

        {
          path: 'characters',
          select: ['name', 'description', 'color'],
          populate: [
            {
              path: 'paths',
              select: ['name', 'description', 'start', 'end'],
            },
          ],
        },
      ],
    },
  ]

  const user = await User.findOne({ username: req.params.username })
    .sort({ createdAt: -1 })
    .populate(populateQuery)
    .exec()

  if (user) {
    res.status(200).json(user.storyboard.map((story) => story.toJSON()))
  } else {
    res.status(404).end()
  }
})

router.post('/', requireAuth, async (request, response, next) => {
  console.log(chalk.red('running one'))
  const { name } = request.body
  const { user } = request
  const currentUser = await User.findById(user._id)
  console.log(chalk.red(name))
  console.log(chalk.red(user._id))

  const story = new Story({
    name: name,
    author: user._id,

    //  characters:characters,
  })
  console.log(chalk.yellow(currentUser))
  console.log(chalk.yellow(currentUser.storyboard))
  try {
    const savedStory = await story.save()

    const updateUser = await User.findByIdAndUpdate(
      {
        _id: currentUser._id,
      },
      {
        $push: { storyboard: savedStory._id },
      },
      {
        new: true,
      }
    )

    console.log(chalk.yellow(updateUser))
    response.send({ story: savedStory })
  } catch (error) {
    next(error)
  }
})

router.post('/character', async (request, response, next) => {
  const { name, description, color, story_Id } = request.body
  const { user } = request

  const character = new Character({
    name: name,
    description: description,
    color: color,
  })

  try {
    const savedCharcter = await charater.save()
    user.characterboard = user.characterboard.concat(savedCharcter._id)

    Story.findOneAndUpdate(
      story_Id,
      {
        $push: { characters: Character },
      },
      {
        new: true,
      }
    )
    await user.save()

    response.json(savedCharater.toJSON())
  } catch (error) {
    next(error)
  }
})

router.delete('/:character', async (request, response, next) => {
  const { user } = request
  const { id } = request.params
  const character = await character.findById(id)
  console.log(character)

  if (!character) {
    return response.status(422).json({ error: 'Cannot find charater ' })
  }
  console.log(typeof user, user)
  if (character.author._id.toString() === user._id.toString()) {
    try {
      const removedCharacter = await story.remove()

      const userUpdate = await User.updateOne(
        { _id: user._id },
        { $pull: { posts: id } }
      )

      response.json(removedCharacter)
    } catch (err) {
      next(err)
    }
  }
})

module.exports = router
