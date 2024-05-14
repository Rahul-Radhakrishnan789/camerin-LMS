const mongoose=require("mongoose")



const medicalcertificateSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    Date:{
        type:Date,
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student" 
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    course:{
        type:String
    },
    imagefile:[],
   
   
    
    
})

const medicalcertifiacate=mongoose.model('medicalcertifiacate',medicalcertificateSchema)

module.exports=medicalcertifiacate