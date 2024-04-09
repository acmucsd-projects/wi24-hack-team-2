const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profSchema = new Schema({
    names:  {
        type: [], 
        required: true
    },
    classRatings:  {
        type: [], 
        required: true
    },
    overallRatings:  {
        type: [],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Prof', profSchema)

