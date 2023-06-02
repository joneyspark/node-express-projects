const { createCustomError } = require('../errors/custom-error.js')
const asyncWrapper = require('../middleware/async.js')
const Task = require('../models/taskModel.js')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    // res.status(200).json({ tasks })
    // res.status(200).json({ tasks, amount: tasks.length })
    // res.status(200).json({ success: true, data: { tasks, nbHits: tasks.length } })
    res.status(200).json({ status: "Success", data: { tasks, nbHits: tasks.length } })
})



const createTasks = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTasks = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })

    if (!task) {
        return next(createCustomError(`No Task with this id: ${taskId}`, 404))
    }
    res.status(200).json({ task })

})
const updateTasks = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findByIdAndUpdate(
        { _id: taskID },
        req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return res.status(404).json({ msg: `No Task with this id: ${taskId}` })
    }
    res.status(200).json({ task })

})
const deleteTasks = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
        return res.status(404).json({ msg: `No Task with this id: ${taskId}` })
    }
    res.status(200).json({ msg: 'Deleted Successfully' })
})


module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks,
}