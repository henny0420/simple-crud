
const mongoose = require('mongoose')
const DB = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const singupController = async function(req,res){
    try {
        const{username , email , password} = req.body
    
        if(!username || !password || !email) return res.status(400).json({
            message : "fill all the details",
            sucess : false
        })
        
        
        const hashedPassword = await bcrypt.hash(password,10)
        
        const newUser = await DB.USER.create({
            username , email ,password : hashedPassword
        })
    
        return res.status(200).json({
            message : "new user created successfully",
            success : true,
            newUser
        })
    } catch (error) {
        res.status(400).json({
            message : "couldn't add the user",
            success : false
        })
    }
}

const signinController = async function(req,res) {
    try {
        const {email,password} = req.body

        if(!email || !password) return res.status(400).json({
             message : "fill all the details",
            sucess : false
        })

        const checkUser = await DB.USER.findOne({email})
        
        if(!checkUser) return res.status(400).json({
            message : "user does not exist",
            sucess : false
        })
        
        const passwordCheck = await bcrypt.compare(password,checkUser.password)
        
        if(!passwordCheck) return res.status(400).json({
            message : "wrong credentials",
            success  : false
        })

        const token = jwt.sign({
            username : checkUser.username,
            id : checkUser._id,
            role : checkUser.role
        },process.env.SECRET_KEY)

        checkUser.token =token

        return res.status(200).json({
            message : 'user has signed up successfully',
            success : true,
            token,
            user : {
                id : checkUser._id,
                role:checkUser.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            sucess  :false
        })
    }
}

module.exports = {singupController , signinController}