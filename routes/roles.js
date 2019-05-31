import express from 'express';
import { Roles } from '../controllers';
import { validateUsersProfileExists } from '../middlewares';

const router = express.Router();

router.put('/:username', validateUsersProfileExists, Roles.switchRole);

export default router;
