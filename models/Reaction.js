const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    
});

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;