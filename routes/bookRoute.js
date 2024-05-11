const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const book=require("../controller/bookController")

router.post("/addbook",tryCatch(book.addBook))
router.get("/getallbook",tryCatch(book.getAllBooks))
router.get("/getbook/:category",tryCatch(book.getBookByCategory))
router.get("/getallbooktolibrarian",tryCatch(book.getAllBookDetailsToLibrarian))






module.exports=router