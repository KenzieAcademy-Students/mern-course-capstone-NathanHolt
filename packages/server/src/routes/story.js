import express from "express";
import { Story } from "../models";
import {User } from "../models"
const router = express.Router();


router.get("/" ,async(req, res, next) => {
  
  res.json("this is the story endpoint");
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

router.post('/', async (request, response, next) => {
  
  const { name,author,characters,} = request.body;
  const { user } = request;
  const currentuser = User.findOne({ username: author })

  const story = new Story({
    name,
    author: currentuser._id,
    characters:characters,
    created: Date.now(),
    
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


router.post('/character,',  async (request, response, next) =>{
  const {name,description,color,story_Id}= request.body
  const { user } = request;
  

  const charater = new Charater({
    name: name,
    description: description,
    color: color

  })


  try {
    const savedCharater = await charater.save()
    user.characterboard = user.characterboard.concat(savedCharater._id)
    
  Story.findOneAndUpdate(
    story_Id, 
    {
      $push: { characters: charater },
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










  



module.exports = router;