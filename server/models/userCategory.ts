export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  profession: {
    type: String,
    unique: true,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserCategory'
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserCategory'
  }],
  kind: {
    type: String,
    default: 'UserCategory'
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

userCategorySchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userCategorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('UserCategory', userCategorySchema)