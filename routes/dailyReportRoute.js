const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const dailyReport=require("../controller/dailyReportController")


router.post("/adddailyreport/:id",tryCatch(dailyReport.addDailyReport))
router.get("/getdailyreporttoteacher/:id",tryCatch(dailyReport.getDailyReportToTeacher))
router.get("/getdailyreporttostudent/:id",tryCatch(dailyReport.getDailyReportToSpecificStudents))
router.put("/updatedailyreport/:id",tryCatch(dailyReport.updateDailyReport))





module.exports=router 