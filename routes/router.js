const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")
const auth = require("../middlewares/auth")
//User işlemleri
router.post("/login", controller.login)

//Koltuk işlemleri  
router.get("/all-chair",  controller.allChair)
router.get("/chair-by-id/:id", auth, controller.chairById)
router.post("/select-chair", auth, controller.selectChair)
router.post("/edit-name", auth, controller.editName)

module.exports = router