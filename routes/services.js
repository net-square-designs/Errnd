import express from 'express';
import { Services } from '../controllers';
import { validateServicesInput, validateToken } from '../middlewares';

const router = express.Router();

router.post('/:username', validateServicesInput, validateToken, Services.create);

router.put('/:username/update/:serviceId', validateToken, Services.update);

export default router;
