const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']

    },
    complete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)