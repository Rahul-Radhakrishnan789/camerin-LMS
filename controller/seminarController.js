// const assignmentModel=require("../model/assignmentModel")
const teacherModel=require("../model/teacherModel")
const studentModel=require('../model/studentModel')
const fs = require("fs");
const cloudinary = require("../cloudinary/cloudinary");
const seminarModel=require("../model/seminarModel")




const addSeminar=async(req,res)=>{
    const id=req.params.id
    
    console.log(req.body);
    const teacher=await teacherModel.findById(id)

    const students=await studentModel.find({course:teacher.course})


    const seminar = new seminarModel({
        teacherId: id,
        title: req.body.title,
        description: req.body.description,
        course: teacher.course,
        startDate: req.body.startDate,
        deadLine: req.body.deadline,
        students: students.map(student => ({ student: student._id }))
    });

    await seminar.save()

    return res.status(201).json({
        message:"success"
    })
}

const getSeminarForStudent = async (req, res) => {

    const studentId = req.params.id;
    const today = new Date();
    const todayDate=today.toISOString().split('T')[0]

   
        // Find the student by ID
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Get assignments for the student's course where the student ID is in the assignment's students array
        const seminar = await seminarModel.find({
            course: student.course,
            'students.student': studentId,
            deadLine: { $gte: todayDate }

        });

        return res.status(200).json({ 
            message:"success",
            data:seminar
         });

}

const submitSeminar=async(req,res)=>{

    const { studentId, seminarId } = req.params;
    let urls = [];


    const seminar = await seminarModel.findById(seminarId);
        if (!seminar) {
            return res.status(404).json({ message: "seminar not found" });
        }


        const studentIndex = seminar.students.findIndex(student => student.student.toString() === studentId);
        if (studentIndex === -1) {
            return res.status(404).json({ message: "Student not found in seminar" });
        }
      
        const uploader = async (path) => await cloudinary.uploads(path, "images");
        if (req.method == "POST") {
          const files = req.files;
      
          for (const file of files) {
            const { path } = file;
      
            const newPath = await uploader(path);
      
            urls.push(newPath);
      
            fs.unlinkSync(path);
          }

          seminar.students[studentIndex].imagefile = urls; // Assuming Multer stores file path in req.file.path
          seminar.students[studentIndex].isSubmitted = true;

          await seminar.save();

          return res.status(200).json({ message: "Image uploaded and assignment marked as submitted" });

        
        }
        



}

//this controller function for edit a seminar that already submitted by student

const editASeminarByStudent=async(req,res)=>{

    const { studentId, seminarId } = req.params;
    let urls = [];


    const seminar = await seminarModel.findById(seminarId);
        if (!seminar) {
            return res.status(404).json({ message: "seminar not found" });
        }


        const studentIndex = seminar.students.findIndex(student => student.student.toString() === studentId);
        if (studentIndex === -1) {
            return res.status(404).json({ message: "Student not found in seminar" });
        }
      
        const uploader = async (path) => await cloudinary.uploads(path, "images");
        if (req.method == "PUT") {
          const files = req.files;
      
          for (const file of files) {
            const { path } = file;
      
            const newPath = await uploader(path);
      
            urls.push(newPath);
      
            fs.unlinkSync(path);
          }

          seminar.students[studentIndex].imagefile = urls; 
         

          await seminar.save();

          return res.status(200).json({ message: "Seminar edited successfully" });

        
        }
        

}





const viewallSubmittedStudents=async(req,res)=>{
    
    const seminarId = req.params.id;

        // Find the assignment by ID and populate the students field
        const seminar = await seminarModel.findById(seminarId ).populate('students.student');

        if (!seminar) {
            return res.status(404).json({ message: "seminar not found" });
        }

        // Filter students with isSubmitted set to true
        const submittedStudents = seminar.students.filter(student => student.isSubmitted);

        return res.status(200).json({
            message:"success",
             students: submittedStudents });
    
}

const assignMarkForSubmittedStudent=async(req,res)=>{

    const { seminarId, studentId } = req.params;
    const { score } = req.body;

    // Find the seminar by ID
    const seminar = await seminarModel.findById(seminarId);

    if (!seminar) {
        return res.status(404).json({ message: "seminar not found" });
    }

    // Find the student in the seminar
    const studentIndex = seminar.students.findIndex(student => student.student.toString() === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found in seminar" });
    }

    // Update the student's score and mark as submitted
    seminar.students[studentIndex].score = score;
    seminar.students[studentIndex].isSubmitted = true;

    await seminar.save();

    return res.status(200).json({ message: "Score added to student successfully" });

}


const editseminar = async (req, res) => {

    const { seminarId } = req.params;
        

    const updatedseminar = await seminarModel.findByIdAndUpdate(seminarId, req.body, { new: true });


        return res.status(200).json({ message: "seminar content updated successfully", data:updatedseminar});




}

const getSeminarCreatedByTeacher=async(req,res)=>{

    const teacherId = req.params.teacherId;

    console.log(teacherId);

        // Find seminars by teacher ID
        const seminars = await seminarModel.find({ teacherId:teacherId });

        return res.status(200).json({ data:seminars });


}



module.exports={
   addSeminar,getSeminarForStudent,submitSeminar,viewallSubmittedStudents,assignMarkForSubmittedStudent,editseminar,getSeminarCreatedByTeacher,editASeminarByStudent
}