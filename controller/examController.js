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
        date:req.body.date,
        time:req.body.time,
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





const hours = today.getHours();
const minutes = today.getMinutes();
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
   
    const exams = await examModel.find({
        // date: today.toISOString().split('T')[0], // Extract date only (YYYY-MM-DD)
        date: today.toISOString(), // Extract date only (YYYY-MM-DD)

        time: { $gte: formattedTime }, // Get exams after current time
        course:course
      });

      return res.status(201).json({
        message:"success",
        data:exams
      })



}



module.exports={
    addExam,examToStudent
}