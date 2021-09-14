import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  storyboard: [
    {
      type: ObjectId,
      ref: 'Story',
    },
  ],
})

const User = mongoose.model('User', userSchema)

export default User
