export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const conversationSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    body: String
  }]
})

conversationSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

conversationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Conversation', conversationSchema)