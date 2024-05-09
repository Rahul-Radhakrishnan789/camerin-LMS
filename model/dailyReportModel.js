const mongoose=require("mongoose")



const dailyReportSchema=new mongoose.Schema({
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

    }
    
    
    
})

const dailyReport=mongoose.model('dailyReport',dailyReportSchema)

module.exports=dailyReport