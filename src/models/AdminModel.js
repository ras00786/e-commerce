const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
        enum:  ['admin'],
        required: true
    }
});

module.exports = mongoose.model("Admins", AdminSchema);
