const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const TransactionSchema = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId
    },
    jumlah: {
        required: true,
        type: Number
    },
    tanggal: {
        required: true,
        type: Date
    }
})

const TransactionModel = mongoose.model('transaction', TransactionSchema)
module.exports = TransactionModel
