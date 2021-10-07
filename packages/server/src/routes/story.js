import express from 'express'
import { Character, Story, User } from '../models'
import { requireAuth } from '../middleware'
import chalk from 'chalk'
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.send('this is the story endpoint')
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

router.get('/storyboard/id/:name', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name })

    if (user) res.status(200).send(user.storyboard)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// retrieve all story names within a given user
router.get('/storyboard/names/:name', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name })
    const storyboard = await Story.find({ author: user._id })

    if (storyboard) res.status(200).send(storyboard.map((story) => story.name))
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// retrieve everything for every user
router.get('/storyboard/user/all/', async (req, res) => {
  const populateQuery = [
    {
      path: 'storyboard',
      select: [
        'name',
        'description',
        'createdAt',
        'updatedAt',
        'author',
        'characters',
      ],
      populate: [
        { path: 'author', select: ['username'] },
        {
          path: 'characters',
          select: ['name', 'description', 'color', 'paths'],
          populate: [
            {
              path: 'path',
              select: ['name', 'description', 'start', 'end'],
            },
          ],
        },
      ],
    },
  ]

  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .populate(populateQuery)

    if (users) res.status(200).send(users)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// retrieve every storyboard for given user
router.get('/storyboard/all/:username', async (req, res) => {
  const populateQuery = [
    {
      path: 'storyboard',
      select: [
        'name',
        'description',
        'createdAt',
        'updatedAt',
        'author',
        'characters',
      ],
      populate: [
        { path: 'author', select: ['username'] },
        {
          path: 'characters',
          select: ['name', 'description', 'color', 'paths'],
          populate: [
            {
              path: 'path',
              select: ['name', 'description', 'start', 'end'],
            },
          ],
        },
      ],
    },
  ]

  try {
    const user = await User.findOne({ username: req.params.username })
      .sort({ createdAt: -1 })
      .populate(populateQuery)

    if (user) res.status(200).send(user)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// retrieve all characters for a given story
router.get('/story/characters/:id', async (req, res) => {
  const populateQuery = [
    {
      path: 'characters',
      select: ['name', 'description', 'color', 'paths'],
      populate: [
        {
          path: 'Paths',
          select: ['name', 'description', 'start', 'end'],
        },
      ],
    },
  ]

  try {
    const story = await Story.findById(req.params.id)
      .populate(populateQuery)
      .exec()

    if (story) res.status(200).send(story)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// delete a story based on ID
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  const { user } = req.body

  const story = await Story.findOne({ _id: id })
  if (!story) return res.status(422).json({ error: 'Cannot find story' })

  if (story.author.toString() === user._id)
    try {
      const removedStory = await story.remove()

      await User.updateOne({ _id: user._id }, { $pull: { storyboard: id } })

      res.status(202).json(removedStory)
    } catch (err) {
      res.status(404).send({ error: error })
    }
})



module.exports = router
