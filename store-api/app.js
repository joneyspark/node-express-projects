const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('express-async-errors')
const productsRouter = require('./routes/products')
require('dotenv').config()


//middleware
app.use(express.static('/public'))
app.use(express.json())

// Routes

app.get('/', (req, res) => {
    res.send(`<h1>Store API</h1><a href="/api/v1/products">Products</a>`)
})

app.use('/api/v1/products', productsRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))

    } catch (error) {
        console.log(error)
    }
}

start()

