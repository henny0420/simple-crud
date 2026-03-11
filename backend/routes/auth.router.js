const express = require('express')
const ROUTE = express.Router()
const CONTROLLER = require('../contollers')
const validate = require('../middleware/validate')
const validation = require('../validations')
ROUTE.post('/signup',
            validate(validation.USER),
            CONTROLLER.AUTH.singupController
)

ROUTE.post('/signin' , 
            CONTROLLER.AUTH.signinController
)

module.exports = ROUTE