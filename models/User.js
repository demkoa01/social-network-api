const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, 
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const User = model('User', UserSchema);

// create virtual to retrieve the number of friends a user has
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = User;
