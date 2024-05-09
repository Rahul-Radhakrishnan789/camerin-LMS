const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const calender=require("../controller/calenderController")


router.post("/calender/:id",tryCatch(calender.addEvent))

router.get("/calender/geteventtoteacher/:id",tryCatch(calender.getEventtoTeacher))

router.get("/calender/geteventtostudent/:studentId",tryCatch(calender.getEventToStudent))



module.exports=router