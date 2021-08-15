import { groupImage } from "../images/images";

export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const groupProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  about: {
    type: String,
    default: 'This is a group profile default text'
  },
  groupTypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupCategory'
  }],
  image: {
    type: String,
    default: groupImage
  }
})

groupProfileSchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

groupProfileSchema.plugin(uniqueValidator)

const groupProfile = mongoose.model('GroupProfile', groupProfileSchema)
module.exports = groupProfile