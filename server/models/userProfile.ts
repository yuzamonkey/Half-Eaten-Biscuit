export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  about: {
    type: String,
    default: 'This is a user profile'
  },
  skills: {

  }
})

userProfileSchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userProfileSchema.plugin(uniqueValidator)

const userProfile = mongoose.model('UserProfile', userProfileSchema)
module.exports = userProfile