const examModel=require("../model/examModel")
const teacherModel=require("../model/teacherModel")
const studentModel=require("../model/studentModel")
const fs = require("fs");
const cloudinary = require("../cloudinary/cloudinary");


const addExam=async(req,res)=>{
    const id=req.params.teacherId
    const teacher=await teacherModel.findById(id)
    let urls = [];


    const uploader = async (path) => await cloudinary.uploads(path, "images");
   if (req.method == "POST") {
     const files = req.files;
 
     for (const file of files) {
       const { path } = file;
 
       const newPath = await uploader(path);
 
       urls.push(newPath);
 
       fs.unlinkSync(path);
     }

     const startDate=req.body.date.split('T')[0]

     console.log(startDate);

    //  const certificate=new medicakCertificateModel({
    //     title:req.body.title,
    //     Date:req.body.Date,
    //     studentId:id,
    //     course:student.course,
    //     imagefile:urls


    //  })
    //  await certificate.save()

    const exam=new examModel({
        title:req.body.title,
        date:startDate,
        time:req.body.time,
        endTime:req.body.endTime ,  //endTime nde T sreddikk ambaane
        course:teacher.course,
        teacherId:id,
        imageFile:urls


    })
    await exam.save()

     return res.status(200).json({ message: "Exam added successfully" })

   
   }

    
}


const examToStudent=async(req,res)=>{

    const id=req.params.studentId

    const student=await studentModel.findById(id)
    const course=student.course

    const today = new Date();
   console.log(today,"today");




const hours = today.getHours();
console.log("hours",hours);
const minutes = today.getMinutes();
console.log("minu",minutes);

const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
console.log ("frmtdate",formattedTime)
   const todayDate=today.toISOString().split('T')[0]

   console.log(todayDate,"today");

   typeof(todayDate)

   console.log(formattedTime,todayDate,id,"hy");
    // const exams = await examModel.find({
    //     // date: today.toISOString().split('T')[0], // Extract date only (YYYY-MM-DD)
    //     date:todayDate, // Extract date only (YYYY-MM-DD)

    //     time: { $lte: formattedTime }, // Get exams from current time
    //     course:course
    //   });
    const exams = await examModel.find({
        // date: today.toISOString().split('T')[0], // Extract date only (YYYY-MM-DD)
        date:`${todayDate}`, // Extract date only (YYYY-MM-DD)

        time: { $lte: formattedTime }, // Get exams from current time
        course:course,
        endTime:{ $gt: formattedTime}
      });


      return res.status(201).json({
        message:"success",
        data:exams
      })



}
//controller function for get all exam created by user

const getAllExamsCreatedByTeacher=async(req,res)=>{

const id=req.params.teacherId

const exams=await examModel.find({teacherId:id})

if(exams.length==0){
  return res.status(404).json({
    message:"no exam found created by this teacher"
  })
}


res.status(200).json({
  message:"success",
  data:exams
})

}



module.exports={
    addExam,examToStudent,getAllExamsCreatedByTeacher
}