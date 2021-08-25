const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const router = require('./routers')

mongoose.connect('mongodb+srv://haris:LG15y28EmXq9mCwm@cluster0.r8pel.mongodb.net/gradana?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', err => {
    console.log('connection error:', err)
})
db.once('open', () => {
    console.log('database connected');
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(3001, () => {
    console.log(`app running on port 3001`)
})
