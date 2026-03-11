
const express = require('express')
const route = express.Router()
const CONTROLLER = require('../contollers')
const authorize = require('../middleware/authorize')
const { upload } = require('../middleware/multer')

route.post('/addProduct',
    authorize(true, ['admin']),
    upload.fields([
        { name: 'displayImage', maxCount: 1 },
        { name: 'galleryImages', maxCount: 6 }
    ]),
    CONTROLLER.PRODUCT.addProduct
)

route.put('/update-product/:id',
    authorize(true, ['admin']),
    CONTROLLER.PRODUCT.updateProduct
)

route.get('/product',
    CONTROLLER.PRODUCT.getAppProduct
)

route.get('/getProduct',
    authorize(true, ['admin']),
    CONTROLLER.PRODUCT.getProducts
)

route.get('/getProduct/:id',
    authorize(true, ['admin']),
    CONTROLLER.PRODUCT.getProducts
)

module.exports = route