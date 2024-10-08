import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String
    }
},{timestamps: true})

const Message = mongoose.model("Message",messageSchema);
export default Message;