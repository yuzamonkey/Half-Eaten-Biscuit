export { };
import { blankProfileImage } from '../images/images'
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  about: {
    type: String,
    default: 'This is a user profile default text'
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  image: {
    type: String,
    default: blankProfileImage
  },
  isEditedByUser: {
    type: Boolean,
    default: false
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