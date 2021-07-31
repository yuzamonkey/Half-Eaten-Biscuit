export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const groupCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupCategory'
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupCategory'
  }],
  kind: {
    type: String,
    default: 'GroupCategory'
  }
})

groupCategorySchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

groupCategorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('GroupCategory', groupCategorySchema)