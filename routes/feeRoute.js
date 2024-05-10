const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const fee=require("../controller/feeController")



router.post("/addfee/:id",tryCatch(fee.addFee))
router.get("/getfee/:id",tryCatch(fee.getfeeToSpecificDepartment))
router.get("/teacher/getfee/:id",tryCatch(fee.feeDetailsToTeacher))
router.post("/student/payment",tryCatch(fee.addPayment))
router.post("/student/verifypayment/:studentId/:feeId",tryCatch(fee.verifyPayment))
router.get("/getallpayedstudents/:id",tryCatch(fee.viewAllPayedStudents))





module.exports=router