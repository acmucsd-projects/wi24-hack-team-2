const mongoose = require('mongoose')
const Course = require('../models/course')

//get professor list for a class
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        const result = [];
        courses.forEach(course => {
            result.push(course.get("code"))
        })
        res.status(200).json(result)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getCourses
}
