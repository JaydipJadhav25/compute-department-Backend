import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    year:{
        type: String,
        required: true,
    },
    imgurl: {
        type: String,
        required: true,
    }
  
});
const Member = mongoose.model("Member", memberSchema);
export default Member;