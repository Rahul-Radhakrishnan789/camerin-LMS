const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const timetable=require("../controller/examTimeController")


router.post("/addtimetable/:id",tryCatch(timetable.addTimeTable))
router.get("/gettimetabletoteacher/:id",tryCatch(timetable.getTimetableTeacher))
router.get("/gettimetabeletostudent/:id",tryCatch(timetable.gettimeTableToStudentUnerSpecificBatch))

router.put("/edittimetable/:id",tryCatch(timetable.editTimeTable))


module.exports=router