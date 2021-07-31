export {};
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const jobquerySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
    default: new Date()
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

jobquerySchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

jobquerySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Jobquery', jobquerySchema)

/*
  type Jobquery {
    id: ID!
    content: String!
    postedOn: Date!
    startSchedule: Date!
    endSchedule: Date
    wantedCategories: [SkillCategoryOrGroupCategory!]!
    visible: Boolean!
    postedBy: UserOrGroup!
  }
*/