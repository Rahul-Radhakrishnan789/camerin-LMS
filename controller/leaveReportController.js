const leaveReportModel=require("../model/leaveReportModel")
const studentModel=require("../model/studentModel")
const teacherModel=require("../model/teacherModel")

const addLeaveReport=async(req,res)=>{
    const id=req.params.id
    
    const student=await studentModel.findById(id)

    const leaveReport=new leaveReportModel({
        Date:req.body.Date,
        description:req.body.description,
        studentId:id,
        course:student.course
    })
    await leaveReport.save()

    return res.status(201).json({
        message:"leavereport created successfull"
    })

}


const getLeaveReportofSpecificCourse=async(req,res)=>{
    const id=req.params.id

    const teacher=await teacherModel.findById(id)
    const leaveReports=await leaveReportModel.find({course:teacher.course}).populate("studentId")
      
    return res.status(200).json({
        message:"success",data:leaveReports
    })

}

const deleteLeaveReport=async(req,res)=>{
    const id=req.params.id
    const leaveReport=await leaveReportModel.findByIdAndDelete(id)

    return res.status(200).json({
        message:"leave report deleted successfully"

    })
}


module.exports={
    addLeaveReport,getLeaveReportofSpecificCourse,deleteLeaveReport
}