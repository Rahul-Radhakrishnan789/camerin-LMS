const mongoose=require("mongoose")



const noticeSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },
    course:{
        type:String
    },
    Date:{
        type:String

    },
    expireAt: {
        type: Date,
        expires: 604800
    }
    
    
})

const notice=mongoose.model('notice',noticeSchema)

module.exports=notice