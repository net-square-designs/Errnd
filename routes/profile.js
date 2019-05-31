import express from 'express';
import { Profile } from '../controllers';
import { validateUsersProfileExists } from '../middlewares';

const router = express.Router();

router.get('/:username', validateUsersProfileExists, Profile.viewProfile);

router.post('/:username', Profile.createProfile);

export default router;
