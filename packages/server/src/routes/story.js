import express from "express";
import { Story } from "../models";
import {User } from "../models"
const router = express.Router();


router.get("/" ,async(req, res, next) => {
  res.send("this is the story endpoint");
});

// router.post("/create",async (req,res ,next)=>{
// const {name,author,characters,}=req.body


// save._id
// const story = new Story({
//   name,
//   author:save._id,
//   characters,
//   created: Date.now()
// });

router.post('/', requireAuth, async (request, response, next) => {
  
  const { name,author,characters } = request.body
  const { user } = request
User.findOne({ username: author }).then((save)=>{


  const story = new Story({
    name,
    author: save._id,
    characters:characters,
    created: Date.now(),
  })
})
  try {
    const savedStory = await story.save()
    user.storyboard = user.storyboard.concat(savedStory._id)

    await user.save()

    response.json(savedStory.toJSON())
  } catch (error) {
    next(error)
  }
})

  



module.exports = router;