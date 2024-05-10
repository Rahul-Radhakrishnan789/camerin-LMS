const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const notice=require("../controller/noticeController")


router.post("/addnotice/:id",tryCatch(notice.addNotice))
router.get("/getnoticetostudent/:id",tryCatch(notice.getNoticeToStudent))
router.put("/updatenotice/:id",tryCatch(notice.updateNotice))
router.delete("/deletenotice/:id",tryCatch(notice.deleteNotice))
router.get("/getnoticetoteacher/:id",tryCatch(notice.getNoticeCreatedByTeacher))






module.exports=router