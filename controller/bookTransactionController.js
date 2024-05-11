const bookTransactionModel=require("../model/bookTransactionModel")
const bookModel=require("../model/bookModel")
const {sendEmailToUser}=require("../utils/sendEmail")
const Razorpay = require("razorpay");
const crypto = require("crypto");





const studentRequestForParticulairBook=async(req,res)=>{

    const bookid=req.params.bookid
    const studentid=req.params.studentid


     const bookTransaction=new bookTransactionModel({
        studentid:studentid,
        bookid:bookid,
        startDate:req.body.startDate,
        endDate:req.body.endDate
     })
     await bookTransaction.save()

     res.status(201).json({
        message:"success",

     })
}

const getAllUnApprovedTransactions=async(req,res)=>{

    const allUnapprovedRequest=await bookTransactionModel.find({isApproved:false}).populate("bookid").populate("studentid")

    res.status(200).json({
        message:"succes",
        data:allUnapprovedRequest
    })
}

const ApproveBookTransaction=async(req,res)=>{
    const { bookTransactionId } = req.params;

    // Find the book transaction by ID
    const bookTransaction = await bookTransactionModel.findById(bookTransactionId);

    // If book transaction not found
    if (!bookTransaction) {
        return res.status(404).json({ message: "Book transaction not found" });
    }

    // If book transaction is already approved
    if (bookTransaction.isApproved) {
        return res.status(400).json({ message: "Book transaction is already approved" });
    }

    // Update isApproved field to true
    bookTransaction.isApproved = true;

  
    await bookTransaction.save();

    // Decrease available copies of the book by 1
    const book = await bookModel.findById(bookTransaction.bookid);
    if (book.availiableCopies > 0) {
        book.availiableCopies -= 1;
        await book.save();
   }
   return res.status(201).json({
     message:"success"
   })
}
// const updateTransaction=async(req,res)=>{
//     const currentDate = new Date();
//         const transactions = await bookTransactionModel.find({ endDate: { $lt: currentDate }, isDispatch: false });

//         transactions.forEach(transaction => {
//             const dueDate = transaction.endDate;
//             const daysOverdue = Math.ceil((currentDate - dueDate) / (1000 * 60 * 60 * 24)); // Calculate days overdue
//             const fine = daysOverdue * 10; // Fine is incremented by 10 for each day overdue

//             // Update transaction
//             transaction.fine = fine;

//             // Save the updated transaction
//             transaction.save();
//         });

//         console.log("Transactions updated successfully.");
    
    
    

// }

const getTransactionsWithDueDateToday = async (req, res) => {
  
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0]; // Format: yyyy-mm-dd
        const transactions = await bookTransactionModel.find({ endDate: formattedToday ,isDispatch:false,isApproved:true}).populate("bookid").populate("studentid")
        
        return res.status(200).json(transactions);
    }


const  sentReminderEmailToStudent=async(req,res)=>{
    const id=req.params.id
    

    const transactionDetails=await bookTransactionModel.findById(id).populate("bookid").populate("studentid")

    await sendEmailToUser(transactionDetails.studentid.email)


    transactionDetails.isEmailSent=true;
     
    await transactionDetails.save()

    return res.status(200).json({
        message:"success"
    })

    

    

}   


const findTransactionsWithEndDatePassed = async (req, res) => {
      
    const today = new Date();
        const transactions = await bookTransactionModel.find({
            endDate: { $lt: today }, // endDate is less than today
            isFine: false ,// isFine is false
            isDispatch:false,
            isApproved:true
            
        }).populate("bookid").populate("studentid")
        
    
      return res.status(200).json({message:"success",data:transactions});
    
}

const applyFine=async(req,res)=>{
    const id=req.params.id

    const transaction=await bookTransactionModel.findById(id)


    transaction.isFine=true
    transaction.fine=50

    await transaction.save()

    return res.status(201).json({
        message:"success"
    })


}


const payFineFromStudentToDelayedDocument=async(req,res)=>{
    
     
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: 50 * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Something Went Wrong!" });
        }
        res.status(201).json({ data: order });
    });
}
const verifyPaymentFromDelayedTransaction=async(req,res)=>{
    const id=req.params.id

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const transaction=await bookTransactionModel.findById(id)

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");
     
    if (razorpay_signature === expectedSign) {
        
        transaction.isPayed=true

        await transaction.save()

        return res.status(200).json({
            message:"success"
        })

    }
    return res.status(301).json({
        message:"something went wrong"
    })


}

const getNotDispatchedTransactions=async(req,res)=>{

    const transactions=await bookTransactionModel.find({
        isDispatch:false,
        isApproved:true
    }).populate("bookid").populate("studentid")


    return res.status(200).json({
        message:"success",
        data:transactions
    })
}

const dispatchABook=async(req,res)=>{

     const transactionid=req.params.id

     const transaction=await bookTransactionModel.findById(transactionid)
     transaction.isDispatch=true
     await transaction.save()
     
     const book = await bookModel.findById(transaction.bookid);
         book.availiableCopies += 1;
         await book.save();
    return res.status(201).json({
      message:"success"
    })
     


}

const getBookStatusatoStudent=async(req,res)=>{
    const id=req.params.id

    const boodDetails=await bookTransactionModel.find({studentid:id})

    if(!boodDetails){
        return res.status(404).json({
            message:"no books requirested"
        })
    }

    return res.status(200).json({
        message:"success",
        data:bookDetails
    })
}

module.exports={
    studentRequestForParticulairBook,getAllUnApprovedTransactions,ApproveBookTransaction,getTransactionsWithDueDateToday,sentReminderEmailToStudent,
    findTransactionsWithEndDatePassed,applyFine,payFineFromStudentToDelayedDocument,verifyPaymentFromDelayedTransaction,getNotDispatchedTransactions,dispatchABook,getBookStatusatoStudent
}