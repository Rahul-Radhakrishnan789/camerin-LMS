const assignmentModel=require("../model/assignmentModel")
const teacherModel=require("../model/teacherModel")
const studentModel=require('../model/studentModel')
const fs = require("fs");
const cloudinary = require("../cloudinary/cloudinary");




const addAssignment=async(req,res)=>{
    const id=req.params.id
    

    const teacher=await teacherModel.findById(id)

    const students=await studentModel.find({course:teacher.course})


    const assignment = new assignmentModel({
        teacherId: id,
        title: req.body.title,
        description: req.body.description,
        course: teacher.course,
        startDate: req.body.startDate,
        deadLine: req.body.deadLine,
        students: students.map(student => ({ student: student._id }))
    });

    await assignment.save()

    return res.status(201).json({
        message:"success"
    })
}

const getAssignmentsForStudent = async (req, res) => {

    const studentId = req.params.id;

   
        // Find the student by ID
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Get assignments for the student's course where the student ID is in the assignment's students array
        const assignments = await assignmentModel.find({
            course: student.course,
            'students.student': studentId
        });

        return res.status(200).json({ 
            message:"success",
            Data:assignments
         });

}

const submitAssignment=async(req,res)=>{

    const { studentId, assignmentId } = req.params;
    let urls = [];


    const assignment = await assignmentModel.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }


        const studentIndex = assignment.students.findIndex(student => student.student.toString() === studentId);
        if (studentIndex === -1) {
            return res.status(404).json({ message: "Student not found in assignment" });
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

          assignment.students[studentIndex].imagefile = urls; // Assuming Multer stores file path in req.file.path
          assignment.students[studentIndex].isSubmitted = true;

          await assignment.save();

          return res.status(200).json({ message: "Image uploaded and assignment marked as submitted" });

        
        }
        



}

const viewallSubmittedStudents=async(req,res)=>{
    
    const assignmentId = req.params.id;

        // Find the assignment by ID and populate the students field
        const assignment = await assignmentModel.findById(assignmentId ).populate('students.student');

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Filter students with isSubmitted set to true
        const submittedStudents = assignment.students.filter(student => student.isSubmitted);

        return res.status(200).json({
            message:"success",
             students: submittedStudents });
    
}

const assignMarkForSubmittedStudent=async(req,res)=>{

    const { assignmentId, studentId } = req.params;
    const { score } = req.body;

    // Find the assignment by ID
    const assignment = await assignmentModel.findById(assignmentId);

    if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
    }

    // Find the student in the assignment
    const studentIndex = assignment.students.findIndex(student => student.student.toString() === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found in assignment" });
    }

    // Update the student's score and mark as submitted
    assignment.students[studentIndex].score = score;
    assignment.students[studentIndex].isSubmitted = true;

    await assignment.save();

    return res.status(200).json({ message: "Score added to student successfully" });

}


const editAssignment = async (req, res) => {

    const { assignmentId } = req.params;
        

    const updatedAssignment = await assignmentModel.findByIdAndUpdate(assignmentId, req.body, { new: true });


        return res.status(200).json({ message: "Assignment content updated successfully", Data:updatedAssignment});




}

const getAssaignmentsCreatedByTeacher=async(req,res)=>{

    const teacherId = req.params.teacherId;

    console.log(teacherId);

        // Find assignments by teacher ID
        const assignments = await assignmentModel.find({ teacherId:teacherId });

        return res.status(200).json({ Data:assignments });


}



module.exports={
   addAssignment,getAssignmentsForStudent,submitAssignment,viewallSubmittedStudents,assignMarkForSubmittedStudent,editAssignment,getAssaignmentsCreatedByTeacher
}