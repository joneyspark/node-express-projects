const express = require('express')
const { getAllTasks, createTasks, getTasks, updateTasks, deleteTasks, } = require('../controllers/tasksController')
const router = express.Router()

router.route('/').get(getAllTasks).post(createTasks)
router.route('/:id').get(getTasks).patch(updateTasks).delete(deleteTasks)

module.exports = router