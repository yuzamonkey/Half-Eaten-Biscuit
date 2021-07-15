"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const groupProfileSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    about: {
        type: String,
        default: 'This is a group profile'
    }
});
groupProfileSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
groupProfileSchema.plugin(uniqueValidator);
const groupProfile = mongoose.model('GroupProfile', groupProfileSchema);
module.exports = groupProfile;
