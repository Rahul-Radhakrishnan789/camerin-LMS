const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const marksheet=require("../controller/marksheetController")



router.post("/addmarksheet/:teacherId/:studentId",tryCatch(marksheet.addMarksheet))
router.get("/getmarksheet/:id",tryCatch(marksheet.getMarkSheetToTeacher))
router.get("/getmarktospecificstudent/:id",tryCatch(marksheet.getMarkToSpecificStudent))
router.put("/editmarksheet/:id",tryCatch(marksheet.editMarksheet))





module.exports=router