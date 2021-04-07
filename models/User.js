const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'You need to provide a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'You need to provide an email!',
            trim: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    // we need to tell the schema that it can use virtuals.
    // we'll need to tell the Mongoose model that it should use any getter function we've specified.
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    // We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
    id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() { 
    return this.friends.length;
});



// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;