const joi= require('joi')

const userValidation = {
    body : joi.object({
        username : joi.string().required().min(3),
        password : joi.string().required().min(6),
        email : joi.string().required().min(6)
    })
}

module.exports = userValidation