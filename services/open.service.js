import Announcement from "../model/announcement.js";
import Events from "../model/events.model.js";
import  MemberModel from "../model/members.js"



 async function findMembers (){
    const members = await MemberModel.find();
    return members;
}


 async function findEvnts (){
     const events = await Events.find();
     return events;
}

async function findAnnouncements(){
    const announcements = await Announcement.find();
    return announcements;
}


async function findEventById(id){
   const event = await Events.findById(id);
   console.log("event : " , event);

   return event;
}





export{
    findMembers,
    findEvnts ,
    findAnnouncements,
    findEventById
}

