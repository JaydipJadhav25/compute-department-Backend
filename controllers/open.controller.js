
import Events from "../model/events.model.js"
import Announcement from "../model/announcement.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncWraper} from "../utils/AsyncWraper.js"
import { findAnnouncements, findEventById, findEvnts, findMembers } from "../services/open.service.js"
import { AdminModel } from "../model/admin.js"

const allMenbers = asyncWraper(async(req , res) =>{
    // const members = await Member.find();
    const members = await findMembers();
    if(!members){
       throw new ApiError(500 , "database Error" , "fetch members Errors!");
    }
    res.status(200).json(members);     
});

const allEvents = asyncWraper(async(req , res) => {
  
    const events = await findEvnts();  
    if(!events){
        throw new ApiError(500 , "database Error" , "Failed to fetch events");
    }  
    return res.status(201).json(events);

});


const allAnnouncements = asyncWraper(async(req , res) =>{

        const announcements = await findAnnouncements();
       if(!announcements ){
        throw new ApiError(500 , "database Error" , "Failed to fetch AnnounceMents");
    }  
    res.status(201).json(announcements);
     
});



const findeEvent = asyncWraper(
    async(req , res) =>{
    const {id} = req.params;
     if(!id){
        throw new ApiError(401 , "validation Error" , "Id is requride");
     }
    const event = await findEventById(id);

     if(!event) {
          //res.status(500).json({ error: 'Failed to fetch event ! Check you id ' });
        throw new ApiError(500 , "messing info" , "Event is Not  avaliable for this id")
    }

    return res.status(200).json(event);
    


}
);



//finde admin
const findeAdmin = asyncWraper(
    async(req ,res) =>{
const {username} = req.body;

    const admin = await AdminModel.find({
        username : username
    });

    if(!admin) {
         throw new ApiError(500 , "validation Error" , "username is not avaliable!")
    }
    
    return res.status(200).json({success: tru});
   
}
)


export {
    allEvents , allAnnouncements , allMenbers , findeEvent , findeAdmin
}