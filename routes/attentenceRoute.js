const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const attentence=require("../controller/attentenceController")



router.post("/addattentence/:id",tryCatch(attentence.addAttentence))
router.post("/getattentence",tryCatch(attentence.getAttentenceForparticulairDay))
router.put("/updateattentence",tryCatch(attentence.updateAttentence))
router.get("/getattetenceforstudent/:id",tryCatch(attentence.getAttetenceDetailsToParticulairStudent))


module.exports=router