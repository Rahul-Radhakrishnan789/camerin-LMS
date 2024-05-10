const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const book=require("../controller/bookController")

router.post("/addbook",tryCatch(book.addBook))
router.get("/getallbook",tryCatch(book.getAllBooks))






module.exports=router