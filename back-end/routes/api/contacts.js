import express from 'express';
import { handleUpdateContact, handleDeleteContact } from '../../controllers/contactsController.js';

const router = express.Router();

router.patch('/:user_id/:contact_id', handleUpdateContact);
router.delete('/:user_id/:contact_id', handleDeleteContact);

export default router;