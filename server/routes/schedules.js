const express = require('express')
const {
    createSchedule, 
    getAllSchedules, 
    getSchedule, 
    deleteSchedule, 
    updateSchedule
} = require('../controllers/scheduleController')

const router = express.Router()

//Output all schedules
router.get('/', getAllSchedules)

//Access a particular schedule
router.get('/:id', getSchedule)

//Create a new schedule
router.post('/', createSchedule)

//Delete a schedule
router.delete('/:id', deleteSchedule)

//Update a schedule
router.patch('/:id', updateSchedule)

module.exports = router
