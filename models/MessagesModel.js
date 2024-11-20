import mongoose from "mongoose";

const messageSchema  = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
    },
    messageType: {
        type: String,
        enum: ["TEXT","FILE"],
        required:true    
    },
    content:{
        type: String,
        required: function(){
            return this.messageType === "TEXT";
        }
    },
    fileURL: {
        type: String,
        required: function(){
            return this.messageType === "FILE";
        }
    },
    TimeStamp: {
        type: Date,
        default: Date.now(),
    }
})

const Message = mongoose.model("Messages",messageSchema);

export default Message;