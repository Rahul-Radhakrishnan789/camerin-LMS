const mongoose = require("mongoose");

const marksheetSchema = new mongoose.Schema({
    marksheet:[
        {
            subject:{
                type:String
            },
            totalmark:{
                type:Number
            },
            grade:{
                type:String
            }
        }
    ],
    title:{
        type:String
    },
    course:{
        type:String
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student"
    }
});

const marksheet = mongoose.model('marksheet', marksheetSchema);

module.exports = marksheet;