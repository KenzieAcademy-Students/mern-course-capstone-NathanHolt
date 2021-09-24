import mongoose from 'mongoose'

const pathSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 40,
  },
  description: {
    type: String,
    maxlength: 300,
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
