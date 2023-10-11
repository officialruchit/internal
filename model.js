const mongoose=require("mongoose")
const data=mongoose.Schema({
    name:{
        type:String
    },
    pass:{
        type:String
    }
})

const dd= mongoose.model("dd",data,"dd")

module.exports=dd