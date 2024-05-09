const mongoose=require("mongoose")



const calenderSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    start:{
        type:Date,
    },
    end:{
        type:Date,
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },
    course:{
        type:String
    }
    
    
})

const calender=mongoose.model('calender',calenderSchema)

module.exports=calender

module.exports=calender