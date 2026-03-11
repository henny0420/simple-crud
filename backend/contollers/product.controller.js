const mongoose = require('mongoose')
const DB = require('../models')
const { uploadOnCloudinary } = require('../utils/cloudinary')

const addProduct = async function (req, res) {
    try {
        const { name, price, discription, stock } = req.body
        if (!name || !price) return res.status(400).json({ success: false })

        const displayImage = req.files?.displayImage || []
        const galleryImages = req.files?.galleryImages || []

        if (displayImage.length == 0) return res.json({ message: 'display image id required' })
        const displayResult = await Promise.all(displayImage.map((val) => uploadOnCloudinary(val.path)))
        const galleryResult = await Promise.all(galleryImages.map((val) => uploadOnCloudinary(val.path)))

        const displayImageData = {
            url: displayResult[0].secure_url,
            public_id: displayResult[0].public_id
        }

        const galleryImageData = galleryResult.map((val) => ({ url: val.secure_url, public_id: val.public_id }))

        const newProduct = await DB.PRODUCT.create({
            name, price, discription, stock, displayImage: displayImageData, galleryImages: galleryImageData
        })

        return res.status(200).json({
            success: true,
            message: "product added successfully",
            newProduct
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const updateProduct = async function (req, res) {
    try {
        const {id} = req.params

        const { name, price, discription, stock } = req.body
        if (!id) return res.status(400).json({ sucess: false, message: "couldn't find the id" })

      

        const updateProduct = await DB.PRODUCT.findByIdAndUpdate(id, { name, discription, price, stock }, { new: true })
        if (updateProduct) {
            return res.status(200).json({
                message: "product updated successfully",
                updateProduct
            })
        }
    } catch (error) {
        return res.status(500).json({
            mesasge: error.message
        })
    }
}

const getAppProduct = async(req,res)=> {
    try {

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page-1)*limit
        const products = await DB.PRODUCT.find({}).skip(skip).limit(limit)

        const totalDocument = await DB.PRODUCT.find({}).countDocuments()
        if(!products) return res.status(400).json({message : 'no product fund' , success : false})

        res.status(200).json({
            products,
            totalDocument,
            currentPage : page,
            totalPages : Math.ceil(totalDocument/limit),
            success : true
        })
    } catch (error) {
        res.status(400).json({
            message : error?.message
        })
    }
}

const getProducts = async function(req,res){
    try {
        const {id} = req.params
        if(id) {
        const products = await DB.PRODUCT.findById(id)
        return res.status(200).json({
            products
        })
        }
        const products = await DB.PRODUCT.find({})
        
        if(!products) return res.status(400).json({message : 'no product found'})

        return res.status(200).json({
            products
        })
    } catch (error) {
        return res.status(400).json({
            message : error.messgae
        })
    }
}
module.exports = {
    addProduct, updateProduct , getAppProduct , getProducts
}