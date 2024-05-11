const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const bookTransaction=require("../controller/bookTransactionController")


router.post("/requestbook/:bookid/:studentid",tryCatch(bookTransaction.studentRequestForParticulairBook))
router.get("/getallunapprovedtransactions",tryCatch(bookTransaction.getAllUnApprovedTransactions))
router.put("/approvetransaction/:bookTransactionId",tryCatch(bookTransaction.ApproveBookTransaction))



module.exports=router