const mongoose=require("mongoose")



const serminarModel=new mongoose.Schema({
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
    startDate: {
        type: String
    },
    deadLine:{
        type:String,

    },
    students:[{
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"      
          },
          score:{
            type:Number
          },
          imagefile:[],
       isSubmitted:{
        type:Boolean,
        default:false
       }

    }]
    
    
})

const seminar=mongoose.model('seminar',serminarModel)

module.exports=seminar