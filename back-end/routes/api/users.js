import express from 'express';
import { handlePasswordUpdate } from '../../controllers/pwdController.js';
import { handleAddToContacts } from '../../controllers/contactsController.js';
import { handleAllContacts } from '../../controllers/userController.js';

const router = express.Router();

router.route("/:id")
    .get(handleAllContacts)
    .post(handleAddToContacts)
    .patch(handlePasswordUpdate);

export default router;