const Schedule = require('../models/scheduleModel')
const mongoose = require('mongoose')

//get all schedules
const getAllSchedules = async (req, res) => {
    const schedules = await Schedule.find({}).sort({})
    res.status(200).json(schedules)
}

//get one schedule
const getSchedule = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such schedule'})
    }

    const schedule = await Schedule.findById(id)

    if (!schedule) {
        return res.status(404).json({error: 'No such schedule'})
    }

    res.status(200).json(schedule)
}

//create new schedule
const createSchedule = async (req, res) => {
    const {title, classes, class_num, credits} = req.body

    try {
        const schedule = await Schedule.create({title, classes, class_num, credits})
        res.status(200).json(schedule)
    } 

    catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete schedule
const deleteSchedule = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such schedule'})
    }

    const schedule = await Schedule.findOneAndDelete({_id: id})

    if (!schedule) {
        return res.status(404).json({error: 'No such schedule'})
    }

    res.status(200).json(schedule)
}

//update schedule
const updateSchedule = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such schedule'})
    }

    const schedule = await Schedule.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!schedule) {
        return res.status(404).json({error: 'No such schedule'})
    }

    res.status(200).json(schedule)
}

module.exports = {
    createSchedule, 
    getAllSchedules, 
    getSchedule, 
    deleteSchedule, 
    updateSchedule
}
