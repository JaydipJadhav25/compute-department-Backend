import Member from "../model/members.js"
import Events from "../model/events.model.js"
import Announcement from "../model/announcement.js"


const allMenbers = async(req , res) =>{

    try {
        const members = await Member.find();

    res.status(200).json(members);

        
    } catch (error) {
       
    res.status(500).json({ error: 'Failed to fetch members' });

        
    }
       
}

const allEvents = async(req , res) => {
    try {
        const events = await Events.find();
    
    return res.status(201).json(events);


    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
        
    }
}


const allAnnouncements = async(req , res) =>{
    try {
        const announcements = await Announcement.find();
        res.json(announcements);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch announcements' });
      }
}



const findeEvent = async(req , res) =>{
 const {id} = req.params;
  
 try {
    if(!id) {
        return res.json({message: "id is requride"})
    }

    const event = await Events.findOne({_id : id});

     if(!event) {
          res.status(500).json({ error: 'Failed to fetch event ! Check you id ' });
    }

    return res.status(200).json(event);
    

    
 } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
 }
 
}

export {
    allEvents , allAnnouncements , allMenbers , findeEvent
}