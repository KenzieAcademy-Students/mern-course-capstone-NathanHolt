import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const storySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 75,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    characters: [
      {
        type: ObjectId,
        ref: 'Character',
      },
    ],
  },
  { timestamps: true }
)

const Story = mongoose.model('Story', storySchema)

export default Story
