import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    password : {
         type : String,
        required : true
    }
},
{
  timestamps: true
});


export const AdminModel = mongoose.model("admin" , adminSchema);