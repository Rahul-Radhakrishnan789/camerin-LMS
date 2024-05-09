const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const homeWork=require("../controller/homeWorkController")



router.post("/addhomework/:id",tryCatch(homeWork.addHomeWork))
router.get("/gethomeworktostudent/:id",tryCatch(homeWork.getHomeWorkToStudent))
router.put("/updatehomework/:id",tryCatch(homeWork.updateHomework))
router.delete("/deletehomework/:id",tryCatch(homeWork.deleteHomework))


module.exports=router



