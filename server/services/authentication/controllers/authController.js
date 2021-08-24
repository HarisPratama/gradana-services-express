const UserModel = require('../models/user')
const { hash, comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class AuthControllers {
    static async register(req, res) {
        try {
            const newUser = {
                nama: req.body.nama,
                hp: req.body.hp,
                email: req.body.email,
                password: hash(req.body.password)
            }

            const insert = new UserModel(newUser)
            await insert.save()
            res.status(200).json({ status: 200, message: 'Success register' })
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ status: 500, message: 'Oops! something error' })
        }
    }

    static async login(req, res) {
        try {
            const findUser = await UserModel.findOne({ email: req.body.email })

            if (findUser) {
                const compare = comparePassword(req.body.password, findUser.password)
                if (compare) {
                    const payload = {
                        nama: findUser.nama,
                        hp: findUser.hp,
                        email: findUser.email
                    }

                    res.status(200).json({ status: 200, message: 'Success login', token: generateToken(payload), id: findUser._id })
                } else {
                    res.status(200).json({ status: 200, message: 'Wrong password' })
                }
            } else {
                res.status(200).json({ status: 200, message: 'Account not registered yet' })
            }

            res.status(200).json({ status: 200, message: 'Success register' })
        } catch (err) {
            res.status(500).json({ status: 500, message: 'Oops! something error' })
        }
    }
}

module.exports = AuthControllers
