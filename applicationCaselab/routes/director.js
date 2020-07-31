import express from 'express';

import * as DirectorController from '../controllers/getDirectors';

const router = express.Router();

router.post('/plan/directors',DirectorController.Directors);

export default router;