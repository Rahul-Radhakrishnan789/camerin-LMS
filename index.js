const express=require('express')
const mongoose=require('mongoose')
const app=express()

const morgan = require("morgan")
const path = require('path')
const port = 3000
const cors=require("cors")
const dotenv=require ("dotenv")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan("dev"))
app.use('uploads', express.static(path.join(__dirname, 'uploads')))  
dotenv.config()



async function main() {
  await mongoose.connect("mongodb://localhost:27017/studentmanagement");
  console.log("db connected");
}
main().catch((err) => console.log(err))




const studentRoute=require("./routes/studentRoutes")
app.use("/api",studentRoute)

const teacherRoute=require("./routes/teacherRoute")
app.use("/api",teacherRoute)

const homeWorkRoute=require("./routes/homeworkRoute")
app.use("/api",homeWorkRoute)


const noticeRoute=require("./routes/noticeRoute")
app.use("/api",noticeRoute)

const assignmentRoute=require("./routes/assignmentRoute")
app.use("/api",assignmentRoute)


const calenderRoute=require("./routes/calenderRoute.js")
app.use("/api",calenderRoute)


const seminarRoute=require("./routes/seminarRoute.js")
app.use("/api",seminarRoute)

const feeRoute=require("./routes/feeRoute.js")
app.use("/api",feeRoute)

const leaveRoute=require("./routes/leaveRoute")
app.use("/api",leaveRoute)

const examTimetable=require("./routes/examTimetableRoute.js")
app.use("/api",examTimetable)


const dailyReport=require("./routes/dailyReportRoute")
app.use("/api",dailyReport)

const book=require("./routes/bookRoute.js")
app.use("/api",book)

const booktransactions=require("./routes/bookTransactionRoute.js")
app.use("/api",booktransactions)


const marksheetRoute=require("./routes/marksheetRoute")
app.use("/api",marksheetRoute)

const attentenceRoute=require("./routes/attentenceRoute.js")
app.use("/api",attentenceRoute)


const medicalCerificateRoute=require("./routes/medicalCertificateRoute.js")
app.use("/api",medicalCerificateRoute)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })