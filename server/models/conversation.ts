export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const conversationSchema = new mongoose.Schema({
  participants: [{
    kind: String,
    object: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'participants.kind'
    }
  }],
  messages: [{
    body: String,
    sender: {
      kind: String,
      object: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'messages.sender.kind'
      }
    },
    time: {
      type: Date,
      default: new Date()
    }
  }],
  lastActive: {
    type: Date,
    default: new Date()
  }
})

conversationSchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

conversationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Conversation', conversationSchema)