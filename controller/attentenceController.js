const attentenceModel=require("../model/attentenceModel")
const teacherModel=require("../model/teacherModel")


const addAttentence=async(req,res)=>{
    const teacherId=req.params.id
     const teacher=await teacherModel.findById(teacherId)

    const attentence=new attentenceModel({
        attentence:req.body.attentence,
        Date:req.body.Date,
        course:teacher.course,
        teacherId:teacherId

    })
    await attentence.save()

    return res.status(201).json({
        message:"success"
    })

}


const getAttentenceForparticulairDay=async(req,res)=>{
    const date=req.body.Date

    const attentence=await attentenceModel.find({Date:date}).populate("studentId")
    console.log(attentence);

    if(!attentence){
        return res.status(404).json({
            message:"not attence found in this date"
        })
    }
    res.status(200).json({
        message:"success",
        data:attentence
    })

}
module.exports={
     addAttentence,getAttentenceForparticulairDay
}