import express from 'express';
import { sendPrompt } from '../controller/prompt.controller.js';
import usermiddleware from '../middleware/prompt.middleware.js';


const router= express.Router()
router.post("/prompt",usermiddleware,sendPrompt)

 export default  router;