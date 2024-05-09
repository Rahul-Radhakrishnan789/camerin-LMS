const teacherModel = require("../model/teacherModel")
const studentModel=require("../model/studentModel")



const teacherProfile = async (req,res) => {

    teacherId = req.params.id;

    const teacherData = await teacherModel.findById(teacherId)

    return res.status(200).json({
        message:"sucess",
        data:teacherData,
      })
}

const getStudentsUnderSpesificDepartment=async(req,res)=>{

    const id=req.params.id

    const teacherData = await teacherModel.findById(id)
    console.log(teacherData.course);

    const StudentsUnderSpecificDepartment=await  studentModel.find({course:teacherData.course})

    res.status(200).json({
        message:"success",
        Data: StudentsUnderSpecificDepartment
    })


}


module.exports = {teacherProfile,getStudentsUnderSpesificDepartment}