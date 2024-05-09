const teacherModel=require("../model/teacherModel")
const studentModel=require('../model/studentModel')
const dailyReportModel=require("../model/dailyReportModel")


const addDailyReport=async(req,res)=>{

    const id=req.params.id

    const teacher=await teacherModel.findById(id)

    const dailyReport=new dailyReportModel({
        title:req.body.title,
        description:req.body.description,
        teacherId:id,
        Date:req.body.Date,
        course:teacher.course


    })
   await dailyReport.save()
    return res.status(200).json({
        status:"success",

    })
}

const getDailyReportToTeacher=async(req,res)=>{
    const id=req.params.id
    const dailyReport=await dailyReportModel.find({
        teacherId:id
    })

    res.status(200).json({
        message:"success",
        data:dailyReport
    })
}

const  getDailyReportToSpecificStudents=async(req,res)=>{
    const id =req.params.id
    const student=await  studentModel.findById(id)
    const dailyReports=await dailyReportModel.find({
        course:student.course
    })

    res.status(200).json({
        message:"success",
        data:dailyReports
    })
}
const updateDailyReport=async(req,res)=>{
    const id=req.params.id
    const updatedDailyReport = await dailyReportModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
        message:"success",
        data:updatedDailyReport
    })
}

module.exports={
    addDailyReport,getDailyReportToTeacher,getDailyReportToSpecificStudents,updateDailyReport
}