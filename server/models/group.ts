export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const groupSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  jobAds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobAd'
  }],
  conversations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  }],
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupProfile'
  },
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification'
  }],
  kind: {
    type: String,
    default: 'Group'
  }
})

groupSchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

groupSchema.plugin(uniqueValidator)

const Group = mongoose.model('Group', groupSchema)
module.exports = Group