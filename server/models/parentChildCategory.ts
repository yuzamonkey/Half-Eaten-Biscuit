export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const parentChildCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParentChildCategory'
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParentChildCategory'
  }]
})

parentChildCategorySchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

parentChildCategorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('ParentChildCategory', parentChildCategorySchema)