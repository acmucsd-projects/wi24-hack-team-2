const express = require('express')
const {
    getProfessors
} = require('../controllers/professorController')

const router = express.Router()

router.post('/', getProfessors)

module.exports = router
