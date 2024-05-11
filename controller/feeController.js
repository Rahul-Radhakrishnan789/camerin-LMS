const feeModel=require("../model/feeModel")
const teacherModel=require("../model/teacherModel")
const studentModel=require("../model/studentModel")
const Razorpay = require("razorpay");
const crypto = require("crypto");





const addFee=async(req,res)=>{
    const id=req.params.id

    const teacher=await teacherModel.findById(id)
    const students=await studentModel.find({course:teacher.course})
    // const studentIds = students.map(student => student._id);


    const fee=new feeModel({
        title:req.body.title,
        teacherId:id,
        amount:req.body.amount,
        DueDate:req.body.DueDate,
        course:teacher.course,
        students: students.map(student => ({ student: student._id }))

    })
    await fee.save()

    return res.status(201).json({
        message:"success"
    })
}

const getfeeToSpecificDepartment=async(req,res)=>{

    const id=req.params.id

    const student=await studentModel.findById(id)
    const data=await feeModel.find({
        course:student.course
    })

    return res.status(200).json({
        message:'success',
        data:data
    })

}
const feeDetailsToTeacher=async(req,res)=>{
    const id=req.params.id

    const feeDeatails=await feeModel.find({
        teacherId:id
    })

    return res.status(200).json({
        message:"success",
        data:feeDeatails
    })
}

const addPayment=async(req,res)=>{

    
    const studentId = req.params.id;
    let amount = req.body.amount;

  
    
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Something Went Wrong!" });
        }
        res.status(201).json({ data: order });
    });
}

const verifyPayment = async (req, res) => {

    const studentId = req.params.studentId;
    const feeId=req.params.feeId

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const fee=await feeModel.findById(feeId)
     // Find the student in the assignment
     const studentIndex = fee.students.findIndex(student => student.student.toString() === studentId);
       
     if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found in assignment" });
    }
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");
     
    if (razorpay_signature === expectedSign) {
        fee.students[studentIndex].isPayed = true;
        await fee.save();

        return res.status(200).json({
            message:"success"
        })

    }

    return res.status(301).json({
        message:"something went wrong"
    })


}

const viewAllPayedStudents=async(req,res)=>{

    const Id = req.params.id;

        // Find the fee by ID and populate the students field
        const fee = await feeModel.findById(Id ).populate('students.student');

        if (!fee) {
            return res.status(404).json({ message: "fee not found" });
        }
         console.log(fee);
        // Filter students with isPayed set to true
        const submittedStudents = fee.students.filter(student => student.isPayed);
         
        return res.status(200).json({
            message:"success",
             data: submittedStudents });
    

}





module.exports={
    addFee,getfeeToSpecificDepartment,feeDetailsToTeacher,addPayment,verifyPayment,viewAllPayedStudents
}