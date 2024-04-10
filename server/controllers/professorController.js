const Prof = require('../models/profModel')
const mongoose = require('mongoose')
const maker = require('../scheduling/schedule_maker')

//get professor list for a class
const getProfessors = async (req, res) => {
    try {
        const {courseCode} = req.body
        const data = await maker.findProfs(courseCode)
        res.status(200).json(data)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getProfessors
}
