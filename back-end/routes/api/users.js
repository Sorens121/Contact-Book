import express from 'express';
import { handlePasswordUpdate } from '../../controllers/pwdController.js';
import { handleAddToContacts } from '../../controllers/contactsController.js';
import { handleGetContactList } from '../../controllers/userController.js';

const router = express.Router();

router.route("/:id")
    .get(handleGetContactList)
    .post(handleAddToContacts);

export default router;