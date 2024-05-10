const mongoose=require("mongoose")



const bookSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    category:{
        type:String,
    },
    availiableCopies:{
        type:Number
    }
    
    
})

const book=mongoose.model('book',bookSchema)

module.exports=book

