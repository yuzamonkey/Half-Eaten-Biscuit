export { };
import { blankProfileImage } from '../images/images'
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    default: ''
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserCategory'
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