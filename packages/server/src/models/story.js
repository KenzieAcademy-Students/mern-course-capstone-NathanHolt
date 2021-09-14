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
        name: {
          type: String,
          required: true,
          maxlength: 30,
        },
        text: {
          type: String,
          maxLength: 120,
        },
        color: {
          type: string,
        },
        paths: [
          {
            type: ObjectId,
            ref: 'Path',
          },
        ],
      },
    ],
  },
  { timestamps: true }
)

const Story = mongoose.model('Story', storySchema)

export default Story
