const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const leave=require("../controller/leaveReportController")

router.post("/addleaverequest/:id",tryCatch(leave.addLeaveReport))
router.get("/getleavereports/:id",tryCatch(leave.getLeaveReportofSpecificCourse))
router.delete("/deleteleavereport/:id",tryCatch(leave.deleteLeaveReport))
router.put("/approverequest",tryCatch(leave.addLeaveReport))
router.get("/getstatus/:id",tryCatch(leave.getLeaveReoprtStatusToStudent))


module.exports=router