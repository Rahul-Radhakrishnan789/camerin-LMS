const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const bookTransaction=require("../controller/bookTransactionController")


router.post("/requestbook/:bookid/:studentid",tryCatch(bookTransaction.studentRequestForParticulairBook))
router.get("/getallunapprovedtransactions",tryCatch(bookTransaction.getAllUnApprovedTransactions))
router.put("/approvetransaction/:bookTransactionId",tryCatch(bookTransaction.ApproveBookTransaction))
router.get("/getalltransactionwithduedate",tryCatch(bookTransaction.getTransactionsWithDueDateToday))
router.post("/sendemailtostudent/:id",tryCatch(bookTransaction.sentReminderEmailToStudent))
router.get("/getalldocumentswithduedatepassed",tryCatch(bookTransaction.findTransactionsWithEndDatePassed))
router.put("/applyfine/:id",tryCatch(bookTransaction.applyFine))
router.post("/payfine",tryCatch(bookTransaction.payFineFromStudentToDelayedDocument))
router.post("/verifypayment/:id",tryCatch(bookTransaction.verifyPaymentFromDelayedTransaction))
router.get("/getnotdispachedtransactions",tryCatch(bookTransaction.getNotDispatchedTransactions))
router.post("/dispachbook/:id",tryCatch(bookTransaction.dispatchABook))




module.exports=router