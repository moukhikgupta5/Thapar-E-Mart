const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    userId: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    age: {
        type: String,
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('User', UserSchema);

module.exports = User;