const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const medicalCertifiacate=require("../controller/medicalCerttificateController")
const upload=require("../middlewares/multer")



router.post("/addmedicalcertificate/:studentId",upload.array("images",5),tryCatch(medicalCertifiacate.addMedicalCertificate))
router.get("/getallmedicalCertificate/:teacherId",tryCatch(medicalCertifiacate.getAllUnapprovedMedicalCerificate))
router.put("/approveamedicalcerificate/:certificateId",tryCatch(medicalCertifiacate.ApproveAMedicalCertificate))
router.get("/medicalcertificatetostudent/:studentId",tryCatch(medicalCertifiacate.medicalCertificateToStudent))


module.exports=router 