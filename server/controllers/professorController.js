const Prof = require('../models/profModel')
const mongoose = require('mongoose')
const maker = require('../scheduling/schedule_maker')

//get professor list for a class
const getProfessors = async (req, res) => {
    const {courseCode} = JSON.parse(req.body)
    const {name_list, course_list, overall_list} = maker.findProfs(courseCode)

    try {
        profList = await Prof.create({name_list, course_list, overall_list})
        res.status(200).json(profList)
    } 

    catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getProfessors
}
