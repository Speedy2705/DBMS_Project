const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSigIn")
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const doctorAddController = require('../controller/doctor/doctorAdd')




router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)


router.post("/addDoctor",authToken,doctorAddController)

module.exports = router