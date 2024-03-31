const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

// Use createIndexes method
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
