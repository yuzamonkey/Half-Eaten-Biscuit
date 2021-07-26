export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
    refPath: 'userOrGroup'
  }],
  messages: [{
    body: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      //ref: 'User'
      refPath: 'userOrGroup'
    }
  }],
  userOrGroup: {
    type: String,
    enum: ['User', 'Group']
  },
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