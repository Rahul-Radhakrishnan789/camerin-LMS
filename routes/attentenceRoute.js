const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const attentence=require("../controller/attentenceController")



router.post("/addattentence/:id",tryCatch(attentence.addAttentence))
router.get("/getattentence",tryCatch(attentence.getAttentenceForparticulairDay))



module.exports=router