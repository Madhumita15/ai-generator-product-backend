const express = require('express')
const router = express.Router()
const validation = require('../validation/index')
const productSchemaValidation = require('../validation/product.validation')
const productController = require('../controller/product.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post("/generate-product",authMiddleware.verifyToken, validation.validate(productSchemaValidation.generateProduct), productController.generateProduct)
router.get("/history", authMiddleware.verifyToken, productController.productHistory)
router.get("/product/:id", authMiddleware.verifyToken, productController.productById)
router.delete("/product/:id/delete", authMiddleware.verifyToken, productController.deleteProductById)
router.put("/product/:id/regenerate", authMiddleware.verifyToken,validation.validate(productSchemaValidation.generateProduct), productController.regenerateProduct)
router.post("/product/:id/caption", authMiddleware.verifyToken, productController.generateCaption)

module.exports = router