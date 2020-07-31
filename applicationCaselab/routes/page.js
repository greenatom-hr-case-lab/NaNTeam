import express from 'express';

import * as PageController from '../controllers/page';

const router = express.Router();

router.post('/createplan', PageController.create);

export default router;