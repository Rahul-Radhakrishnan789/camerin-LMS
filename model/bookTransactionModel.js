const mongoose=require("mongoose")



const bookTransactionSchema=new mongoose.Schema({
    bookid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book"
    },
    studentid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student"  
      },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    isDispatch:{
        type:Boolean,
        default:false
    },
    isFine:{
        type:Boolean,
        default:false
    },
    isEmailSent:{
        type:Boolean,
        default:false
    },
    fine:{
        type:Number,
        default:0
    },
    isPayed:{
        type:Boolean,
        default:false
    }
    
    
})

const bookTransaction=mongoose.model('bookTransaction',bookTransactionSchema)

module.exports=bookTransaction