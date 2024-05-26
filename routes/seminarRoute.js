const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
// const assignment=require("../controller/assignmentController")
const seminar=require("../controller/seminarController")
const upload=require("../middlewares/multer")



router.post("/addseminar/:id",tryCatch(seminar.addSeminar))
router.get("/getseminartostudent/:id",tryCatch(seminar.getSeminarForStudent))
router.post("/seminar/:seminarId/students/:studentId/upload",upload.array("images",5),tryCatch(seminar.submitSeminar))
router.get("/seminar/:id",tryCatch(seminar.viewallSubmittedStudents))
router.put("/seminar/:seminarId/:studentId",tryCatch(seminar.assignMarkForSubmittedStudent))
router.put("/seminar/:seminarId",tryCatch(seminar.editseminar))
router.get("/seminar/teacher/getteacher/:teacherId",tryCatch(seminar.getSeminarCreatedByTeacher))
router.put("/seminar/:seminarId/students/:studentId/upload",upload.array("images",5),tryCatch(seminar.editASeminarByStudent))



module.exports=router