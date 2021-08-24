const BalanceModel = require('../models/balance')
const TransactionModel = require('../models/transaction')

const { ObjectId } = require('mongodb')

class BalanceControllers {
    static async topUp(req, res) {
        try {
            const find = await BalanceModel.findOne({ userId: ObjectId(req.body.userId) })
            if (find) {
                await BalanceModel.updateOne(
                    { userId: ObjectId(req.body.userId) },
                    { $set: { saldo: +find.saldo + +req.body.saldo } }
                )
            } else {
                const data = {
                    userId: ObjectId(req.body.userId),
                    saldo: +req.body.saldo
                }

                const insert = new BalanceModel(data)
                await insert.save()
            }

            const newTransaction = {
                userId: ObjectId(req.body.userId),
                jumlah: +req.body.saldo,
                tanggal: Date.now()
            }

            const insertTransaction = new TransactionModel(newTransaction)
            await insertTransaction.save()
            res.status(200).json({ status: 200, message: 'Success topup' })
        } catch (err) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async getBalance(req, res) {
        try {
            const balance = await BalanceModel.findOne({ userId: ObjectId(req.params.id) })
            const transactions = await TransactionModel.find({ userId: ObjectId(req.params.id) })
            res.status(200).json({ status: 200, data: { balance, transactions } })
        } catch (err) {
            res.status(500).json({ status: 500, message: 'Oops!! something wrong' })
        }
    }
}

module.exports = BalanceControllers
