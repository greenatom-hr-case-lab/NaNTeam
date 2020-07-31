import express from 'express';

import * as PlanController from '../controllers/plan';

const router = express.Router();

router.post('/plan', PlanController.plan);
router.post('/plan/updatePlan', PlanController.updatePlan);
router.post('/plan/updateTask', PlanController.updateTask);
router.post('/plan/addTask', PlanController.addTask);
router.post('/plan/deleteTask', PlanController.deleteTask);
router.post('/plan/updateStage', PlanController.updateStage);

export default router;
