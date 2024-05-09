const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
// const teacher = require("../controller/teacherController")
const teacher=require("../controller/teacherController")


router.get("/teacherdata/:id",tryCatch(teacher.teacherProfile))
router.get("/teacher/getstudentsunderdepartment/:id",tryCatch(teacher.getStudentsUnderSpesificDepartment))








module.exports=router