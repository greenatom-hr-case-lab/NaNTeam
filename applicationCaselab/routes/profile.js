import express from 'express';

import * as ProfileController from '../controllers/profile';

const router = express.Router();

router.post('/profile', ProfileController.getUserInfo);
router.get('/profile/notifications', ProfileController.getNotifications);

export default router;