// const homeworkModel=require("../model/homeWorkModel")
const teacherModel=require("../model/teacherModel")
const studentModel=require('../model/studentModel')
const noticeModel=require("../model/noticeModel")



const addNotice=async(req,res)=>{

    const id=req.params.id
    

    const teacher=await teacherModel.findById(id)
     
    const date=Date.now()
    const notice=new noticeModel({
        teacherId:id,
        title:req.body.title,
        description:req.body.description,
        course:teacher.course,
        Date:req.body.Date,
        expireAt:date
    })

    await notice.save()

    return res.status(201).json({
        message:"success"
    })
}

const  getNoticeToStudent=async(req,res)=>{
    const id=req.params.id
    const student=await studentModel.findById(id)

    const notices=await noticeModel.find({course:student.course})
    
    return res.status(200).json({
        message:"success",
        data:notices
    })


}


const updateNotice = async (req, res) => {

    const { id } = req.params;

    const notice = await noticeModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!notice) {
        return res.status(404).json({ message: "Homework not found" });
    }

    return res.status(200).json({
        message: "Homework updated successfully",
        Data: notice
    });


}

const deleteNotice = async (req, res) => {

    const { id } = req.params;



    const deletedNotice = await noticeModel.findByIdAndDelete(id);

    if (!deletedNotice) {
        return res.status(404).json({ message: "Homework not found" });
    }

    return res.status(200).json({
        message: "Homework deleted successfully",
        Data: deletedNotice
    });


}





module.exports={
    addNotice,getNoticeToStudent,updateNotice,deleteNotice
}