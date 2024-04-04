const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    title:  {
        type: String, 
        //title isn't required for user to enter, a default title will be given if none is provided
        required: true
    },
    classes:  {
        type: [], //list of classes in the schedule
        required: true
    },
    class_num:  {
        type: Number, //number of classes in the schedule
        required: true
    },
    credits:  {
        type: Number, //float, # of credits in the schedule
        required: true
    }
    //other aspects of a schedule
}, { timestamps: true })

module.exports = mongoose.model('Schedule', scheduleSchema)

