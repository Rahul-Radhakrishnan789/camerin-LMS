const mongoose=require("mongoose")



const feeSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    amount:{
        type:Number,
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },
    course:{
        type:String
    },
    DueDate:{
        type:String

    },
    students:[{
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"      
          },
       isPayed:{
        type:Boolean,
        default:false
       }

    }],

    
    
})

const fee=mongoose.model('fee',feeSchema)

module.exports=fee