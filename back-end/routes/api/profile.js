import express from 'express';
import { handleGetProfile, handleUpdateProfile } from '../../controllers/profileController.js';
import { handlePasswordUpdate } from '../../controllers/pwdController.js';

const router = express.Router();

router.route("/:id")
    .get(handleGetProfile)
    .patch(handleUpdateProfile);

export default router;