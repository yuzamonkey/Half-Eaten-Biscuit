export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const jobAdSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true
  },
  postedOn: {
    type: Date,
    default: new Date()
  },
  startSchedule: {
    type: Date,
    required: true
  },
  endSchedule: {
    type: Date
  },
  wantedCategories: [{
    kind: String,
    object: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'wantedCategories.kind'
    }
  }],
  postedBy: {
    kind: String,
    object: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'postedBy.kind'
    }
  },
  location: {
    type: String,
    required: true,
    default: 'No location'
  },
  salary: {
    type: String,
    required: true,
    default: 'No salary'
  },
  kind: {
    type: String,
    default: 'JobAd'
  }
})

jobAdSchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

jobAdSchema.plugin(uniqueValidator)

module.exports = mongoose.model('JobAd', jobAdSchema)
