import express from 'express'
import { User } from '../models'
import signupRouter from  "./signup"
import storyRouter from "./story"
const router = express.Router()

router.get("/" ,async(req, res, next) => {
  res.send("this is the story endpoint");
});


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
module.exports = router
