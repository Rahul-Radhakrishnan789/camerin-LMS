const studentModel = require("../model/studentModel")
const teacherModel = require("../model/teacherModel")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")


const register = async (req, res) => {

    const { userType,
        userFullName,
        age,
        dob,
        gender,
        course,
        address,
        mobileNumber,
        email,
        password } = req.body

        const hashedPassword=await bcrypt.hash(password,10)

        if(userType == "student" ){

            const studet=await studentModel.findOne({email:email})
            
                   if(!studet){
              
                const STUDENT = new studentModel({
                    userFullName:userFullName,
                    email:email,
                    password:hashedPassword,
                    age:age,
                    mobileNumber:mobileNumber,
                    dob:dob,
                    gender:gender,
                    course:course,
                    address:address,

                })
              await STUDENT.save()
             
             

              return res.status(201).json({
                message:"student registration successfull",
                data:STUDENT,
              })
            }

            return res.status(303).json({
                message:"student already registered please login"
            })

        }
         

        const teacher=await teacherModel.findOne({email:email})
        if(teacher){
            return res.status(303).json({
                message:"teacher already registered please login"
            })
        }
        const TEACHER= new teacherModel({
            userFullName:userFullName,
            email:email,
            password:hashedPassword,
            age:age,
            mobileNumber:mobileNumber,
            dob:dob,
            gender:gender,
            course:course,
            address:address,
        })
            await TEACHER.save()
      
    
            return res.status(201).json({
                message:"Teacher registration successfull",
                data:TEACHER
            }) 
}

const login = async (req,res) => {
    const email=req.body.email
    const password=req.body.password
    const userType=req.body.userType

    if(userType == "student"){
        const student=await studentModel.findOne({email:email})

  if(student){
      const comparePassword = await bcrypt.compare(password,student?.password)               
        
          if(comparePassword){
              const secret = "SECRET_KEY_ORGANIZER";
              const token = jwt.sign({
                  userId: student?._id,
                  
              },
                  secret, { expiresIn: '72h' }
              );

              return res.status(200).json({
                  message:"student login successfull",
                  data:token,
              })
            
          }

          return res.status(403).json({
              message:"invalid password",
            })
          
  }
return   res.status(404).json({
      message:"please  register your email"
  })

}
const teacher=await teacherModel.findOne({email:email})
// console.log(user,"user");

if(teacher){
  const comparePassword = await bcrypt.compare(password,teacher?.password) 
  // console.log("pass",comparePassword);
  if(comparePassword){
      const secret ="SECRET_KEY_USER";
      const token = jwt.sign({
          userId: teacher?._id,
          
      },
          secret, { expiresIn: '72h' }
      );

      return res.status(200).json({
          message:"teacher login successfull",
          data:token,
        
      })

  }
  return res.status(403).json({
      message:"invalid password",
    })
}
return   res.status(404).json({
  message:"please  register your account"
})


}



const getIndividualStudentData=async(req,res)=>{

    const id=req.params.id

    const student=await studentModel.findById(id)
    if(student){
        return res.status(200).json({
            message:"success",
            Data:student
        })
    }

    return res.status(404).json({
        message:"failure"

    })

}

module.exports = {register,login,getIndividualStudentData}