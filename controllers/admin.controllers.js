import {validationResult} from "express-validator"
import memberMode from "../model/members.js"
import Events from "../model/events.model.js"
import Announcement from "../model/announcement.js"
import { asyncWraper } from "../utils/AsyncWraper.js"
import { ApiError } from "../utils/ApiError.js"
import Member from "../model/members.js"
import { Activity } from "../model/activity.js"


// Add a new ACES member
const addMenber = async(req , res) =>{
    try {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json({
            error : errors.array()
        })
    }

    const { name, email, role, year, imgurl } = req.body;

   // Basic validation
   if (!name || !email || !role || !year || !imgurl) {
    return res.status(400).json({ error: 'All fields are required' });
  }
    
    const existingEmail = await memberMode.findOne({email : email});
    if(existingEmail){
        return res.status(409).json({ error: 'Member with this email already exists' });
    }

    //add 
    // const member = await memberMode.create({})
   // Create and save the member

   const newMember = new memberMode({
    name,
    email,
    role,
    year,
    imgurl,
  });

  await newMember.save();

  res.status(201).json({ message: 'Member added successfully', member: newMember });
  } catch (error) {

    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Failed to add member' });
    
  }

}

//add events
const addEvent  = async(req, res) =>{
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(401).json({
                error : errors.array()
            })
        }

        const { name, description, date, time, location, imgurl, googlelink } = req.body;
    
        // Basic validation
        if (!name || !description || !date || !time || !location) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        // Create and save the event
        const newEvent = new Events({
          name,
          description,
          date,
          time,
          location,
          imgurl,
          googlelink,
          
        });
    
        await newEvent.save();
    
        res.status(201).json({ message: 'Event added successfully', event: newEvent });
      } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ error: 'Failed to add event' });
      }
    
}
//add announcements
const addAnnouncements =async(req ,res) =>{
    try {

        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(401).json({
                error : errors.array()
            })
        }

        const { title, description, date } = req.body;
    
        // Basic validation
        if (!title || !description || !date) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        // Create and save the announcement
        const newAnnouncement = new Announcement({
          title,
          description,
          date,
          
        });
    
        await newAnnouncement.save();
    
        res.status(201).json({ message: 'Announcement added successfully', announcement: newAnnouncement });
      } catch (error) {
        console.error('Error adding announcement:', error);
        res.status(500).json({ error: 'Failed to add announcement' });
      }
}


//delete all routes
//memebers
const deleteMember = asyncWraper(async(req , res)=>{
  
  const {id} = req.body;

  //check
  if(!id){
    throw new ApiError(400 , "validations Error" , "member id is requride!");
  }

  //delete member
const member = await Member.findOneAndDelete({_id : id});

if(!member){
    throw new ApiError(501 , "Server Error" , "member deleted falied ! check member id");
}


return res.status(200).json({success : true , message :  "member deleted successfully !"});


});
//events

const deleteEvent = asyncWraper(async(req , res)=>{
  
  const {id} = req.body;

  //check
  if(!id){
    throw new ApiError(400 , "validations Error" , "Events id is requride!");
  }

  //delete member
const event = await Events.findOneAndDelete({_id : id});

if(!event){
    throw new ApiError(501 , "Server Error" , "event deleted falied ! check member id");
}


return res.status(200).json({success : true , message :  "event deleted successfully !"});


});

//announcement
const deleteAnnouncement = asyncWraper(async(req , res)=>{
  
  const {id} = req.body;

  //check
  if(!id){
    throw new ApiError(400 , "validations Error" , "Announcement id is requride!");
  }

  //delete member
const announcement = await Announcement.findOneAndDelete({_id : id});

if(!announcement){
    throw new ApiError(501 , "Server Error" , "Announcement deleted falied ! check member id");
}


return res.status(200).json({success : true , message :  "Announcement deleted successfully !"});


});


//update routes
const updateAnnouncements = asyncWraper(async(req ,res) =>{
  
        const {  id , title, description, date } = req.body;
    
        // console.log("id , title, description, date " , id , title, description, date );


        // Basic validation
        if (!title || !description || !date) {
          throw new ApiError(400 , "validation Error" , "All fields are required")
        }
    
        // finde and update  announcement
         const announcement = await Announcement.findByIdAndUpdate(
            id,
            { title, description, date },
            { new: true }
          );

           if(!announcement){
          throw new ApiError(500 , "server error" , "server Error check NetWorlConnections!")
           }
        
           return res.status(201).json({
            success : true,
            message : "Announcement update successfully"
           })
      
})


//add activity


const createActivity = async (req, res) => {
  try {
    const { action } = req.body;
    if (!action) {
      return res.status(400).json({ message: 'Action field is required' });
    }
    const newActivity = new Activity({ action });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {

    addMenber,
    addEvent,
    addAnnouncements,
    deleteMember,
    deleteEvent,
    deleteAnnouncement,
    updateAnnouncements ,
    createActivity
}