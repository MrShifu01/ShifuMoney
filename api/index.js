const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const Transaction = require('./models/Transaction.js')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URI)
    const { name, description, datetime, price } = req.body
    const transaction = await Transaction.create({ name, description, datetime, price})
    res.status(200).json(transaction)
})

app.get('/api/transactions', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const transactions = await Transaction.find()
    res.json(transactions)
})

app.listen(8000, () => {
    console.log('Connected on 8000')
})