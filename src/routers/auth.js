import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerController,
  loginController,
  logoutController,
} from '../controllers/auth.js';
import { registerSchema, loginSchema } from '../validation/auth.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));

router.post('/logout', ctrlWrapper(logoutController));

export default router;
