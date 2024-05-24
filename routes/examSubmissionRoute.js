const upload=require("../middlewares/multer")
const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const examSubmission=require("../controller/examSubmissionController")



router.post("/submitexam/:studentId/:examId",upload.array("images",5),tryCatch(examSubmission.submitAnExamFromStudent))
router.put("/updateexam/:exmasubmittedId",upload.array("images",5),tryCatch(examSubmission.editExamFromStudent))
router.get("/getallsubmittedstudents/:examId",tryCatch(examSubmission.getSubmittedStudentsForAParticulairExam))





module.exports=router