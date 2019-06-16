import express from 'express';
import Bookmarks from '../controllers/Bookmarks';
import { validateToken, validateSearchServicesUrl } from '../middlewares';

const router = express.Router();

router.get('/search', validateToken, validateSearchServicesUrl, Bookmarks.search);

router.post('/create/:serviceId', validateToken, Bookmarks.create);

router.delete('/remove/:serviceId', validateToken, Bookmarks.delete);

router.get('/', validateToken, Bookmarks.retrieve);

export default router;
