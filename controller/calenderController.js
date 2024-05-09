const calenderModel=require("../model/calenderModel")
const teacherModel=require("../model/teacherModel")
const studentModel=require("../model/studentModel")


const addEvent=async(req,res)=>{

    const id=req.params.id
    const teacher=await teacherModel.findById(id)

    const calender=new calenderModel({
        title:req.body.title,
        teacherId:id,
        course:teacher.course,
        start:req.body.start,
        end:req.body.end
    })
    await calender.save()

    return res.status(201).json({
        message:"success",
        data:calender
    })
}
const getEventtoTeacher=async(req,res)=>{

    const id=req.params.id

    
    const data=await calenderModel.find({
    teacherId:id
        
    })

    return res.status(200).json({
        status:"success",
        Data:data
    })
}


const getEventToStudent=async(req,res)=>{
    const id=req.params.studentId

    const student=await studentModel.findById(id)
      console.log(student);
    const data=await calenderModel.find({
        course:student.course
    })

    return res.status(200).json({
          
        message:"success",
        data:data
    })

}


module.exports={
    addEvent,getEventtoTeacher,getEventToStudent

}