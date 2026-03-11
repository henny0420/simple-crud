const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    price: {
        type: Number,
        required: true,
    },
    discription: {
        type: String
    },
    stock: Number,
    displayImage: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    galleryImages: [
        {
            url: { type: String },
            public_id: { type: String }
        }
    ]
}, { timestamps: true })

const Product = mongoose.model('products', productSchema)
module.exports = Product