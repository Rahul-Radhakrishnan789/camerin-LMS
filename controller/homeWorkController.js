const homeworkModel=require("../model/homeWorkModel")
const teacherModel=require("../model/teacherModel")
const studentModel=require('../model/studentModel')



const addHomeWork=async(req,res)=>{

    const id=req.params.id
    

    const teacher=await teacherModel.findById(id)
     
    const date=Date.now()
    const homeWork=new homeworkModel({
        teacherId:id,
        title:req.body.title,
        description:req.body.description,
        course:teacher.course,
        expireAt:date
    })

    await homeWork.save()

    return res.status(201).json({
        message:"success"
    })
}

const getHomeworksToTeacher=async(req,res)=>{
    const id=req.params.id

    const homeworks=await homeworkModel.find({teacherId:id})

    return res.status(200).json({
        message:"success",
        data:homeworks
    })

}

const  getHomeWorkToStudent=async(req,res)=>{
    const id=req.params.id
    const student=await studentModel.findById(id)

    const homeworks=await homeworkModel.find({course:student.course})
    
    return res.status(200).json({
        message:"success",
        data:homeworks
    })


}

const updateHomework = async (req, res) => {

    const { id } = req.params;

    const updatedHomework = await homeworkModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedHomework) {
        return res.status(404).json({ message: "Homework not found" });
    }

    return res.status(200).json({
        message: "Homework updated successfully",
        Data: updatedHomework
    });


}

const deleteHomework = async (req, res) => {

    const { id } = req.params;



    const deletedHomework = await homeworkModel.findByIdAndDelete(id);

    if (!deletedHomework) {
        return res.status(404).json({ message: "Homework not found" });
    }

    return res.status(200).json({
        message: "Homework deleted successfully",
        Data: deletedHomework
    });


}







module.exports={
    addHomeWork,
    getHomeWorkToStudent,
    updateHomework,
    deleteHomework,
    getHomeworksToTeacher

}