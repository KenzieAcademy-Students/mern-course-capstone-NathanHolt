import express from "express";
import Character from "../models";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("this is the characters endpoint");
});

// retrieve all characters
router.get("/characters/all", async (req, res) => {
  try {
    const character = await Character.find({});

    if (character) res.status(200).json(character);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

// Create a character
router.post("/create", async (req, res) => {
  const { id, name, description, color } = req.body;
  // const { user } = req.body

  try {
    let story = await Story.findOne({ _id: id });
    // if (story && story.author.toString() === user._id) {
    if (story) {
      const character = new Character({
        name,
        description,
        color,
      });

      const savedCharacter = await character.save();
      story.characters = story.characters.concat(savedCharacter._id);

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
      );
      res.status(201).send(savedCharacter);
    }
  } catch (error) {
    res.status(422).send({ error: error });
  }
});

router.put("/character", async (request, response, next) => {
  const { name, description, color } = request.body;

  const { id } = request.params;

  try {
    const userChararters = await Character.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name:name,
        description: description,
        color: color,
      },
      {
        new: true,
        
      }
    );

    response.json(userChararters.toJSON());
  } catch (error) {
    response.status(404).end();
  }
});


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

      response.status(200).json(removedCharacter)
    } catch (err) {
      response.status(422).send({ error: error });
    }
  }
})

module.exports = router;
