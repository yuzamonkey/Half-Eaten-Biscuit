export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const materializedCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  path: {
    type: String,
    required: true
  }
})

materializedCategorySchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

materializedCategorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('MaterializedCategory', materializedCategorySchema)