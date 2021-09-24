import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const characterSchema = new mongoose.Schema([
  {
    name: {
      type: String,
      required: true,
      maxlength: 40,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    color: {
      type: String,
      maxlength: 30,
    },
    paths: [
      {
        type: ObjectId,
        ref: 'Path',
      },
    ],
  },
])

const Character = mongoose.model('Character', characterSchema)

export default Character
