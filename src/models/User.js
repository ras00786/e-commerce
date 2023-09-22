const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: (email) => /\S+@\S+\.\S+/.test(email),
                message: "Invalid email format"
            },

        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'user'], //-----> User can be admin or user 
        required: true
    }
});

module.exports = mongoose.model("Userrasool", userSchema);
