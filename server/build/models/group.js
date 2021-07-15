"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    jobQueries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jobquery'
        }],
    conversations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation'
        }],
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupProfile'
    }
});
groupSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
groupSchema.plugin(uniqueValidator);
const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
