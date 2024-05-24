const mongoose = require('mongoose');

const examSubmissionSchema = new mongoose.Schema({
  
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exam', 
        required: true,
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"student"
    },
    isSubmitted:{
        type:Boolean,
        default:false

    },

    imageFile:[],
});

const examSubmission=mongoose.model('examSubmission', examSubmissionSchema);


module.exports = examSubmission