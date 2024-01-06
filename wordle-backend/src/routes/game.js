const express = require("express")
const router = express.Router()
const {checkWordController} = require("../controllers/gameController")

router.post("/check", checkWordController)


module.exports=router