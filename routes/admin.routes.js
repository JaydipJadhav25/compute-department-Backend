import {Router} from "express"
import { addAnnouncements, addEvent, addMenber } from "../controllers/admin.controllers.js";
import { body } from "express-validator";

const router = Router();

//post - add newmember
router.post("/members", [
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("role").notEmpty().withMessage("Role is required"),
    body("year").notEmpty().withMessage("Year is required"),
], addMenber);


//post - add evnts 
router.post("/events" , [
    body("name").notEmpty().withMessage("name is required"),
    body("description").notEmpty().withMessage("description is required")
],addEvent)

//post -add addAnnouncements
router.post("/announcements" , [
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required")
] , addAnnouncements);



export default router;