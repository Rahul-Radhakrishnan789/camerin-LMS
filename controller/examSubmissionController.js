const examSubmissionSchema=require("../model/examSubmissionStudent")
const fs = require("fs");
const cloudinary = require("../cloudinary/cloudinary");


const submitAnExamFromStudent=async(req,res)=>{


    const studentId=req.params.studentId
    const examId=req.params.examId
     
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

      
      const exam=new examSubmissionSchema({
          examId:examId,
          studentId:studentId,
          imageFile:urls,
          isSubmitted:true
      })
  
      await exam.save()
  
      return res.status(201).json({
          message:"exam submission successfull"
      })


    
    }
    



}

const getSubmittedExamToStudent=async(req,res)=>{
    const {studentId,examId}=req.params

    const submittedexam=await examSubmissionSchema.find({
        studentId:studentId,
        examId:examId
    })

    if(submittedexam.length==0){
        return res.status(404).json({
            message:"no data found"
        })
    }

    res.status(200).json({
        message:"success",
        data:submittedexam
    })
}


const editExamFromStudent=async(req,res)=>{
    const id=req.params.exmaId

    let urls = [];


    const exam=await examSubmissionSchema.findById(id)
    const uploader = async (path) => await cloudinary.uploads(path, "images");
    if (req.method == "PUT") {
      const files = req.files;
  
      for (const file of files) {
        const { path } = file;
  
        const newPath = await uploader(path);
  
        urls.push(newPath);
  
        fs.unlinkSync(path);
      }

      
    
     exam.imageFile=urls
  
      await exam.save()
  
      return res.status(201).json({
          message:"exam answer updated successfully successfull"
      })


    
    }



}

//function for get students who submitted their answer for the exam

const getSubmittedStudentsForAParticulairExam=async(req,res)=>{
    const id=req.params.examId

    const getSumittedStudents=await examSubmissionSchema.find({
        examId:id,isSubmitted:true
    }).populate("studentId")

    if(getSumittedStudents.length==0){
        return res.status(404).json({
            message:"no submitted students found"
        })
    }

    return res.status(200).json({
        message:"success",
        data:getSumittedStudents
    })
}

module.exports={
    submitAnExamFromStudent,editExamFromStudent,getSubmittedStudentsForAParticulairExam,getSubmittedExamToStudent
}