const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const BalanceSchema = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        index: true,
        unique: true
    },
    saldo: {
        required: true,
        type: Number
    }
})

const BalanceModel = mongoose.model('Balance', BalanceSchema)
module.exports = BalanceModel
