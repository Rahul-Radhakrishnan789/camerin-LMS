const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const student = require("../controller/studentController")


router.post("/register",tryCatch(student.register))

router.post("/login",tryCatch(student.login))

router.get("/getstudent/:id",tryCatch(student.getIndividualStudentData))

router.put("/updatestudent/:id",tryCatch(student.editStudentProfile))

router.get("/getteachers/:id",tryCatch(student.getAllTeachersUnderSpecificDepartmet))


module.exports =router