export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const parentCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParentCategory'
  }
})

parentCategorySchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

parentCategorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('ParentCategory', parentCategorySchema)