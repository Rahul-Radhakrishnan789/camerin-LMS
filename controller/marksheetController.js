const marksheetModel=require("../model/marksheetModel")
const teacherModel=require("../model/teacherModel")






const addMarksheet=async(req,res)=>{
    const id=req.params.teacherId
    const studentId=req.params.studentId
    const teacher=await teacherModel.findById(id)
    
    const marksheet=new marksheetModel({
        marksheet:req.body.row,
        title:req.body.title,
        course:teacher.course,
        teacherId:id,
        studentId:studentId
    

    })
   
    await marksheet.save()

    return res.status(201).json({
        message:"success"
    })

}

const getMarkSheetToTeacher=async(req,res)=>{
    const id=req.params.id

    
    const marksheet=await marksheetModel.find({
        teacherId:id
    })

    res.status(200).json({
        message:"success",
        data:marksheet
    })

}
const  getMarkToSpecificStudent=async(req,res)=>{
    const id=req.params.id
    const marksheet=await marksheetModel.find({studentId:id})



   res.status(200).json({
    message:"success",
    data:marksheet

   })

}

const editMarksheet=async(req,res)=>{
    console.log("hy");
    const id=req.params.id

    console.log(id);
    const { title, row } = req.body; 


    const updatedMarksheet = await marksheetModel.findOneAndUpdate(
        { title: title }, // Find by title
        { marksheet: row }, // Update marksheet data
        { new: true } // Return the updated document
    );
    console.log(updatedMarksheet);
    // Check if marksheet with the given title exists
    if (!updatedMarksheet) {
        return res.status(404).json({ message: 'Marksheet not found' });
    }

    // res.status(200).json(updatedMarksheet);

    return res.status(200).json({
        message:"success",
        data:editMarksheet
    })

}


module.exports={
    addMarksheet,getMarkSheetToTeacher,getMarkToSpecificStudent,editMarksheet
}

