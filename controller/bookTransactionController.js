const bookTransactionModel=require("../model/bookTransactionModel")
const bookModel=require("../model/bookModel")




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

    const allUnapprovedRequest=await bookTransactionModel.find({isApproved:false})

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



module.exports={
    studentRequestForParticulairBook,getAllUnApprovedTransactions,ApproveBookTransaction
}