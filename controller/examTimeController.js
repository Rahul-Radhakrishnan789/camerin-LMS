const timetableModel=require("../model/examTimetable")
const teacherModel=require("../model/teacherModel")
const studentModel=require("../model/studentModel")


const addTimeTable=async(req,res)=>{
    
    const id=req.params.id
    const teacher=await teacherModel.findById(id)

    const timeTable=new timetableModel(
        {
            timetable:req.body.timetable,
            course:teacher.course,
            teacherId:id

        }
    )

    await timeTable.save()


    return res.status(201).json({
        message:"timetable created successfully"
    })

}

const getTimetableTeacher=async(req,res)=>{
    const id=req.params.id


    const timetable=await timetableModel.find({
        teacherId:id
    })

    res.status(200).json({
        message:"success",
        data:timetable
    })


}
const gettimeTableToStudentUnerSpecificBatch=async(req,res)=>{

    const id=req.params.id

    const Student=await studentModel.findById(id)

    const getTimeTableForStudent=await timetableModel.find({
        course:Student.course
    })

    res.status(200).json({
        message:"success",data:getTimeTableForStudent
    })
}

const editTimeTable=async(req,res)=>{
    
    const id=req.params.id

    const editTimeTable=await timetableModel.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
        message:"success",
        data:editTimeTable
    })

}


module.exports={
    addTimeTable,getTimetableTeacher,gettimeTableToStudentUnerSpecificBatch,editTimeTable
}

