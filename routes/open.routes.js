import {Router} from "express"
import { allAnnouncements, allEvents, allMenbers } from "../controllers/open.controller.js";


const router = Router();

router.get("/events" , allEvents)

router.get("/members" , allMenbers);

router.get("/announcements" , allAnnouncements)


export default router;