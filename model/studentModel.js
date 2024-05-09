const mongoose=require("mongoose")



const studentSchema=new mongoose.Schema({
    userFullName:{
        type:String,
    },
    age:{
        type:String,
    },
    dob:{
        type:String
    },
    gender:{
        type:String
    },
    course:{
        type:String
    },
    address:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,  
    }
})

const student=mongoose.model('student',studentSchema)

module.exports=student