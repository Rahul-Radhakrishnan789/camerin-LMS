const mongoose = require("mongoose");

const attentenceSchema = new mongoose.Schema({
    attentence:[
        {
            studentId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"student" 
            },
            status:{
                type:String
            }
            
        }
    ],
    Date:{
        type:Date
    },
    course:{
        type:String
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    }
    
    
});

const attentence = mongoose.model('attentence', attentenceSchema);

module.exports = attentence;