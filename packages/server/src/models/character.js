import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const characterSchema = new mongoose.Schema([
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
    },
    description: {
      type: String,
      maxLength: 120,
    },
    color: {
      type: String,
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