import express from 'express';
import { handleLogin } from '../controllers/authController.js';

const router = express.Router();

//LOGIN
router.post("/", handleLogin);

export default router;
