import {validationResult} from "express-validator"
import memberMode from "../model/members.js"
import Events from "../model/events.model.js"
import Announcement from "../model/announcement.js"


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



export {

    addMenber,
    addEvent,
    addAnnouncements

}