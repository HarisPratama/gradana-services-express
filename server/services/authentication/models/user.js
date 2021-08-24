const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
    nama: {
        required: true,
        type: String
    },
    hp: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        index: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
})

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel
