const bookModel=require("../model/bookModel")


const addBook=async(req,res)=>{
    const {title,category,availiableCopies}=req.body

    const book=new bookModel({
        title:title,
        category:category,
        availiableCopies:availiableCopies
    })
    
    await book.save()

    return res.status(201).json({
        message:"success"
    })
}

const getAllBooks=async(req,res)=>{

    const availableBooks = await bookModel.find({ availiableCopies: { $gt: 0 } });

        // Send response
        res.status(200).json(availableBooks);
}


module.exports={
    addBook,getAllBooks
}