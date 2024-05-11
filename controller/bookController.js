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

        res.status(200).json(availableBooks);
}

const getBookByCategory=async(req,res)=>{
    const { category } = req.params;

    
    const books = await bookModel.find({ category, availiableCopies: { $gt: 0 } });

    res.status(200).json(books);
}

module.exports={
    addBook,getAllBooks,getBookByCategory
}