
import {Router} from "express"
import { allAnnouncements, allEvents, allMenbers, findeEvent, getActivities, getBlogs } from "../controllers/open.controller.js";


const router = Router();

router.get("/events" , allEvents);
router.get("/events/:id" , findeEvent)

router.get("/members" , allMenbers);

router.get("/announcements" , allAnnouncements)

router.get("/activities" , getActivities);

router.get("/blogs" , getBlogs);

export default router;




// import { Router } from "express";
// import { allAnnouncements, allEvents, allMenbers, findeEvent } from "../controllers/open.controller.js";

// const router = Router();

// /**
//  * @swagger
//  * /events:
//  *   get:
//  *     summary: Get all events
//  *     tags: [Public]
//  *     responses:
//  *       200:
//  *         description: List of events
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   _id:
//  *                     type: string
//  *                     example: 6804fcadb89e32c7647165b8
//  *                   name:
//  *                     type: string
//  *                     example: TechFest 2025
//  *                   description:
//  *                     type: string
//  *                     example: A mega technical festival with coding challenges
//  *                   date:
//  *                     type: string
//  *                     format: date
//  *                     example: 2025-05-15
//  *                   location:
//  *                     type: string
//  *                     example: Auditorium, Main Campus
//  */
// router.get("/events", allEvents);

// /**
//  * @swagger
//  * /events/{id}:
//  *   get:
//  *     summary: Get event by ID
//  *     tags: [Public]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: Event ID
//  *         schema:
//  *           type: string
//  *           example: 6804fcadb89e32c7647165b8
//  *     responses:
//  *       200:
//  *         description: Event details
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 _id:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *                 description:
//  *                   type: string
//  *                 date:
//  *                   type: string
//  *                 location:
//  *                   type: string
//  *       404:
//  *         description: Event not found
//  */
// router.get("/events/:id", findeEvent);

// /**
//  * @swagger
//  * /members:
//  *   get:
//  *     summary: Get all members
//  *     tags: [Public]
//  *     responses:
//  *       200:
//  *         description: List of members
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   _id:
//  *                     type: string
//  *                   name:
//  *                     type: string
//  *                   email:
//  *                     type: string
//  *                   role:
//  *                     type: string
//  *                   year:
//  *                     type: string
//  */
// router.get("/members", allMenbers);

// /**
//  * @swagger
//  * /announcements:
//  *   get:
//  *     summary: Get all announcements
//  *     tags: [Public]
//  *     responses:
//  *       200:
//  *         description: List of announcements
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   _id:
//  *                     type: string
//  *                   title:
//  *                     type: string
//  *                   description:
//  *                     type: string
//  */
// router.get("/announcements", allAnnouncements);

// export default router;
