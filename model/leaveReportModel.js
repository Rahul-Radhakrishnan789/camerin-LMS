const mongoose=require("mongoose")



const leaveReportSchema=new mongoose.Schema({
    Date:{
        type:String,
    },
    description:{
        type:String,
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student"
    },
    course:{
        type:String
    },
    
    
    
})

const leaveReport=mongoose.model('leaveReport',leaveReportSchema)

module.exports=leaveReport