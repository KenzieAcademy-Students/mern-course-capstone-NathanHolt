import express from 'express'
import { Path, Character, Story, User } from '../models'
import { requireAuth } from '../middleware'
const router = express.Router()

// retrieve all users
router.get('/user/all', async (req, res) => {
  try {
    const users = await User.find({})

    if (users) res.status(200).json(users)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// retrieve all characters
router.get('/characters/all', async (req, res) => {
  try {
    const character = await Character.find({})

    if (character) res.status(200).json(character)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// retrieve all paths
router.get('/paths/all', async (req, res) => {
  try {
    const path = await Path.find({})

    if (path) res.status(200).json(path)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// retrieve specific user
router.get('/user/:name', async (req, res) => {
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
    const user = await User.findOne({ username: req.params.name }).populate(
      populateQuery
    )

    if (user) res.status(200).json(user)
  } catch (error) {
    res.status(404).send({ error: error })
  }
})

// retrieve all story._id on specific user
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

// Create a story
router.post('/create/story', async (req, res) => {
const { name, description, user } = req.body
console.log('test1')
const story = await Story.findOne({ name: name })
if (story && user.uid === story.author.toString())
return res
.status(422)
.json({ error: 'story with that name already exists!' })
  
try {
  const story = new Story({
    name,
    author: user._id,
    description,
  })
  console.log('test2')

  const savedStory = await story.save()
  // user.storyboard = user.storyboard.concat(savedStory._id)
  console.log('test3')

  await User.findByIdAndUpdate(
    {
      _id: user.uid,
    },
    {
      $push: { storyboard: savedStory._id },
    },
    {
      new: true,
    }
    )
    console.log('test4')

    res.status(201).send(savedStory)
  } catch (error) {
    res.status(422).send({ error: error })
  }
})

// Create a character
router.post('/character/create', async (req, res) => {
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
      // story.characters = story.characters.concat(savedCharacter._id)
      
      await Story.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $push: { characters: savedCharacter },
        },
        {
          new: true,
        }
      )
      res.status(201).send(savedCharacter)
    }
  } catch (err) {
    res.status(422).send( err)
  }
})

// create path on character by _id
router.post('/path/create', async (req, res) => {
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
      // character.paths = character.paths.concat(savedPath._id)
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
