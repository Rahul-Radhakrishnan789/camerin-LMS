const attentenceModel=require("../model/attentenceModel");
const bookTransaction = require("../model/bookTransactionModel");
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

    const uniqeDate=await attentenceModel.findOne({Date:Date})
 
    if(uniqeDate){
        return res.status(404).json({
            message:"Attetence Already Added ,Please Edit Attentence it you want to change this"
        })
    }
     
    for (let i = 0; i < attentence.length; i++) {
        const { studentId, status } = attentence[i]; 

        const uniqeDate=await bookTransaction.findOne({Date:Date})
        console.log(uniqeDate);

        if(uniqeDate){
            return res.status(404).json({
                message:"Attetence Already Added ,Please Edit Attentence it you want to change this"
            })
        }

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
    console.log(date);

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