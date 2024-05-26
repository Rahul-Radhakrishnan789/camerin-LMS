const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  endTime:{
    type:String,
    required:true
  },
  course: {
    type: String,
    required: true,
  },
  imageFile:[],
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher', 
    required: true,
  },
});

const exam=mongoose.model('exam', examSchema);


module.exports = exam