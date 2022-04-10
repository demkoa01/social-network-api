const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');
const moment = require('moment');


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
}, 
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const Thought = model('Thought', ThoughtSchema);

// virtual that retrieves the length of thoughts reactions 
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = Thought;