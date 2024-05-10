const mongoose = require("mongoose");

const examTimetableSchema = new mongoose.Schema({
    timetable:[
        {
            subject:{
                type:String
            },
            date:{
                type:String
            },
            timeslot:{
                type:String
            }
        }
    ],
    course:{
        type:String
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    }
});

const ExamTimetable = mongoose.model('ExamTimetable', examTimetableSchema);

module.exports = ExamTimetable;