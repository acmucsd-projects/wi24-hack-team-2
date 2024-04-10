const express = require('express')
const {
    getCourses,
} = require('../controllers/courseController')

const router = express.Router()

router.get('/', getCourses)

module.exports = router
