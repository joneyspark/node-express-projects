require('dotenv').config()
require('express-async-errors')
const express = require('express')

// extra security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit');

const app = express()
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/auth')

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

const notFound = require('./middleware/not-found')
const errorHanlderMiddleware = require('./middleware/error-handler')



// middleware
app.use(express.json())
app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
)

app.use(helmet())
app.use(cors())
app.use(xss())
// routes

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)


app.use(notFound)
app.use(errorHanlderMiddleware)


const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server Running in ${port}`))

    } catch (error) {
        console.log(error)
    }
}

start()