import express from 'express'
import { User } from '../models'
import signupRouter from './signup'
import storyRouter from './story'
import userrouter from './user'
import devRouter from './dev'
import CharacterRouter  from '../charaters'
const router = express.Router()

// router.get("/" ,async(req, res, next) => {
//   res.send("this is the  endpoint");
// });

router.get('/sample', async (req, res, next) => {

  let user = await User.findOne({}).exec();

  if (!user) {
    const newUser = new User({
      username: "Freddie",
    })
    user = await newUser.save()
  }

  res.status(200).send(user)
})
router.use('/signup', signupRouter)
router.use('/story', storyRouter)
router.use('/user', userrouter)
router.use('/dev', devRouter)
router.use('/charaters',CharacterRouter)
module.exports = router
