import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "password is required"],
        unique: true
    },
    firstname:{
        type: String,
        required: false
    },
    lastname:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    color:{
        type: Number,
        default: 0,
        required: false
    },
    profileSetup:{
        type: Boolean,
        default: false
    },
})

userSchema.pre("save",async function (next) {
    const salt = await genSalt(10);
    this.password = await hash(this.password,salt);
    next();
})

const User = mongoose.model('user',userSchema);

export default User;