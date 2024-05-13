const attentenceModel=require("../model/attentenceModel")
const teacherModel=require("../model/teacherModel")


const addAttentence=async(req,res)=>{
    // const teacherId=req.params.id
    //  const teacher=await teacherModel.findById(teacherId)

    // const attentence=new attentenceModel({
    //     attentence:req.body.attentence,
    //     Date:req.body.Date,
    //     course:teacher.course,
    //     teacherId:teacherId

    // })
    // await attentence.save()

    // return res.status(201).json({
    //     message:"success"
    // })

    const teacherId = req.params.id;
    const teacher = await teacherModel.findById(teacherId);

    const { attentence, Date } = req.body;

    for (let i = 0; i < attentence.length; i++) {
        const { studentId, status } = attentence[i]; 
        const attendance = new attentenceModel({
            studentId: studentId,
            status: status,
            Date: Date,
            course: teacher.course,
            teacherId: teacherId 
        });
        await attendance.save();
    }

    return res.status(201).json({
        message: "success"
    });


}


const getAttentenceForparticulairDay=async(req,res)=>{
    const date=req.body.Date

    const attentence=await attentenceModel.find({Date:date}).populate('studentId')

    if(!attentence){
        return res.status(404).json({
            message:"no attentece found in this date"
        })
    }
    res.status(200).json({
        message:"success",
        data:attentence
    })

}

const updateAttentence=async(req,res)=>{

    const {attentence,Date}=req.body

    // const updatedAttendance = await attentenceModel.findByIdAndUpdate(
    //     attentenceId, // ID of the attendance record to update
    //     { attentence: attentence, Date: Date }, // Updated attendance data
    //     { new: true } 
    // );

    
    // if (!updatedAttendance) {
    //     return res.status(404).json({ message: 'Attendance record not found' });
    // }

    for (let i = 0; i < attentence.length; i++) {
        const { studentId, status } = attentence[i]; 

        const updateAttentence=await attentenceModel.findOne({studentId:studentId,Date:Date})

             updateAttentence.status=status
             await updateAttentence.save()



    }


    res.status(200).json({
        message:"success",
        data:updateAttentence
    });


}


const getAttetenceDetailsToParticulairStudent=async(req,res)=>{
    const { id } = req.params;
    // const { fromDate, toDate } = req.body;
    const { fromDate, toDate } = req.query; // Extract from query parameters

    console.log(fromDate,toDate);
    console.log(id);

        const studentStatus = await attentenceModel.find({
            
                
                    studentId: id,
                    Date: { $gte: fromDate, $lte:toDate }
                })
                
                
            
       


        res.status(200).json({
            message:"success",
            data:studentStatus
         })
}


module.exports={
     addAttentence,getAttentenceForparticulairDay,updateAttentence,getAttetenceDetailsToParticulairStudent
}