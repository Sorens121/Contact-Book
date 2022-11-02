import express from 'express';
import { handleAllUsers } from '../../controllers/adminController.js';
import {ROLES_LIST} from '../../config/roles.js';
import {verifyRoles} from '../../middleware/verifyRole.js';

const router = express.Router();

router.get('/', verifyRoles(ROLES_LIST.Admin), handleAllUsers);

export default router;