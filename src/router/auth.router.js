const express = require('express')
const router = express.Router()
const validation = require('../validation/index')
const userSchemaValidation = require('../validation/user.validation')
const userController = require('../controller/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post("/register", validation.validate(userSchemaValidation.register), userController.register)
router.post("/login", validation.validate(userSchemaValidation.login), userController.login)
router.get("/profile", authMiddleware.verifyToken, userController.getProfile)
router.post("/logout", authMiddleware.verifyToken, userController.logout)
module.exports = router