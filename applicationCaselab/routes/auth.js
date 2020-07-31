import express from 'express';

import * as AuthController from '../controllers/auth';

const router = express.Router();

router.post('/signin', AuthController.signin);// маршрут для авторизации
router.post('/signup', AuthController.signup);// маршрут для регистрации(позже его не будет, чисто для создания пользователя)

export default router;