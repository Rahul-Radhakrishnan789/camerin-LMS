const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
// const assignment=require("../controller/assignmentController")
const assignment=require("../controller/assignmentController")
const upload=require("../middlewares/multer")



router.post("/addassignment/:id",tryCatch(assignment.addAssignment))
router.get("/getassignmenttostudent/:id",tryCatch(assignment.getAssignmentsForStudent))
router.post("/assignments/:assignmentId/students/:studentId/upload",upload.array("images",5),tryCatch(assignment.submitAssignment))
router.get("/assignments/:id",tryCatch(assignment.viewallSubmittedStudents))
router.put("/assignment/:assignmentId/:studentId",tryCatch(assignment.assignMarkForSubmittedStudent))
router.put("/assigment/:assignmentId",tryCatch(assignment.editAssignment))
router.get("/assignments/teacher/getteacher/:teacherId",tryCatch(assignment.getAssaignmentsCreatedByTeacher))



module.exports=router