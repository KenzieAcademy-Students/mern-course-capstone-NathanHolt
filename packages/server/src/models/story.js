import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const storySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 120,
    },
    author: {
      type: ObjectId,
      ref: 'User',
    },
    created: {
      type: Date,
      default: Date.now,
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
