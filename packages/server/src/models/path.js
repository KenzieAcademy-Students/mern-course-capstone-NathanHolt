import mongoose from 'mongoose'

const pathSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
  },
  description: {
    type: String,
    maxlength: 120,
  },
  start: [
    {
      type: Number,
      required: true,
    },
  ],
  end: [
    {
      type: Number,
      required: true,
    },
  ],
})

const Path = mongoose.model('Path', pathSchema)

export default Path
