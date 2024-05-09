const mongoose=require("mongoose")



const assignmentModel=new mongoose.Schema({
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

const assignment=mongoose.model('assignment',assignmentModel)

module.exports=assignment