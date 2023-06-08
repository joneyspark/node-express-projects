const { BadRequest } = require('../errors')
const login = async (req, res) => {
    const { username, password } = req.body
    const id = new Date().getDate()
    if (!username || !password) {
        throw new BadRequest('Please provide email and password')
    }
    const token = jwt.sign({ id, username }, process.env.JWT_SECRECT, { expiresIn: '30d' })
    res.status(200).json({ msg: 'user Created', token })
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello ${req.user.username}`, secrect: `Here is your authorizated data your luckey number is ${luckyNumber}` })
}

module.exports = {
    login,
    dashboard
}