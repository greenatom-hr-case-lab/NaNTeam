import express from 'express';

import * as PlanController from '../controllers/currentPlan';

const router = express.Router();

router.post('/plan/currentEmployee', PlanController.getCurrentPlan);

export default router;