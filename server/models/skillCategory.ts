export { };
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const skillCategorySchema = new mongoose.Schema({
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
    ref: 'SkillCategory'
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillCategory'
  }]
})

skillCategorySchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

skillCategorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('SkillCategory', skillCategorySchema)