const medicakCertificateModel=require("../model/medicalCertificateModel")
const studentModel=require("../model/studentModel")
const teacherModel=require("../model/teacherModel")
const fs = require("fs");
const cloudinary = require("../cloudinary/cloudinary");

const addMedicalCertificate=async(req,res)=>{
    let urls = [];
   const id=req.params.studentId

   const student=await studentModel.findById(id)

   
   const uploader = async (path) => await cloudinary.uploads(path, "images");
   if (req.method == "POST") {
     const files = req.files;
 
     for (const file of files) {
       const { path } = file;
 
       const newPath = await uploader(path);
 
       urls.push(newPath);
 
       fs.unlinkSync(path);
     }

     

     const certificate=new medicakCertificateModel({
        title:req.body.title,
        Date:req.body.Date,
        studentId:id,
        course:student.course,
        imagefile:urls


     })
     await certificate.save()

     return res.status(200).json({ message: "Medical certificate attached" });

   
   }
   

}

const getAllUnapprovedMedicalCerificate=async(req,res)=>{
  
  const id=req.params.teacherId

  const teacher=await teacherModel.findById(id)
   const unApprovedCertificates=await medicakCertificateModel.find({
    course:teacher.course
   })

   return res.status(200).json({
    message:"success",
    date:unApprovedCertificates
   })
  
}

const ApproveAMedicalCertificate=async(req,res)=>{
  const id=req.params.certificateId
  
  const certificate=await medicakCertificateModel.findOne({_id:id})
  certificate.isApproved=true
  await certificate.save()

  return res.status(200).json({
    message:"Medical certifiacte approved succeessfull"
  })
}

module.exports={
    addMedicalCertificate,getAllUnapprovedMedicalCerificate,ApproveAMedicalCertificate
}