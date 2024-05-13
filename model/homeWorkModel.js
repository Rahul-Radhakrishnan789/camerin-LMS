const mongoose=require("mongoose")



const homeWorkSchema=new mongoose.Schema({
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
    }
    // expireAt: {
    //     type: Date,
    //     expires: 86400
    // }
    
    
})

const homeWork=mongoose.model('homeWork',homeWorkSchema)

module.exports=homeWork