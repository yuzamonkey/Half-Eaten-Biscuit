const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date()
  },
  content: {
    type: String,
    default: 'Default content of a notification'
  },
  link: {
    type: String,
    default: "/"
  },
  relatedObject: {
    kind: String,
    object: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'relatedObject.kind'
    }
  },
  receivers: [{
    type: mongoose.Schema.Types.ObjectId
  }]
})

notificationSchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const NotificationModel = mongoose.model('Notification', notificationSchema)
module.exports = NotificationModel
